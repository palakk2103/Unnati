import React, { useState, useEffect, useMemo } from "react";
import { useToast } from "../../context/ToastContext";
import { useConfirmation } from "../../context/ConfirmationContext";
import {
  StorageLocationItem,
  StorageLocationPayload,
} from "../../services/api/admin/adminStorageLocationService";

interface StorageLocationSetupViewProps {
  role: "admin" | "seller";
  fetchLocationsApi: (params?: any) => Promise<{ success: boolean; data: StorageLocationItem[] }>;
  createLocationApi: (data: StorageLocationPayload) => Promise<{ success: boolean; data: any }>;
  updateLocationApi: (id: string, data: Partial<StorageLocationPayload>) => Promise<{ success: boolean; data: any }>;
  deleteLocationApi: (id: string) => Promise<{ success: boolean; message: string }>;
}

type TabType = "city" | "warehouse" | "room" | "rack";

export default function StorageLocationSetupView({
  role,
  fetchLocationsApi,
  createLocationApi,
  updateLocationApi,
  deleteLocationApi,
}: StorageLocationSetupViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("city");
  const [locations, setLocations] = useState<StorageLocationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  // Form state
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [code, setCode] = useState("");

  const { showToast } = useToast();
  const confirmation = useConfirmation();

  // Load all locations
  const loadLocations = async () => {
    setLoading(true);
    try {
      const res = await fetchLocationsApi();
      if (res.success && Array.isArray(res.data)) {
        setLocations(res.data);
      }
    } catch (err: any) {
      console.error("Failed to load locations", err);
      showToast(err.message || "Failed to load storage locations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  // Derived lists
  const cities = useMemo(() => {
    const cityItems = locations.filter((l) => l.level === "city" || l.city);
    const unique = Array.from(new Set(cityItems.map((c) => c.city || c.name))).filter(Boolean);
    return unique.sort();
  }, [locations]);

  const warehousesForSelectedCity = useMemo(() => {
    if (!selectedCity) return [];
    const whItems = locations.filter(
      (l) => (l.level === "warehouse" || l.warehouse) && l.city === selectedCity
    );
    const unique = Array.from(
      new Set(whItems.map((w) => w.warehouse || (w.level === "warehouse" ? w.name : "")))
    ).filter(Boolean);
    return unique.sort();
  }, [locations, selectedCity]);

  const roomsForSelectedWarehouse = useMemo(() => {
    if (!selectedCity || !selectedWarehouse) return [];
    const roomItems = locations.filter(
      (l) =>
        (l.level === "room" || l.room) &&
        l.city === selectedCity &&
        l.warehouse === selectedWarehouse
    );
    const unique = Array.from(
      new Set(roomItems.map((r) => r.room || (r.level === "room" ? r.name : "")))
    ).filter(Boolean);
    return unique.sort();
  }, [locations, selectedCity, selectedWarehouse]);

  // Filtered table data for the active tab
  const tableData = useMemo(() => {
    return locations.filter((loc) => {
      if (loc.level !== activeTab) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        loc.name?.toLowerCase().includes(q) ||
        loc.city?.toLowerCase().includes(q) ||
        loc.warehouse?.toLowerCase().includes(q) ||
        loc.room?.toLowerCase().includes(q) ||
        loc.rackNumber?.toLowerCase().includes(q) ||
        loc.code?.toLowerCase().includes(q)
      );
    });
  }, [locations, activeTab, search]);

  // Counts for tabs
  const tabCounts = useMemo(() => {
    return {
      city: locations.filter((l) => l.level === "city").length,
      warehouse: locations.filter((l) => l.level === "warehouse").length,
      room: locations.filter((l) => l.level === "room").length,
      rack: locations.filter((l) => l.level === "rack").length,
    };
  }, [locations]);

  // Reset form
  const handleReset = () => {
    setEditId(null);
    setName("");
    setCode("");
    // Keep selections if continuing in same parent context
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    handleReset();
    setSearch("");
  };

  // Submit create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast(`Please enter ${activeTab} name`, "error");
      return;
    }

    if (activeTab === "warehouse" && !selectedCity) {
      showToast("Please select a City for this Warehouse", "error");
      return;
    }

    if (activeTab === "room") {
      if (!selectedCity) {
        showToast("Please select a City", "error");
        return;
      }
      if (!selectedWarehouse) {
        showToast("Please select a Warehouse", "error");
        return;
      }
    }

    if (activeTab === "rack") {
      if (!selectedCity) {
        showToast("Please select a City", "error");
        return;
      }
      if (!selectedWarehouse) {
        showToast("Please select a Warehouse", "error");
        return;
      }
      if (!selectedRoom) {
        showToast("Please select a Room", "error");
        return;
      }
    }

    setSubmitting(true);
    try {
      const payload: StorageLocationPayload = {
        level: activeTab,
        name: name.trim(),
        code: code.trim(),
        city: activeTab === "city" ? name.trim() : selectedCity,
        warehouse: activeTab === "warehouse" ? name.trim() : selectedWarehouse,
        room: activeTab === "room" ? name.trim() : selectedRoom,
        rackNumber: activeTab === "rack" ? name.trim() : undefined,
      };

      if (editId) {
        await updateLocationApi(editId, payload);
        showToast(`${activeTab.toUpperCase()} updated successfully`, "success");
      } else {
        await createLocationApi(payload);
        showToast(`${activeTab.toUpperCase()} added successfully`, "success");
      }

      handleReset();
      await loadLocations();
    } catch (err: any) {
      showToast(err.message || "Failed to save location", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit item
  const handleEdit = (item: StorageLocationItem) => {
    setEditId(item._id);
    setName(item.name || item.rackNumber || item.room || item.warehouse || item.city);
    setCode(item.code || "");
    if (item.city) setSelectedCity(item.city);
    if (item.warehouse) setSelectedWarehouse(item.warehouse);
    if (item.room) setSelectedRoom(item.room);
  };

  // Delete item with cascade confirmation
  const handleDelete = (item: StorageLocationItem) => {
    const isParent = item.level === "city" || item.level === "warehouse" || item.level === "room";
    const warningMsg = isParent
      ? `Are you sure you want to delete this ${item.level} "${item.name}"? Note: All associated nested warehouses, rooms, and racks under it will also be deleted!`
      : `Are you sure you want to delete Rack "${item.name}"?`;

    confirmation.openConfirmation({
      title: `Confirm Delete ${item.level.toUpperCase()}`,
      message: warningMsg,
      onConfirm: async () => {
        try {
          await deleteLocationApi(item._id);
          showToast(`${item.level} deleted successfully`, "success");
          if (editId === item._id) handleReset();
          await loadLocations();
        } catch (err: any) {
          showToast(err.message || "Failed to delete item", "error");
        }
      },
      confirmText: "Delete",
      confirmButtonClass: "bg-red-600 hover:bg-red-700 text-white",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--primary-color)]/10 p-2.5 rounded-xl text-[var(--primary-color)]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Storage Location Setup</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage physical inventory locations: City ➔ Warehouse ➔ Room ➔ Rack Number
            </p>
          </div>
        </div>

        {/* Level Quick Badges */}
        <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-xl text-xs font-medium border border-gray-200">
          <span className="px-2 py-1 bg-white text-gray-700 rounded-lg shadow-sm font-semibold">
            {role === "admin" ? "Admin Master" : "Seller Master"}
          </span>
          <span className="text-gray-500 px-2">Total Locations: {locations.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => handleTabChange("city")}
          style={activeTab === "city" ? { backgroundColor: "var(--primary-color)", color: "#ffffff" } : {}}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "city"
              ? "text-white shadow-md shadow-[var(--primary-color)]/20"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          <span>🏙️</span>
          <span className={activeTab === "city" ? "force-text-white" : ""}>1. Cities</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "city"
                ? "bg-white text-[var(--primary-color)] shadow-sm"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tabCounts.city}
          </span>
        </button>
 
        <button
          type="button"
          onClick={() => handleTabChange("warehouse")}
          style={activeTab === "warehouse" ? { backgroundColor: "var(--primary-color)", color: "#ffffff" } : {}}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "warehouse"
              ? "text-white shadow-md shadow-[var(--primary-color)]/20"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          <span>🏭</span>
          <span className={activeTab === "warehouse" ? "force-text-white" : ""}>2. Warehouses</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "warehouse"
                ? "bg-white text-[var(--primary-color)] shadow-sm"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tabCounts.warehouse}
          </span>
        </button>
 
        <button
          type="button"
          onClick={() => handleTabChange("room")}
          style={activeTab === "room" ? { backgroundColor: "var(--primary-color)", color: "#ffffff" } : {}}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "room"
              ? "text-white shadow-md shadow-[var(--primary-color)]/20"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          <span>🚪</span>
          <span className={activeTab === "room" ? "force-text-white" : ""}>3. Rooms</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "room"
                ? "bg-white text-[var(--primary-color)] shadow-sm"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tabCounts.room}
          </span>
        </button>
 
        <button
          type="button"
          onClick={() => handleTabChange("rack")}
          style={activeTab === "rack" ? { backgroundColor: "var(--primary-color)", color: "#ffffff" } : {}}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "rack"
              ? "text-white shadow-md shadow-[var(--primary-color)]/20"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          <span>📦</span>
          <span className={activeTab === "rack" ? "force-text-white" : ""}>4. Rack Numbers</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
              activeTab === "rack"
                ? "bg-white text-[var(--primary-color)] shadow-sm"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tabCounts.rack}
          </span>
        </button>
      </div>


      {/* Main Grid: Form Left, Table Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
              <span>{editId ? "✏️ Edit" : "➕ Add New"}</span>
              <span className="capitalize">{activeTab}</span>
            </h2>
            {editId && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded text-xs font-medium">
                Edit Mode
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* City selector if on warehouse, room, or rack tab */}
            {activeTab !== "city" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Select City <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setSelectedWarehouse("");
                    setSelectedRoom("");
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] focus:outline-none"
                  required
                >
                  <option value="">-- Choose City --</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {cities.length === 0 && (
                  <p className="text-xs text-amber-600 mt-1">
                    No cities found. Please add a City in Tab 1 first!
                  </p>
                )}
              </div>
            )}

            {/* Warehouse selector if on room or rack tab */}
            {(activeTab === "room" || activeTab === "rack") && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Select Warehouse <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => {
                    setSelectedWarehouse(e.target.value);
                    setSelectedRoom("");
                  }}
                  disabled={!selectedCity}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">
                    {selectedCity ? "-- Choose Warehouse --" : "-- Select City First --"}
                  </option>
                  {warehousesForSelectedCity.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Room selector if on rack tab */}
            {activeTab === "rack" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Select Room <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  disabled={!selectedWarehouse}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">
                    {selectedWarehouse ? "-- Choose Room --" : "-- Select Warehouse First --"}
                  </option>
                  {roomsForSelectedWarehouse.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Primary Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                {activeTab === "city" && "City Name"}
                {activeTab === "warehouse" && "Warehouse Name / Title"}
                {activeTab === "room" && "Room Name / Number"}
                {activeTab === "rack" && "Rack Number / Identifier"}
                <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                placeholder={
                  activeTab === "city"
                    ? "e.g. Mumbai, Delhi, Bangalore"
                    : activeTab === "warehouse"
                    ? "e.g. Mumbai Central Warehouse (MC-01)"
                    : activeTab === "room"
                    ? "e.g. Room A, Room 101"
                    : "e.g. Rack 1, Rack 101, Rack A"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] focus:outline-none"
                required
              />
            </div>

            {/* Optional Code for warehouse */}
            {activeTab === "warehouse" && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Warehouse Code <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. MC-01, AW-02"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] focus:outline-none"
                />
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg text-sm hover:bg-[var(--primary-dark)] transition-all font-medium shadow-sm flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? "Saving..." : editId ? "Update Location" : `Add ${activeTab}`}
              </button>
            </div>
          </form>
        </div>

        {/* Table / List Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Table Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-gray-800 capitalize">
                {activeTab} Master List
              </h2>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                {tableData.length}
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder={`Search ${activeTab}s...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 font-semibold text-xs uppercase tracking-wider border-y border-gray-200">
                  <th className="px-4 py-3">SL</th>
                  {activeTab === "city" && <th className="px-4 py-3">City Name</th>}
                  {activeTab === "warehouse" && (
                    <>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Warehouse Name</th>
                      <th className="px-4 py-3">Code</th>
                    </>
                  )}
                  {activeTab === "room" && (
                    <>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Warehouse</th>
                      <th className="px-4 py-3">Room Name</th>
                    </>
                  )}
                  {activeTab === "rack" && (
                    <>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Warehouse</th>
                      <th className="px-4 py-3">Room</th>
                      <th className="px-4 py-3">Rack Number</th>
                    </>
                  )}
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading storage locations...</span>
                      </div>
                    </td>
                  </tr>
                ) : tableData.length > 0 ? (
                  tableData.map((item, idx) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      <td className="px-4 py-3 text-gray-500 font-mono text-xs">{idx + 1}</td>
                      {activeTab === "city" && (
                        <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                          <span className="text-base">🏙️</span>
                          <span>{item.name || item.city}</span>
                        </td>
                      )}
                      {activeTab === "warehouse" && (
                        <>
                          <td className="px-4 py-3 text-gray-600">{item.city}</td>
                          <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                            <span className="text-base">🏭</span>
                            <span>{item.name || item.warehouse}</span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500 font-mono">
                            {item.code || "-"}
                          </td>
                        </>
                      )}
                      {activeTab === "room" && (
                        <>
                          <td className="px-4 py-3 text-gray-600">{item.city}</td>
                          <td className="px-4 py-3 text-gray-600">{item.warehouse}</td>
                          <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                            <span className="text-base">🚪</span>
                            <span>{item.name || item.room}</span>
                          </td>
                        </>
                      )}
                      {activeTab === "rack" && (
                        <>
                          <td className="px-4 py-3 text-gray-600 text-xs">{item.city}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{item.warehouse}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs">{item.room}</td>
                          <td className="px-4 py-3 font-semibold text-blue-600 flex items-center gap-1.5">
                            <span>📦</span>
                            <span>{item.name || item.rackNumber}</span>
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--primary-color)]/30 text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 transition-colors"
                            title="Edit"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                      No {activeTab} locations found. Use the form on the left to add one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

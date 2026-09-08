import React, { useMemo, useState, useEffect } from "react";
import { detectModuleFromPath } from "../../../utils/moduleAuth";
import { deletePOSStaffBills, getPOSStaffBills, POSStaffBill, StaffModule } from "../../../utils/staffSession";
import { toast } from "react-hot-toast";

const DUMMY_STAFF_BILLS: POSStaffBill[] = [
  {
    id: "sb_1001",
    module: "admin",
    billNumber: "BIL-2026-9041",
    orderId: "POS-ORD-77101",
    createdBy: "staff_101",
    staffName: "Vikram Rathore (Lead Cashier)",
    paymentMode: "UPI",
    totalAmount: 18450,
    numberOfProducts: 4,
    createdAt: "2026-09-08T10:45:00.000Z",
    items: [
      { productName: "NPK 19:19:19 100% Water Soluble Fertilizer 25kg", qty: 2, price: 8400 },
      { productName: "Tata Rallis Anant Insecticide 500ml", qty: 3, price: 4350 },
      { productName: "Neem Cake Organic Manure 50kg Bag", qty: 2, price: 3200 },
      { productName: "Heavy Duty Knapsack Battery Sprayer 16L", qty: 1, price: 2500 },
    ],
  },
  {
    id: "sb_1002",
    module: "admin",
    billNumber: "BIL-2026-9042",
    orderId: "POS-ORD-77102",
    createdBy: "staff_102",
    staffName: "Kavita Meena (Billing Desk)",
    paymentMode: "Cash",
    totalAmount: 6250,
    numberOfProducts: 3,
    createdAt: "2026-09-08T09:30:00.000Z",
    items: [
      { productName: "Drip Irrigation Lateral Pipe 16mm (100m Roll)", qty: 1, price: 2850 },
      { productName: "Drip Emitters & Joiner Accessory Kit (100 pcs)", qty: 2, price: 1400 },
      { productName: "Bayer Confidor Insecticide 250ml", qty: 2, price: 2000 },
    ],
  },
  {
    id: "sb_1003",
    module: "admin",
    billNumber: "BIL-2026-9043",
    orderId: "POS-ORD-77103",
    createdBy: "staff_103",
    staffName: "Deepak Solanki (Store Executive)",
    paymentMode: "Card",
    totalAmount: 34200,
    numberOfProducts: 5,
    createdAt: "2026-09-08T08:15:00.000Z",
    items: [
      { productName: "Hybrid Sunflower Seeds High Yield (5kg Pack)", qty: 4, price: 9600 },
      { productName: "Urea Coated Slow Release Fertilizer (50kg)", qty: 10, price: 12500 },
      { productName: "Zinc Sulphate Heptahydrate 21% (25kg)", qty: 3, price: 4500 },
      { productName: "Humic Acid 98% Potassium Humate (5kg)", qty: 2, price: 4600 },
      { productName: "Agricultural Pruning Shears & Grafting Tool", qty: 3, price: 3000 },
    ],
  },
  {
    id: "sb_1004",
    module: "admin",
    billNumber: "BIL-2026-9044",
    orderId: "POS-ORD-77104",
    createdBy: "staff_101",
    staffName: "Vikram Rathore (Lead Cashier)",
    paymentMode: "Cash",
    totalAmount: 9800,
    numberOfProducts: 2,
    createdAt: "2026-09-07T16:20:00.000Z",
    items: [
      { productName: "Mahyco Hybrid Maize Seeds (4kg Pack)", qty: 4, price: 6400 },
      { productName: "Bio Fungicide Trichoderma Viride 1kg", qty: 10, price: 3400 },
    ],
  },
  {
    id: "sb_1005",
    module: "admin",
    billNumber: "BIL-2026-9045",
    orderId: "POS-ORD-77105",
    createdBy: "staff_104",
    staffName: "Sunita Jain (Cashier-2)",
    paymentMode: "UPI",
    totalAmount: 14750,
    numberOfProducts: 3,
    createdAt: "2026-09-07T14:10:00.000Z",
    items: [
      { productName: "Submersible Water Pump 1.5 HP Single Phase", qty: 1, price: 11500 },
      { productName: "Heavy Flexible PVC Suction Hose 2-inch (10m)", qty: 1, price: 1850 },
      { productName: "Brass Foot Valve & Hose Clamp set", qty: 2, price: 1400 },
    ],
  },
  {
    id: "sb_1006",
    module: "admin",
    billNumber: "BIL-2026-9046",
    orderId: "POS-ORD-77106",
    createdBy: "staff_102",
    staffName: "Kavita Meena (Billing Desk)",
    paymentMode: "Net Banking",
    totalAmount: 52000,
    numberOfProducts: 4,
    createdAt: "2026-09-07T11:00:00.000Z",
    items: [
      { productName: "Solar Insect Trap for Pest Control (Set of 4)", qty: 2, price: 18000 },
      { productName: "DAP Fertilizer Di-Ammonium Phosphate (50kg)", qty: 15, price: 20250 },
      { productName: "Organic Seaweed Extract Liquid 5L", qty: 3, price: 6750 },
      { productName: "Syngenta Amistar Top Fungicide 1L", qty: 2, price: 7000 },
    ],
  },
  {
    id: "sb_1007",
    module: "admin",
    billNumber: "BIL-2026-9047",
    orderId: "POS-ORD-77107",
    createdBy: "staff_105",
    staffName: "Amitabh Sen (Billing Officer)",
    paymentMode: "Cash",
    totalAmount: 4300,
    numberOfProducts: 2,
    createdAt: "2026-09-06T15:45:00.000Z",
    items: [
      { productName: "Bio NPK Micro-Nutrient Granules 10kg", qty: 2, price: 2800 },
      { productName: "Sticky Pest Traps Yellow/Blue Pack of 25", qty: 3, price: 1500 },
    ],
  },
  {
    id: "sb_1008",
    module: "admin",
    billNumber: "BIL-2026-9048",
    orderId: "POS-ORD-77108",
    createdBy: "staff_103",
    staffName: "Deepak Solanki (Store Executive)",
    paymentMode: "UPI",
    totalAmount: 27600,
    numberOfProducts: 3,
    createdAt: "2026-09-05T17:15:00.000Z",
    items: [
      { productName: "Mulching Film 25 Micron 400m Roll Silver-Black", qty: 4, price: 14400 },
      { productName: "Hole Puncher Tool for Mulching Sheet", qty: 2, price: 1200 },
      { productName: "Coromandel Gromor 28-28-0 Complex Fertilizer", qty: 8, price: 12000 },
    ],
  },
  {
    id: "sb_1009",
    module: "admin",
    billNumber: "BIL-2026-9049",
    orderId: "POS-ORD-77109",
    createdBy: "staff_104",
    staffName: "Sunita Jain (Cashier-2)",
    paymentMode: "Card",
    totalAmount: 8900,
    numberOfProducts: 2,
    createdAt: "2026-09-04T12:30:00.000Z",
    items: [
      { productName: "FMC Coragen Insecticide 150ml", qty: 3, price: 6900 },
      { productName: "Non-Ionic Silicon Spreader & Sticker 500ml", qty: 4, price: 2000 },
    ],
  },
  {
    id: "sb_1010",
    module: "admin",
    billNumber: "BIL-2026-9050",
    orderId: "POS-ORD-77110",
    createdBy: "staff_101",
    staffName: "Vikram Rathore (Lead Cashier)",
    paymentMode: "UPI",
    totalAmount: 21500,
    numberOfProducts: 3,
    createdAt: "2026-09-03T10:15:00.000Z",
    items: [
      { productName: "2-Stroke Portable Power Sprayer Engine Pump", qty: 1, price: 14500 },
      { productName: "50m High-Pressure Spray Hose Pipe 8.5mm", qty: 1, price: 4200 },
      { productName: "Turbo Spray Gun with Brass Nozzle", qty: 2, price: 2800 },
    ],
  },
];

const StaffBillReport: React.FC = () => {
  const moduleType = (detectModuleFromPath() === "seller" ? "seller" : "admin") as StaffModule;
  const [staffFilter, setStaffFilter] = useState("all");
  const [paymentModeFilter, setPaymentModeFilter] = useState("all");
  const [billSearch, setBillSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedBill, setSelectedBill] = useState<POSStaffBill | null>(null);
  const [selectedBillIds, setSelectedBillIds] = useState<Set<string>>(new Set());
  const [refreshKey, setRefreshKey] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [draftById, setDraftById] = useState<
    Record<
      string,
      {
        staffName?: string;
        paymentMode?: string;
        totalAmount?: number;
      }
    >
  >({});

  // Auto initialize mock bills if localStorage is empty
  useEffect(() => {
    const storageKey = `${moduleType}_pos_staff_bills`;
    const stored = localStorage.getItem(storageKey);
    if (!stored || stored === "[]") {
      localStorage.setItem(storageKey, JSON.stringify(DUMMY_STAFF_BILLS));
      setRefreshKey((k) => k + 1);
    }
  }, [moduleType]);

  const bills = useMemo(() => {
    const raw = getPOSStaffBills(moduleType);
    if (raw && raw.length > 0) return raw;
    return DUMMY_STAFF_BILLS;
  }, [moduleType, refreshKey]);

  const uniqueStaffNames = useMemo(() => {
    return Array.from(new Set(bills.map((b) => b.staffName).filter(Boolean)));
  }, [bills]);

  const filteredBills = useMemo(() => {
    const now = new Date();
    return bills.filter((bill) => {
      if (staffFilter !== "all" && bill.staffName !== staffFilter) return false;
      if (paymentModeFilter !== "all" && bill.paymentMode?.toLowerCase() !== paymentModeFilter.toLowerCase()) return false;
      if (
        billSearch.trim() &&
        !String(bill.billNumber || "")
          .toLowerCase()
          .includes(billSearch.trim().toLowerCase()) &&
        !String(bill.staffName || "")
          .toLowerCase()
          .includes(billSearch.trim().toLowerCase()) &&
        !String(bill.orderId || "")
          .toLowerCase()
          .includes(billSearch.trim().toLowerCase())
      ) {
        return false;
      }

      if (dateFilter !== "all") {
        const billDate = new Date(bill.createdAt);
        if (dateFilter === "today") {
          if (billDate.toDateString() !== now.toDateString()) return false;
        }
        if (dateFilter === "last7") {
          const diff = now.getTime() - billDate.getTime();
          if (diff > 7 * 24 * 60 * 60 * 1000) return false;
        }
        if (dateFilter === "last30") {
          const diff = now.getTime() - billDate.getTime();
          if (diff > 30 * 24 * 60 * 60 * 1000) return false;
        }
      }

      return true;
    });
  }, [bills, staffFilter, paymentModeFilter, billSearch, dateFilter]);

  const totalAmount = useMemo(
    () => filteredBills.reduce((sum, bill) => sum + Number(bill.totalAmount || 0), 0),
    [filteredBills]
  );

  const avgBillAmount = useMemo(
    () => (filteredBills.length > 0 ? Math.round(totalAmount / filteredBills.length) : 0),
    [totalAmount, filteredBills.length]
  );

  const cashTotal = useMemo(
    () =>
      filteredBills
        .filter((b) => b.paymentMode?.toLowerCase() === "cash")
        .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0),
    [filteredBills]
  );

  const digitalTotal = useMemo(
    () =>
      filteredBills
        .filter((b) => b.paymentMode?.toLowerCase() !== "cash")
        .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0),
    [filteredBills]
  );

  const allSelected =
    filteredBills.length > 0 && filteredBills.every((bill) => selectedBillIds.has(bill.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBillIds(new Set(filteredBills.map((bill) => bill.id)));
    } else {
      setSelectedBillIds(new Set());
    }
  };

  const handleSelectBill = (id: string) => {
    setSelectedBillIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDeleteSelected = () => {
    if (selectedBillIds.size === 0) return;
    const ok = window.confirm(`Delete ${selectedBillIds.size} selected item(s)?`);
    if (!ok) return;

    const ids = Array.from(selectedBillIds);
    deletePOSStaffBills(moduleType, ids);
    setSelectedBillIds(new Set());
    if (selectedBill?.id && ids.includes(selectedBill.id)) setSelectedBill(null);
    setRefreshKey((k) => k + 1);
    toast.success("Selected items deleted");
  };

  const handleResetDummyData = () => {
    const storageKey = `${moduleType}_pos_staff_bills`;
    localStorage.setItem(storageKey, JSON.stringify(DUMMY_STAFF_BILLS));
    setRefreshKey((k) => k + 1);
    toast.success("Sample staff bills reloaded successfully!");
  };

  const updateDraft = (
    id: string,
    patch: { staffName?: string; paymentMode?: string; totalAmount?: number }
  ) => {
    setDraftById((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch } }));
  };

  const handleToggleEditMode = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    const editedIds = Object.keys(draftById);
    if (editedIds.length === 0) {
      setEditMode(false);
      return;
    }

    const storageKey = `${moduleType}_pos_staff_bills`;
    const existing = getPOSStaffBills(moduleType).length > 0 ? getPOSStaffBills(moduleType) : DUMMY_STAFF_BILLS;
    const next = existing.map((bill) => {
      const draft = draftById[bill.id];
      if (!draft) return bill;
      return {
        ...bill,
        ...(draft.staffName !== undefined ? { staffName: draft.staffName } : {}),
        ...(draft.paymentMode !== undefined ? { paymentMode: draft.paymentMode } : {}),
        ...(draft.totalAmount !== undefined ? { totalAmount: draft.totalAmount } : {}),
      };
    });

    localStorage.setItem(storageKey, JSON.stringify(next));
    setDraftById({});
    setEditMode(false);
    setRefreshKey((k) => k + 1);
    toast.success("Bills updated successfully");
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#f187b5] flex items-center justify-center font-bold text-xl border border-pink-100">
            📑
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Staff Bill Report</h1>
            <p className="text-sm text-gray-500 font-medium mt-0.5">
              Comprehensive breakdown of POS bills created by store cashiers and staff
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleResetDummyData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-pink-200 text-pink-700 bg-pink-50/70 hover:bg-pink-100/70 active:scale-95 transition-all"
            title="Reload realistic dummy bills"
          >
            <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reload Dummy Data
          </button>

          <button
            onClick={handleToggleEditMode}
            className={`inline-flex items-center px-4 py-2 text-xs font-bold rounded-xl active:scale-95 transition-all shadow-sm text-white ${
              editMode ? "bg-indigo-700 ring-2 ring-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            {editMode ? "Done Editing" : "Bulk Edit"}
          </button>

          <button
            onClick={handleDeleteSelected}
            disabled={selectedBillIds.size === 0}
            className="px-4 py-2 text-xs rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Delete{selectedBillIds.size > 0 ? ` (${selectedBillIds.size})` : ""}
          </button>

          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="px-4 py-2 text-xs rounded-xl bg-[#f187b5] text-white font-bold hover:bg-[#db76a3] transition-colors shadow-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-gray-500 uppercase font-black tracking-wider">Total Bills</p>
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">🧾</span>
          </div>
          <p className="text-2xl font-black text-gray-900 mt-2">{filteredBills.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Staff POS Generated</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-gray-500 uppercase font-black tracking-wider">Total Sales</p>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">💰</span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-2">₹{totalAmount.toLocaleString("en-IN")}</p>
          <p className="text-xs text-gray-400 mt-0.5">Gross Billing Amount</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-gray-500 uppercase font-black tracking-wider">Avg Bill Value</p>
            <span className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">📊</span>
          </div>
          <p className="text-2xl font-black text-purple-700 mt-2">₹{avgBillAmount.toLocaleString("en-IN")}</p>
          <p className="text-xs text-gray-400 mt-0.5">Per Transaction</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-gray-500 uppercase font-black tracking-wider">Cash vs Digital</p>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">💳</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-sm font-black text-gray-800">₹{(cashTotal / 1000).toFixed(1)}k</span>
            <span className="text-xs text-gray-400">Cash /</span>
            <span className="text-sm font-black text-indigo-600">₹{(digitalTotal / 1000).toFixed(1)}k</span>
            <span className="text-xs text-gray-400">Dig</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">Payment Split</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow transition-shadow col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-gray-500 uppercase font-black tracking-wider">Staff Count</p>
            <span className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-sm">👥</span>
          </div>
          <p className="text-2xl font-black text-pink-600 mt-2">{uniqueStaffNames.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">Active Cashiers</p>
        </div>
      </div>

      {/* Filter Toolbar & Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-50/40">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Filter Staff</label>
            <select
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium bg-white outline-none focus:border-[#f187b5] focus:ring-2 focus:ring-pink-100 transition-all"
            >
              <option value="all">All Staff Members ({uniqueStaffNames.length})</option>
              {uniqueStaffNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium bg-white outline-none focus:border-[#f187b5] focus:ring-2 focus:ring-pink-100 transition-all"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Payment Method</label>
            <select
              value={paymentModeFilter}
              onChange={(e) => setPaymentModeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium bg-white outline-none focus:border-[#f187b5] focus:ring-2 focus:ring-pink-100 transition-all"
            >
              <option value="all">All Payment Methods</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                value={billSearch}
                onChange={(e) => setBillSearch(e.target.value)}
                placeholder="Bill no, staff, order ID..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm font-medium bg-white outline-none focus:border-[#f187b5] focus:ring-2 focus:ring-pink-100 transition-all"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-wider w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-[#f187b5] rounded border-gray-300 focus:ring-[#f187b5]"
                  />
                </th>
                <th className="px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-wider">Bill No & Order</th>
                <th className="px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-wider">Staff Cashier</th>
                <th className="px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-wider">Products / Items</th>
                <th className="px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-wider">Payment Mode</th>
                <th className="px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-5 py-3.5 text-[10px] font-black text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                    <p className="text-base font-bold text-gray-600 mb-1">No staff bills found matching the filter</p>
                    <p className="text-xs text-gray-400 mb-3">Try clearing search filters or reload the sample bills</p>
                    <button
                      onClick={handleResetDummyData}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100"
                    >
                      Reload Sample Data
                    </button>
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill.id} className="hover:bg-pink-50/20 transition-colors">
                    <td className="px-5 py-3.5 w-10" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedBillIds.has(bill.id)}
                        onChange={() => handleSelectBill(bill.id)}
                        className="w-4 h-4 text-[#f187b5] rounded border-gray-300 focus:ring-[#f187b5]"
                      />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-gray-900">{bill.billNumber}</div>
                      {bill.orderId && (
                        <div className="text-[11px] font-mono text-gray-400">{bill.orderId}</div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-700">
                      {editMode ? (
                        <input
                          value={draftById[bill.id]?.staffName ?? bill.staffName ?? ""}
                          onChange={(e) => updateDraft(bill.id, { staffName: e.target.value })}
                          className="w-full max-w-[220px] border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-bold text-xs flex items-center justify-center">
                            {(bill.staffName || "S")[0]}
                          </span>
                          <span className="font-semibold text-gray-800">{bill.staffName}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-500">
                      <div>{new Date(bill.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                      <div className="text-[10px] text-gray-400">{new Date(bill.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        {bill.numberOfProducts || bill.items?.length || 1} items
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm">
                      {editMode ? (
                        <select
                          value={draftById[bill.id]?.paymentMode ?? bill.paymentMode ?? ""}
                          onChange={(e) => updateDraft(bill.id, { paymentMode: e.target.value })}
                          className="w-full max-w-[150px] border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        >
                          <option value="Cash">Cash</option>
                          <option value="UPI">UPI</option>
                          <option value="Card">Card</option>
                          <option value="Net Banking">Net Banking</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                            bill.paymentMode?.toLowerCase() === "cash"
                              ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                              : bill.paymentMode?.toLowerCase() === "upi"
                              ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                              : bill.paymentMode?.toLowerCase() === "card"
                              ? "bg-blue-50 text-blue-700 border border-blue-200/60"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          }`}
                        >
                          {bill.paymentMode}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {editMode ? (
                        <div className="flex items-center gap-1.5 max-w-[150px]">
                          <span className="text-gray-500 font-bold text-xs">₹</span>
                          <input
                            type="number"
                            value={draftById[bill.id]?.totalAmount ?? Number(bill.totalAmount || 0)}
                            onChange={(e) =>
                              updateDraft(bill.id, { totalAmount: Number(e.target.value || 0) })
                            }
                            className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold"
                          />
                        </div>
                      ) : (
                        <span className="font-black text-gray-900 text-sm">
                          ₹{Number(bill.totalAmount || 0).toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="px-3 py-1.5 rounded-xl bg-[#f187b5]/10 text-[#f187b5] text-xs font-bold hover:bg-[#f187b5] hover:text-white transition-all shadow-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bill Details Modal */}
      {selectedBill && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm">
                  🧾
                </span>
                <div>
                  <h3 className="font-black text-gray-800 text-base">Staff Bill Details</h3>
                  <p className="text-xs text-gray-400 font-mono">{selectedBill.billNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBill(null)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Staff Cashier</span>
                  <span className="font-bold text-gray-800">{selectedBill.staffName}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Payment Mode</span>
                  <span className="font-bold text-emerald-700">{selectedBill.paymentMode}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Created Date</span>
                  <span className="font-semibold text-gray-700">
                    {new Date(selectedBill.createdAt).toLocaleString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Order Reference</span>
                  <span className="font-mono text-xs font-bold text-gray-600">{selectedBill.orderId || "Direct POS Bill"}</span>
                </div>
              </div>

              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <div className="px-3.5 py-2.5 bg-gray-50 text-xs font-bold text-gray-600 uppercase tracking-wider flex justify-between">
                  <span>Product Item</span>
                  <span>Price</span>
                </div>
                <div className="max-h-56 overflow-y-auto divide-y divide-gray-100">
                  {(selectedBill.items || []).map((item, idx) => (
                    <div key={`${item.productName}-${idx}`} className="px-3.5 py-2.5 flex justify-between items-center hover:bg-gray-50/50">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.productName}</p>
                        <p className="text-xs text-gray-400 font-medium">Quantity: x{item.qty}</p>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">₹{Number(item.price || 0).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-gray-100">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Bill Amount</span>
                <p className="text-xl font-black text-gray-900">₹{Number(selectedBill.totalAmount || 0).toLocaleString("en-IN")}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedBill(null)}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffBillReport;


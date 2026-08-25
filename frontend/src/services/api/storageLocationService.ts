import api from "./config";
import { StorageLocationHierarchy } from "./admin/adminStorageLocationService";

export const getStorageLocationHierarchy = async (
  role: "admin" | "seller" = "admin"
): Promise<StorageLocationHierarchy> => {
  try {
    const endpoint =
      role === "seller"
        ? "/seller/storage-locations/hierarchy"
        : "/admin/storage-locations/hierarchy";
    const res = await api.get(endpoint);
    if (res.data?.success && res.data?.data) {
      return res.data.data;
    }
  } catch (err) {
    console.warn("Could not fetch storage location hierarchy, using defaults", err);
  }

  // Fallback defaults
  return {
    Mumbai: {
      "Mumbai Central Warehouse (MC-01)": {
        "Room A": ["Rack 1", "Rack 2", "Rack 3", "Rack 4", "Rack 5"],
        "Room B": ["Rack 1", "Rack 2", "Rack 3", "Rack 4", "Rack 5"],
      },
      "Andheri Warehouse (AW-02)": {
        "Room 101": ["Rack A", "Rack B", "Rack C"],
        "Room 102": ["Rack A", "Rack B", "Rack C"],
      },
    },
    Delhi: {
      "Okhla Warehouse (OW-01)": {
        "Room X": ["Rack R1", "Rack R2", "Rack R3"],
        "Room Y": ["Rack R1", "Rack R2", "Rack R3"],
      },
    },
    Bangalore: {
      "Whitefield Warehouse (WW-01)": {
        "Room 1": ["Rack B1", "Rack B2", "Rack B3", "Rack B4"],
        "Room 2": ["Rack B1", "Rack B2", "Rack B3", "Rack B4"],
      },
    },
  };
};

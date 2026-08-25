import api from "../config";

export interface StorageLocationItem {
  _id: string;
  level: "city" | "warehouse" | "room" | "rack";
  name: string;
  city: string;
  warehouse?: string;
  room?: string;
  rackNumber?: string;
  code?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface StorageLocationPayload {
  level: "city" | "warehouse" | "room" | "rack";
  name: string;
  city?: string;
  warehouse?: string;
  room?: string;
  rackNumber?: string;
  code?: string;
  isActive?: boolean;
}

export type StorageLocationHierarchy = Record<
  string,
  Record<string, Record<string, string[]>>
>;

export const getAdminStorageLocations = async (params?: {
  level?: string;
  city?: string;
  warehouse?: string;
  room?: string;
  search?: string;
}) => {
  const response = await api.get("/admin/storage-locations", { params });
  return response.data;
};

export const getAdminStorageLocationHierarchy = async (): Promise<{
  success: boolean;
  data: StorageLocationHierarchy;
}> => {
  const response = await api.get("/admin/storage-locations/hierarchy");
  return response.data;
};

export const createAdminStorageLocation = async (
  data: StorageLocationPayload
) => {
  const response = await api.post("/admin/storage-locations", data);
  return response.data;
};

export const updateAdminStorageLocation = async (
  id: string,
  data: Partial<StorageLocationPayload>
) => {
  const response = await api.put(`/admin/storage-locations/${id}`, data);
  return response.data;
};

export const deleteAdminStorageLocation = async (id: string) => {
  const response = await api.delete(`/admin/storage-locations/${id}`);
  return response.data;
};

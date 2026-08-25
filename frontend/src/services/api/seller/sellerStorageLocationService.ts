import api from "../config";
import {
  StorageLocationItem,
  StorageLocationPayload,
  StorageLocationHierarchy,
} from "../admin/adminStorageLocationService";

export type { StorageLocationItem, StorageLocationPayload, StorageLocationHierarchy };

export const getSellerStorageLocations = async (params?: {
  level?: string;
  city?: string;
  warehouse?: string;
  room?: string;
  search?: string;
}) => {
  const response = await api.get("/seller/storage-locations", { params });
  return response.data;
};

export const getSellerStorageLocationHierarchy = async (): Promise<{
  success: boolean;
  data: StorageLocationHierarchy;
}> => {
  const response = await api.get("/seller/storage-locations/hierarchy");
  return response.data;
};

export const createSellerStorageLocation = async (
  data: StorageLocationPayload
) => {
  const response = await api.post("/seller/storage-locations", data);
  return response.data;
};

export const updateSellerStorageLocation = async (
  id: string,
  data: Partial<StorageLocationPayload>
) => {
  const response = await api.put(`/seller/storage-locations/${id}`, data);
  return response.data;
};

export const deleteSellerStorageLocation = async (id: string) => {
  const response = await api.delete(`/seller/storage-locations/${id}`);
  return response.data;
};

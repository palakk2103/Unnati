import React from "react";
import StorageLocationSetupView from "../../shared/StorageLocationSetupView";
import {
  getAdminStorageLocations,
  createAdminStorageLocation,
  updateAdminStorageLocation,
  deleteAdminStorageLocation,
} from "../../../services/api/admin/adminStorageLocationService";

export default function AdminStorageLocationSetup() {
  return (
    <StorageLocationSetupView
      role="admin"
      fetchLocationsApi={getAdminStorageLocations}
      createLocationApi={createAdminStorageLocation}
      updateLocationApi={updateAdminStorageLocation}
      deleteLocationApi={deleteAdminStorageLocation}
    />
  );
}

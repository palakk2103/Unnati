import React from "react";
import StorageLocationSetupView from "../../shared/StorageLocationSetupView";
import {
  getSellerStorageLocations,
  createSellerStorageLocation,
  updateSellerStorageLocation,
  deleteSellerStorageLocation,
} from "../../../services/api/seller/sellerStorageLocationService";

export default function SellerStorageLocationSetup() {
  return (
    <StorageLocationSetupView
      role="seller"
      fetchLocationsApi={getSellerStorageLocations}
      createLocationApi={createSellerStorageLocation}
      updateLocationApi={updateSellerStorageLocation}
      deleteLocationApi={deleteSellerStorageLocation}
    />
  );
}

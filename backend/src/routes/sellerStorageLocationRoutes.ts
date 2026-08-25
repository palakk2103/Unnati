import { Router } from "express";
import { authenticate, requireUserType } from "../middleware/auth";
import * as storageLocationController from "../modules/seller/controllers/sellerStorageLocationController";

const router = Router();

// Hierarchy endpoint for dropdowns
router.get("/hierarchy", authenticate, storageLocationController.getStorageLocationHierarchy);

// All other routes require authentication and Seller role
router.use(authenticate);
router.use(requireUserType("Seller"));

router.get("/", storageLocationController.getStorageLocations);
router.post("/", storageLocationController.createStorageLocation);
router.put("/:id", storageLocationController.updateStorageLocation);
router.delete("/:id", storageLocationController.deleteStorageLocation);

export default router;

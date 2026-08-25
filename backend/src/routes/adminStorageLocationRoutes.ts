import { Router } from "express";
import { authenticate, requireUserType } from "../middleware/auth";
import * as storageLocationController from "../modules/admin/controllers/adminStorageLocationController";

const router = Router();

// Hierarchy endpoint for dropdowns (can be accessed by authenticated users)
router.get("/hierarchy", authenticate, storageLocationController.getStorageLocationHierarchy);

// All other routes require authentication and Admin role
router.use(authenticate);
router.use(requireUserType("Admin"));

router.get("/", storageLocationController.getStorageLocations);
router.post("/", storageLocationController.createStorageLocation);
router.put("/:id", storageLocationController.updateStorageLocation);
router.delete("/:id", storageLocationController.deleteStorageLocation);

export default router;

import { Request, Response } from "express";
import StorageLocation, { IStorageLocation } from "../../../models/StorageLocation";

export const getStorageLocations = async (req: Request, res: Response) => {
  try {
    const { level, city, warehouse, room, search } = req.query;
    const query: any = {};

    if (level) query.level = level;
    if (city) query.city = city;
    if (warehouse) query.warehouse = warehouse;
    if (room) query.room = room;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { warehouse: { $regex: search, $options: "i" } },
        { room: { $regex: search, $options: "i" } },
        { rackNumber: { $regex: search, $options: "i" } },
      ];
    }

    const locations = await StorageLocation.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: locations });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStorageLocationHierarchy = async (req: Request, res: Response) => {
  try {
    const allLocations = await StorageLocation.find({ isActive: true });

    const hierarchy: Record<string, Record<string, Record<string, string[]>>> = {};

    allLocations.forEach((loc) => {
      if (loc.city && !hierarchy[loc.city]) {
        hierarchy[loc.city] = {};
      }
    });

    allLocations.forEach((loc) => {
      if (loc.city && loc.warehouse) {
        if (!hierarchy[loc.city]) hierarchy[loc.city] = {};
        if (!hierarchy[loc.city][loc.warehouse]) {
          hierarchy[loc.city][loc.warehouse] = {};
        }
      }
    });

    allLocations.forEach((loc) => {
      if (loc.city && loc.warehouse && loc.room) {
        if (!hierarchy[loc.city]) hierarchy[loc.city] = {};
        if (!hierarchy[loc.city][loc.warehouse]) hierarchy[loc.city][loc.warehouse] = {};
        if (!hierarchy[loc.city][loc.warehouse][loc.room]) {
          hierarchy[loc.city][loc.warehouse][loc.room] = [];
        }
      }
    });

    allLocations.forEach((loc) => {
      const rackName = loc.rackNumber || (loc.level === "rack" ? loc.name : null);
      if (loc.city && loc.warehouse && loc.room && rackName) {
        if (!hierarchy[loc.city]) hierarchy[loc.city] = {};
        if (!hierarchy[loc.city][loc.warehouse]) hierarchy[loc.city][loc.warehouse] = {};
        if (!hierarchy[loc.city][loc.warehouse][loc.room]) {
          hierarchy[loc.city][loc.warehouse][loc.room] = [];
        }
        if (!hierarchy[loc.city][loc.warehouse][loc.room].includes(rackName)) {
          hierarchy[loc.city][loc.warehouse][loc.room].push(rackName);
        }
      }
    });

    res.status(200).json({
      success: true,
      data: hierarchy,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStorageLocation = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).user?._id;
    const { level, name, city, warehouse, room, rackNumber, code } = req.body;

    if (!level || !name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Level and Name are required",
      });
    }

    const trimmedName = name.trim();
    let docData: Partial<IStorageLocation> = {
      level,
      name: trimmedName,
      code: code ? String(code).trim() : "",
      createdBy: "Seller",
      sellerId: sellerId || null,
      isActive: true,
    };

    if (level === "city") {
      docData.city = trimmedName;
      const existing = await StorageLocation.findOne({
        level: "city",
        name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: "City already exists" });
      }
    } else if (level === "warehouse") {
      if (!city?.trim()) {
        return res.status(400).json({ success: false, message: "City is required for Warehouse" });
      }
      docData.city = city.trim();
      docData.warehouse = trimmedName;

      const existing = await StorageLocation.findOne({
        level: "warehouse",
        city: docData.city,
        name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: "Warehouse already exists in this city" });
      }
    } else if (level === "room") {
      if (!city?.trim() || !warehouse?.trim()) {
        return res.status(400).json({ success: false, message: "City and Warehouse are required for Room" });
      }
      docData.city = city.trim();
      docData.warehouse = warehouse.trim();
      docData.room = trimmedName;

      const existing = await StorageLocation.findOne({
        level: "room",
        city: docData.city,
        warehouse: docData.warehouse,
        name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: "Room already exists in this warehouse" });
      }
    } else if (level === "rack") {
      if (!city?.trim() || !warehouse?.trim() || !room?.trim()) {
        return res.status(400).json({ success: false, message: "City, Warehouse, and Room are required for Rack" });
      }
      docData.city = city.trim();
      docData.warehouse = warehouse.trim();
      docData.room = room.trim();
      docData.rackNumber = rackNumber?.trim() || trimmedName;

      const existing = await StorageLocation.findOne({
        level: "rack",
        city: docData.city,
        warehouse: docData.warehouse,
        room: docData.room,
        name: { $regex: new RegExp(`^${trimmedName}$`, "i") },
      });
      if (existing) {
        return res.status(400).json({ success: false, message: "Rack already exists in this room" });
      }
    }

    const created = await StorageLocation.create(docData);
    res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStorageLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, code, isActive, city, warehouse, room, rackNumber } = req.body;

    const existing = await StorageLocation.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Storage location not found" });
    }

    const oldName = existing.name;
    const newName = name ? name.trim() : oldName;

    existing.name = newName;
    if (code !== undefined) existing.code = String(code).trim();
    if (isActive !== undefined) existing.isActive = Boolean(isActive);

    if (existing.level === "city") {
      existing.city = newName;
      if (oldName !== newName) {
        await StorageLocation.updateMany({ city: oldName }, { $set: { city: newName } });
      }
    } else if (existing.level === "warehouse") {
      if (city) existing.city = city.trim();
      existing.warehouse = newName;
      if (oldName !== newName) {
        await StorageLocation.updateMany(
          { city: existing.city, warehouse: oldName },
          { $set: { warehouse: newName } }
        );
      }
    } else if (existing.level === "room") {
      if (city) existing.city = city.trim();
      if (warehouse) existing.warehouse = warehouse.trim();
      existing.room = newName;
      if (oldName !== newName) {
        await StorageLocation.updateMany(
          { city: existing.city, warehouse: existing.warehouse, room: oldName },
          { $set: { room: newName } }
        );
      }
    } else if (existing.level === "rack") {
      if (city) existing.city = city.trim();
      if (warehouse) existing.warehouse = warehouse.trim();
      if (room) existing.room = room.trim();
      existing.rackNumber = rackNumber?.trim() || newName;
    }

    await existing.save();
    res.status(200).json({ success: true, data: existing });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStorageLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const location = await StorageLocation.findById(id);
    if (!location) {
      return res.status(404).json({ success: false, message: "Storage location not found" });
    }

    if (location.level === "city") {
      await StorageLocation.deleteMany({ city: location.city });
    } else if (location.level === "warehouse") {
      await StorageLocation.deleteMany({ city: location.city, warehouse: location.warehouse });
    } else if (location.level === "room") {
      await StorageLocation.deleteMany({
        city: location.city,
        warehouse: location.warehouse,
        room: location.room,
      });
    } else {
      await StorageLocation.findByIdAndDelete(id);
    }

    res.status(200).json({ success: true, message: "Storage location deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

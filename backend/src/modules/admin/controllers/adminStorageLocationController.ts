import { Request, Response } from "express";
import StorageLocation, { IStorageLocation } from "../../../models/StorageLocation";

// Initial seed data if DB is empty
const SEED_LOCATIONS = [
  // Mumbai
  { level: "city", name: "Mumbai", city: "Mumbai" },
  { level: "warehouse", name: "Mumbai Central Warehouse (MC-01)", city: "Mumbai", warehouse: "Mumbai Central Warehouse (MC-01)" },
  { level: "warehouse", name: "Andheri Warehouse (AW-02)", city: "Mumbai", warehouse: "Andheri Warehouse (AW-02)" },
  { level: "room", name: "Room A", city: "Mumbai", warehouse: "Mumbai Central Warehouse (MC-01)", room: "Room A" },
  { level: "room", name: "Room B", city: "Mumbai", warehouse: "Mumbai Central Warehouse (MC-01)", room: "Room B" },
  { level: "room", name: "Room 101", city: "Mumbai", warehouse: "Andheri Warehouse (AW-02)", room: "Room 101" },
  { level: "room", name: "Room 102", city: "Mumbai", warehouse: "Andheri Warehouse (AW-02)", room: "Room 102" },
  { level: "rack", name: "Rack 1", city: "Mumbai", warehouse: "Mumbai Central Warehouse (MC-01)", room: "Room A", rackNumber: "Rack 1" },
  { level: "rack", name: "Rack 2", city: "Mumbai", warehouse: "Mumbai Central Warehouse (MC-01)", room: "Room A", rackNumber: "Rack 2" },
  { level: "rack", name: "Rack 3", city: "Mumbai", warehouse: "Mumbai Central Warehouse (MC-01)", room: "Room A", rackNumber: "Rack 3" },
  { level: "rack", name: "Rack 1", city: "Mumbai", warehouse: "Mumbai Central Warehouse (MC-01)", room: "Room B", rackNumber: "Rack 1" },
  { level: "rack", name: "Rack 2", city: "Mumbai", warehouse: "Mumbai Central Warehouse (MC-01)", room: "Room B", rackNumber: "Rack 2" },
  { level: "rack", name: "Rack A", city: "Mumbai", warehouse: "Andheri Warehouse (AW-02)", room: "Room 101", rackNumber: "Rack A" },
  { level: "rack", name: "Rack B", city: "Mumbai", warehouse: "Andheri Warehouse (AW-02)", room: "Room 101", rackNumber: "Rack B" },

  // Delhi
  { level: "city", name: "Delhi", city: "Delhi" },
  { level: "warehouse", name: "Okhla Warehouse (OW-01)", city: "Delhi", warehouse: "Okhla Warehouse (OW-01)" },
  { level: "room", name: "Room X", city: "Delhi", warehouse: "Okhla Warehouse (OW-01)", room: "Room X" },
  { level: "room", name: "Room Y", city: "Delhi", warehouse: "Okhla Warehouse (OW-01)", room: "Room Y" },
  { level: "rack", name: "Rack R1", city: "Delhi", warehouse: "Okhla Warehouse (OW-01)", room: "Room X", rackNumber: "Rack R1" },
  { level: "rack", name: "Rack R2", city: "Delhi", warehouse: "Okhla Warehouse (OW-01)", room: "Room X", rackNumber: "Rack R2" },
  { level: "rack", name: "Rack R1", city: "Delhi", warehouse: "Okhla Warehouse (OW-01)", room: "Room Y", rackNumber: "Rack R1" },

  // Bangalore
  { level: "city", name: "Bangalore", city: "Bangalore" },
  { level: "warehouse", name: "Whitefield Warehouse (WW-01)", city: "Bangalore", warehouse: "Whitefield Warehouse (WW-01)" },
  { level: "room", name: "Room 1", city: "Bangalore", warehouse: "Whitefield Warehouse (WW-01)", room: "Room 1" },
  { level: "room", name: "Room 2", city: "Bangalore", warehouse: "Whitefield Warehouse (WW-01)", room: "Room 2" },
  { level: "rack", name: "Rack B1", city: "Bangalore", warehouse: "Whitefield Warehouse (WW-01)", room: "Room 1", rackNumber: "Rack B1" },
  { level: "rack", name: "Rack B2", city: "Bangalore", warehouse: "Whitefield Warehouse (WW-01)", room: "Room 1", rackNumber: "Rack B2" },
  { level: "rack", name: "Rack B1", city: "Bangalore", warehouse: "Whitefield Warehouse (WW-01)", room: "Room 2", rackNumber: "Rack B1" },
];

const ensureSeedData = async () => {
  const count = await StorageLocation.countDocuments();
  if (count === 0) {
    await StorageLocation.insertMany(
      SEED_LOCATIONS.map((loc) => ({
        ...loc,
        createdBy: "Admin",
        isActive: true,
      }))
    );
  }
};

export const getStorageLocations = async (req: Request, res: Response) => {
  try {
    await ensureSeedData();

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
    await ensureSeedData();

    const allLocations = await StorageLocation.find({ isActive: true });

    const hierarchy: Record<string, Record<string, Record<string, string[]>>> = {};

    // First collect all cities
    allLocations.forEach((loc) => {
      if (loc.city && !hierarchy[loc.city]) {
        hierarchy[loc.city] = {};
      }
    });

    // Then collect warehouses
    allLocations.forEach((loc) => {
      if (loc.city && loc.warehouse) {
        if (!hierarchy[loc.city]) hierarchy[loc.city] = {};
        if (!hierarchy[loc.city][loc.warehouse]) {
          hierarchy[loc.city][loc.warehouse] = {};
        }
      }
    });

    // Then collect rooms
    allLocations.forEach((loc) => {
      if (loc.city && loc.warehouse && loc.room) {
        if (!hierarchy[loc.city]) hierarchy[loc.city] = {};
        if (!hierarchy[loc.city][loc.warehouse]) hierarchy[loc.city][loc.warehouse] = {};
        if (!hierarchy[loc.city][loc.warehouse][loc.room]) {
          hierarchy[loc.city][loc.warehouse][loc.room] = [];
        }
      }
    });

    // Finally collect racks
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
      createdBy: "Admin",
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
      // Cascade update to child warehouses, rooms, racks
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

    // Cascade delete children to keep tree clean
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

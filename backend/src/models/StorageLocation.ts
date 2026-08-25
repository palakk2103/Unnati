import mongoose, { Schema, Document } from "mongoose";

export interface IStorageLocation extends Document {
  level: "city" | "warehouse" | "room" | "rack";
  name: string;
  city: string;
  warehouse?: string;
  room?: string;
  rackNumber?: string;
  code?: string;
  createdBy: "Admin" | "Seller";
  sellerId?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StorageLocationSchema: Schema = new Schema(
  {
    level: {
      type: String,
      enum: ["city", "warehouse", "room", "rack"],
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    warehouse: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    room: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    rackNumber: {
      type: String,
      trim: true,
      default: "",
    },
    code: {
      type: String,
      trim: true,
      default: "",
    },
    createdBy: {
      type: String,
      enum: ["Admin", "Seller"],
      default: "Admin",
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      default: null,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Compound index for fast hierarchical lookups
StorageLocationSchema.index(
  { level: 1, city: 1, warehouse: 1, room: 1, name: 1, sellerId: 1 },
  { background: true }
);

export default mongoose.model<IStorageLocation>(
  "StorageLocation",
  StorageLocationSchema
);

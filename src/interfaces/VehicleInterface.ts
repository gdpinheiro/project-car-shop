import { Schema } from 'mongoose';
import { z } from 'zod';

const VehicleSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

type Vehicle = z.infer<typeof VehicleSchema>;

const vehicleMongooseSchema = new Schema<Vehicle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
});

export { Vehicle, vehicleMongooseSchema, VehicleSchema };

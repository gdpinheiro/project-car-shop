import { model, Schema } from 'mongoose';
import { z } from 'zod';
import { Vehicle, VehicleSchema } from './VehicleInterface';

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

interface Car extends z.infer<typeof CarSchema>, Vehicle {}

const carMongooseSchema = new Schema<Car>(
  {
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  },
  { versionKey: false },
);

const carMongooseModel = model('Cars', carMongooseSchema);

export { Car, carMongooseSchema, carMongooseModel, CarSchema };

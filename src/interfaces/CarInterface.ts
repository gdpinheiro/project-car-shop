import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

type Car = Vehicle & z.infer<typeof CarSchema>;

export default CarSchema;
export { Car };

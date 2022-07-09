import { Car, CarSchema } from '../interfaces/CarInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/CarModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (obj: Car): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(obj);
  };

  readOne = async (id: string): Promise<Car | ServiceError | null> => {
    const regex = /[0-9A-Fa-f]{24}/;

    if (!regex.test(id)) {
      return { error: this.idError };
    }

    const car = await this.model.readOne(id);

    if (!car) return null;

    return car;
  };

  update = async (id: string, obj: Car): Promise<Car | ServiceError | null> => {
    const regex = /[0-9A-Fa-f]{24}/;

    if (!regex.test(id)) {
      return { error: this.idError };
    }

    const targetCar = await this.model.readOne(id);

    if (!targetCar) return null;

    const car = CarSchema.safeParse(obj);

    if (!car.success) {
      return { error: car.error };
    }

    return this.model.update(id, obj);
  };

  delete = async (id: string): Promise<Car | ServiceError | null> => {
    const regex = /[0-9A-Fa-f]{24}/;

    if (!regex.test(id)) {
      return { error: this.idError };
    }

    const carToDelete = await this.model.readOne(id);

    if (!carToDelete) return null;

    return this.model.delete(id);
  };
}

export default CarService;

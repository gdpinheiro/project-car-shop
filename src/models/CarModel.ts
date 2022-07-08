import { Car, carMongooseModel } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

class CarModel extends MongoModel<Car> {
  constructor(model = carMongooseModel) {
    super(model);
  }
}

export default CarModel;

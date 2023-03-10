import { Model as M } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T>) {}

  create = async (obj: T): Promise<T> => this.model.create(obj);

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (_id: string): Promise<T | null> =>
    this.model.findOne({ _id });

  update = async (_id: string, obj: T): Promise<T | null> =>
    this.model.findOneAndUpdate({ _id }, obj, { returnOriginal: false });

  delete = async (_id: string): Promise<T | null> =>
    this.model.findOneAndDelete({ _id });
}

export default MongoModel;

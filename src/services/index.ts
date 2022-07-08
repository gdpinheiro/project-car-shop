import { ZodError } from 'zod';
import MongoModel from '../models/MongoModel';

export interface ServiceError {
  error: ZodError | string;
}

abstract class Service<T> {
  protected idError = 'Id must have 24 hexadecimal characters';

  protected notFoundError = 'Object not found';

  constructor(protected model: MongoModel<T>) {}

  public async create(obj: T): Promise<T | null | ServiceError> {
    return this.model.create(obj);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  public async update(id: string, obj: T): Promise<T | ServiceError | null> {
    return this.model.update(id, { ...obj });
  }

  public async delete(id: string): Promise<T | ServiceError | null> {
    return this.model.delete(id);
  }
}

export default Service;

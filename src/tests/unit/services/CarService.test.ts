import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import CarService from '../../../services/CarService';
import {
  postCars,
  postCarsResponse,
  getCarsResponse,
  getCarsIdResponse,
} from '../../mock/CarMock';

describe('Verifies the Car Service', () => {
  describe('Verifies the POST/cars route', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(postCarsResponse);
    });

    after(() => {
      (Model.create as SinonStub).restore();
    });

    it('Should create an car when given the correct data', async () => {
      const car = new CarService();

      const result = await car.create(postCars);

      expect(result).to.be.deep.equal(postCarsResponse);
    });
  });

  describe('Verifies the GET/cars route', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves(getCarsResponse);
    });

    after(() => {
      (Model.find as SinonStub).restore();
    });

    it('Should return all the cars', async () => {
      const car = new CarService();

      const result = await car.read();

      expect(result).to.be.deep.equal(getCarsResponse);
    });
  });

  describe('Verifies the GET/cars/:id route', () => {
    before(() => {
      sinon.stub(Model, 'findOne').resolves(getCarsIdResponse);
    });

    after(() => {
      (Model.findOne as SinonStub).restore();
    });

    it('Should return the correct car', async () => {
      const car = new CarService();

      const result = await car.readOne('62c9c3e0eda72bdc41ff5730');

      expect(result).to.be.deep.equal(getCarsIdResponse);
    });
  });

  describe('Verifies the DELETE/cars route', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves();

      sinon.stub(Model, 'findOne').resolves(getCarsIdResponse);
    });

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore();

      (Model.findOne as SinonStub).restore();
    });

    it('Should delete the correct car', async () => {
      const car = new CarService();

      const result = await car.delete('62c9c3e0eda72bdc41ff5730');

      expect(result).to.be.undefined;
    });
  });
});

import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';
import Router from './routes/Router';
import App from './app';

const server = new App();

const carController = new CarController();

const carRouter = new Router<Car>();

carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;

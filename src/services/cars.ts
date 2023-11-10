import { CarRequest } from "../models/dto/car";
import { Car } from "../models/entity/car";
import CarsRepository from "../repositories/cars";

class CarsService {
    static async getCars(queryName: string): Promise<Car[]> {
        const listCar = await CarsRepository.getCars(queryName);

        return listCar;
    }

    static async getCar(queryId: string): Promise<Car | undefined> {
      const carRetrieved = await CarsRepository.getCar(Number(queryId))

      return carRetrieved;
    }

    static async createCar(car: CarRequest): Promise<Car> {
        const carToCreate: Car = {
            name: car.name,
            rent_per_day: car.rent_per_day,
            size: car.size,
            profile_picture_url: car.profile_picture_url,
        };
        const createdCar = await CarsRepository.createCar(carToCreate);

        return createdCar;
    }

    static async updateCar(queryId: string, car: CarRequest): Promise<Car> {
        const carToUpdate: Car = {
            name: car.name,
            rent_per_day: car.rent_per_day,
            size: car.size,
            profile_picture_url: car.profile_picture_url,
        };

        const updatedCar = await CarsRepository.updateCar(queryId, carToUpdate);

        return updatedCar;
    }

    static async deleteCar(queryId: string): Promise<Car> {
        const deletedCar = await CarsRepository.deleteCar(queryId);

        return deletedCar;
    }
}

export default CarsService;

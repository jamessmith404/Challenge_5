import { raw } from "objection";
import { Car, CarEntity } from "../models/entity/car";

class CarsRepository {
    static async getCars(queryName: string): Promise<Car[]> {
        const listCars = await CarEntity.query().where(
            raw('lower("name")'),
            "like",
            `%${queryName}%`
        );
        return listCars;
    }

    static async getCar(queryId: number): Promise<Car | undefined> {
        const retrievedCar = await CarEntity.query().findById(queryId);

        return retrievedCar;
    }

    static async createCar(car: Car): Promise<Car> {
        const createdCar = await CarEntity.query().insert({
            name: car.name,
            rent_per_day: car.rent_per_day,
            size: car.size,
            profile_picture_url: car.profile_picture_url,
        });

        return createdCar;
    }

    static async updateCar(queryId: string, car: Car): Promise<Car> {
        const updatedCar = await CarEntity.query().updateAndFetchById(queryId, {
            name: car.name,
            rent_per_day: car.rent_per_day,
            size: car.size,
            profile_picture_url: car.profile_picture_url,
        });

        return updatedCar;
    }

    static async deleteCar(queryId: string): Promise<Car> {
        const deletedCar = await CarEntity.query()
            .deleteById(queryId)
            .returning("*");

        return deletedCar[0];
    }
}

export default CarsRepository;

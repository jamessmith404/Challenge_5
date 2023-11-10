import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { Car } from "../models/entity/car";
import { CarRequest } from "../models/dto/car";
import CarsService from "../services/cars";

class CarsHandler {
    async getCars(req: Request, res: Response) {
        const queryName: string = req.query.name as string;

        const CarList: Car[] = await CarsService.getCars(queryName);

        const response: DefaultResponse = {
            status: "OK",
            message: "Success retrieving data",
            data: {
                cars: CarList,
            },
        };

        res.status(200).send(response);
    }

    async getCar(req: Request, res: Response) {
        const queryId: string = req.params.id;

        const car: Car | undefined = await CarsService.getCar(queryId);

        if (car) {
            const response: DefaultResponse = {
                status: "NOT FOUND",
                message: `Car with id ${queryId} not exist`,
                data: {
                    car: car,
                },
            };

            res.status(404).send(response);
        }

        const response: DefaultResponse = {
            status: "OK",
            message: "Success retrieving data",
            data: {
                car: car,
            },
        };

        res.status(200).send(response);
    }

    async createCar(req: Request, res: Response) {
        const payload: CarRequest = req.body;
        payload.profile_picture_url = (req as any)[
            "uploaded_profile_picture_url"
        ];

        // Payload validation
        if (!payload.name || !payload.rent_per_day || !payload.size) {
            const response: DefaultResponse = {
                status: "BAD_REQUEST",
                message: "Name/rent_per_day/size field cannot be empty",
                data: {
                    created_Car: null,
                },
            };

            res.status(400).send(response);
        }

        const createdCar: Car = await CarsService.createCar(payload);

        const response: DefaultResponse = {
            status: "CREATED",
            message: "Car succesfully created",
            data: {
                created_Car: createdCar,
            },
        };

        res.status(201).send(response);
    }

    async updateCar(req: Request, res: Response) {
        const queryId: string = req.params.id;

        const payload: CarRequest = req.body;
        payload.profile_picture_url = (req as any)[
            "uploaded_profile_picture_url"
        ];

        if (!payload.name || !payload.rent_per_day || !payload.size) {
            const response: DefaultResponse = {
                status: "BAD_REQUEST",
                message: "Name/rent_per_day/size field cannot be empty",
                data: {
                    created_Car: null,
                },
            };

            res.status(400).send(response);
        }

        const updatedCar: Car = await CarsService.updateCar(queryId, payload);

        const response: DefaultResponse = {
            status: "UPDATED",
            message: "Car succesfully updated",
            data: {
                updated_car: updatedCar,
            },
        };

        res.status(200).send(response);
    }

    async deleteCar(req: Request, res: Response) {
        const queryId: string = req.params.id;

        const deletedCar: Car = await CarsService.deleteCar(queryId);

        const response: DefaultResponse = {
            status: "DELETED",
            message: "Car succesfully deleted",
            data: {
                deleted_car: deletedCar,
            },
        };

        res.status(200).send(response);
    }
}

export default CarsHandler;

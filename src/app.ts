import express, { Application } from "express";
import CarsHandler from "./handlers/cars";
import uploadFile from "./utils/uploadFile";

const app: Application = express();
const PORT: number = 8081;

app.use(express.json());

const carsHandler = new CarsHandler();

// Routes
app.get("/api/cars", carsHandler.getCars);
app.get("/api/cars/:id", carsHandler.getCar)
app.post(
    "/api/cars",
    uploadFile.single("profile_picture_url"),
    carsHandler.createCar
);
app.put(
    "/api/cars/:id",
    uploadFile.single("profile_picture_url"),
    carsHandler.updateCar
);
app.delete("/api/cars/:id", carsHandler.deleteCar);

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

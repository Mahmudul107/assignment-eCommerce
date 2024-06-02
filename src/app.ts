import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/orders/order.route";
import notFoundRoute from "./app/middleware/notFoundRoute";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/", ProductRoutes);
app.use("/", OrderRoutes);

// Use the not found middleware
app.use(notFoundRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("E-Commerce is running on..");
});

export default app;

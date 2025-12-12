import express, { Application } from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.routes";
// import sweetRoutes from "./routes/sweet.routes";
// import inventoryRoutes from "./routes/inventory.routes";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
// app.use(cookieParser());

// Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/sweets", sweetRoutes);
// app.use("/api/inventory", inventoryRoutes);

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({message:"Sweet shop api is running."});
});

export default app;

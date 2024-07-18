import { Router } from "express";
import { createReservoir, deleteReservoir, editReservoirStatus, getReservoirStatus } from "../controllers/revervoir.controller.js";
import validateUser from "../middlewares/userAuth.middleware.js";
import { fieldValidator } from "../middlewares/fieldValidator.middlewares.js";

const router = Router();

router.use(validateUser);


router.post("/", fieldValidator(['name', 'location', 'capacity', 'currentLevel']), createReservoir)

router.get("/", getReservoirStatus);

router.put("/:reservoirId", editReservoirStatus)

router.delete("/:reservoirId", deleteReservoir)

export default router;
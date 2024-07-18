import asyncHandler from "express-async-handler";
import { reservoirModel } from "../models/reservoir.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createReservoir = asyncHandler(async (req, res) => {
    const { name, location, capacity, currentLevel } = req.body;
    const check = await reservoirModel.findOne({ name });
    if (check) {
        throw new ApiError(400, "reservoir with that name already exists")
    }
    const newres = await reservoirModel.create({ name, location, capacity, currentLevel })
    if (newres) {
        res.json(new ApiResponse(201, "Reservoir added to system", newres))
    }
})


const getReservoirStatus = asyncHandler(async (req, res) => {
    console.log("wer are here")
    const response = await reservoirModel.find({});

    res.json(new ApiResponse(200, "Data fetched", response))
})

const editReservoirStatus = asyncHandler(async (req, res) => {
    const reservoirId = req.params.reservoirId;
    const { name, location, capacity, currentLevel } = req.body;
    const reservoir = await reservoirModel.findOne({ _id: reservoirId })
    if (!reservoir) {
        throw new ApiError(400, "that reservoir does not exists");
    }
    if (name) reservoir.name = name;
    if (location) reservoir.location = location;
    if (capacity) reservoir.capacity = capacity;
    if (currentLevel) reservoir.currentLevel = currentLevel;

    const saved = await reservoir.save()

    res.json(new ApiResponse(200, "Updated", saved))
})

const deleteReservoir = asyncHandler(async (req, res) => {
    const reservoirId = req.params.reservoirId;
    const del = await reservoirModel.deleteOne(reservoirId);
    res.json(new ApiResponse(200, "deleted success", del))
})

export { createReservoir, getReservoirStatus, editReservoirStatus, deleteReservoir };
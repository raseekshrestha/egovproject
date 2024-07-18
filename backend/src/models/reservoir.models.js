import mongoose, { mongo } from "mongoose"

const ReservoirSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    currentLevel: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
})

const reservoirModel = mongoose.model("Reservoir", ReservoirSchema);

export { reservoirModel }
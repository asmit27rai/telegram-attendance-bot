import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    tgId: {
        type: String,
        required: true,
        unique: true,
    },
    FunElec: {
        type: Number,
    },
    MecMat: {
        type: Number,
    },
    FluidMec: {
        type: Number,
    },
    ManuTech: {
        type: Number,
    },
    MatMech: {
        type: Number,
    },
    TFunElec: {
        type: Number,
    },
    TMecMat: {
        type: Number,
    },
    TFluidMec: {
        type: Number,
    },
    TManuTech: {
        type: Number,
    },
    TMatMech: {
        type: Number,
    },
},{timestamps: true});

export default mongoose.model('Event',eventSchema);
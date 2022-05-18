import {Schema, model} from "mongoose";

const sucursalSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
}, {timestamps: true,
    versionKey: false
});

export default model("Sucursal", sucursalSchema);
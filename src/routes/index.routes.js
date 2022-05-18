import { Router } from "express";

import {
    renderSucursal,
    crearSucursal,
    renderEditarSucursal,
    editarSucursal,
    eliminarSucursal
} from "../controllers/sucursales.controller";

const router = Router();

router.get("/", renderSucursal);

router.post("/sucursales/add", crearSucursal);

router.get("/sucursales/:id/edit", renderEditarSucursal);

router.post("/sucursales/:id/edit", editarSucursal);

router.get("/sucursales/:id/delete", eliminarSucursal);

export default router;
import Sucursal from "../models/Sucursal";

export const renderSucursal = async (req, res) => {
    const sucursales = await Sucursal.find().lean();
    res.render("index", { sucursales: sucursales });
}

export const crearSucursal = async (req, res) => {
    try
    {
        const sucursal = Sucursal(req.body);
        await sucursal.save();
        res.redirect("/");
    }
    catch (error)
    {
        console.log(error);
    }
}

export const renderEditarSucursal = async (req, res) => {
    try
    {
        const sucursal = await Sucursal.findById(req.params.id).lean();
        res.render("edit", { sucursal });
    }
    catch (error)
    {
        console.log(error.message);
    }
}

export const editarSucursal = async (req, res) => {
    const {id} = req.params;
    await Sucursal.findByIdAndUpdate(id, req.body);
    res.redirect("/");
}

export const eliminarSucursal = async (req, res) => {
    const { id } = req.params;
    await Sucursal.findByIdAndDelete(id);
    res.redirect("/");
}
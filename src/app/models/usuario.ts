

export interface Usuario {
    _id?: any,
    usuario: string,
    password: string,
    email: string,
    rol: {_id: string, name: string}, 
    cuil: string,
    nombre: string,
    fechaNacimiento: Date,
    direccion: string, 
    telefono: string
}


export interface Usuario {
    _id?: string,
    usuario: string,
    password: string,
    email: string,
    rol: string[], 
    cuil: string,
    nombre: string,
    fechaNacimiento: Date,
    direccion: string, 
    telefono: string
}
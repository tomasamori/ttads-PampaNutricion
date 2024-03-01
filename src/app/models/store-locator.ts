export interface Storelocator {
    _id?: any,
    nombre: String,
    direccion: String, 
    localidad:{_id: string, codPostal: String, nombre: String},
    foto: String
}
export interface Storelocator {
    _id?: any,
    nombre: String,
    direccion: String,
    foto: String,
    localidad:{_id: string, codPostal: String, nombre: String}
}
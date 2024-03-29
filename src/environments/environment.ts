// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_PRODUCTO: 'http://localhost:3000/api/v1/producto',
  URL_TIPOMASCOTA: 'http://localhost:3000/api/v1/tipoMascota',
  URL_SUCURSAL:'http://localhost:3000/api/v1/sucursal',
  URL_AUTH: 'http://localhost:3000/api/v1/auth',
  URL_PEDIDO: 'http://localhost:3000/api/v1/pedido',
  URL_USUARIO:'http://localhost:3000/api/v1/usuario',
  URL_LOCALIDAD:'http://localhost:3000/api/v1/localidad',
  URL_ROL:'http://localhost:3000/api/v1/rol',
  URL_PROVEEDOR:'http://localhost:3000/api/v1/proveedor',
  URL_CLOUDINARY:'https://api.cloudinary.com/v1_1/drwkty7lb/image/',
  API_key: '892765795244691',
  API_secret: 'CLOUDINARY_URL=cloudinary://892765795244691:-0URBGwrcFUd2dfuKlylTf1cQ1w@drwkty7lb',
  cloud_name:'drwkty7lb'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

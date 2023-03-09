import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultProducts = [];

    for (const p of value) {
      if (p.marca.concat(" "+p.nombre).toLowerCase().indexOf(arg) > -1 || p.tipoMascota.nombre.concat(" "+p.tipoMascota.edad+" "+p.tipoMascota.tamanoRaza).toLowerCase().indexOf(arg) > -1){
        resultProducts.push(p);
      }
    }

    return resultProducts;
  }

}

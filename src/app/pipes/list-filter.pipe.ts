import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (!value || !arg) {
      return value;
    }

    const searchTerms: string[] = arg.toLowerCase().split(" ");

    return value.filter((p: any) => 
      this.productContainsAllSearchTerms(p, searchTerms)
    );
  }

  private productContainsAllSearchTerms(product: any, searchTerms: string[]): boolean {
    const searchableFields = [
      product.marca,
      product.nombre,
      product.tipoMascota.nombre,
      product.tipoMascota.edad,
      product.tipoMascota.tamanoRaza
    ];

    for (const term of searchTerms) {
      let termFound = false;
      for (const field of searchableFields) {
        if (field && field.toString().toLowerCase().includes(term)) {
          termFound = true;
          break;
        }
      }
      if (!termFound) {
        return false;
      }
    }

    return true;
  }
}

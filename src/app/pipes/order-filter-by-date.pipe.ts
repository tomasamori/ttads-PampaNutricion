import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderFilterByDate'
})
export class OrderFilterByDatePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (!value || !arg) {
      return value;
    }

    const searchTerms: string[] = arg.toLowerCase().split(" ");

    return value.filter((o: any) => 
      this.orderContainsAllSearchTerms(o, searchTerms)
    );
  }

  private orderContainsAllSearchTerms(order: any, searchTerms: string[]): boolean {
    const searchTermsWithFormattedDates = searchTerms.map(term => this.formatDate(term)); // Convertir los términos de búsqueda al formato adecuado

    const searchableFields: string[] = [order.createdAt];

    for (const term of searchTermsWithFormattedDates) {
      let termFound = false;
      for (const field of searchableFields) {
        if (field.includes(term)) { // Comparación directa de cadenas
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

  private formatDate(dateString: string): string {
    if (!dateString) {
      return ''; // Devolver una cadena vacía si dateString es undefined o vacía
    }

    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return ''; // Devolver una cadena vacía si no hay tres partes después de dividir la cadena
    }

    const [year, month, day] = parts;
    if (isNaN(parseInt(year)) || isNaN(parseInt(month)) || isNaN(parseInt(day))) {
      return ''; // Devolver una cadena vacía si alguna parte no es un número válido
    }
    
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

}

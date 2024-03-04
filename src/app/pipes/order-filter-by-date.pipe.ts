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
    const searchableFields = [ 
      order.createdAt,
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

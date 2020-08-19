import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  filteredByTitleItems = [];

  transform(items: any[], filter: any, priceRange): any[] {
    if (!items) { return []; }

    if (!filter && !priceRange.length) { return items; }

    return this.searchItems(items, filter, priceRange);
  }

  private searchItems(items: any[], filter, priceRange): any[] {
    this.filteredByTitleItems = filter ? items.filter(el => el.title.toLowerCase().includes(filter.toLowerCase())) : items;
    const allfilteredItems =
     priceRange.length ? this.filteredByTitleItems.filter(el =>  priceRange.includes(el.priceRange)) : this.filteredByTitleItems;
    return allfilteredItems.length ? allfilteredItems : [];
  }
}

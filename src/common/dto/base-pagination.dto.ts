export class BasePaginationDTO<T> {

  items: T[]
  meta:  IPaginationMeta

  constructor(items: T[], meta:  IPaginationMeta) {
    this.setItems(items);
    this.setMeta(meta);
  }

  setItems(items: T[]){
    this.items = items
  }


  setMeta(meta:  IPaginationMeta){
    this.meta = meta;
  }

}


export class IPaginationMeta {
  totalItems?: number
  limit: number;
  totalPages?: number;
  currentPage: number;

  constructor(limit: number, currentPage: number, totalItems: number) {
    this.limit = limit;
    this.currentPage = currentPage;
    this.totalItems = totalItems;
    this.totalPages = this.calculateTotalPages(limit, totalItems);
  }


  calculateTotalPages(limit: number, totalItems: number): number {
    if (limit <= 0 || totalItems <= 0) {
      return 0;
    }

    return Math.ceil(totalItems / limit);
  }

}
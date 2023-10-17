import { SortType } from "../types/filter.types";

export abstract class BaseFilterDTO {

  protected readonly _limit: number
  protected readonly _page: number
  protected readonly _sort: string;
  protected readonly _order: string;

  protected constructor(limit: string, page: string, sort: string, order: string) {
      this._limit = limit ? Number(limit) : 10;
      this._page = page ? Number(page) : 1;
      this._sort = sort;
      this._order = order;
  }

  get sort(){
    return this._sort
  }

  get order(){
    return this._order
  }

  get limit() {
    return this._limit
  }

  get page(){
    return this._page
  }

  public getOrder(): SortType {
    return this.order === "DESC" ? "DESC" : "ASC";
  }

  public getSort(): string {
    const alias = this.getPrincipalAlias();
    return this.sort ?  `${alias}.${this.sort}` : `${alias}.${this.getDefaultSort()}`;
  }

  public defaultWhere(){
    return ` ${this.getPrincipalAlias()}.disabledDate is null `;
  }

  abstract getPrincipalAlias(): string

  abstract getDefaultSort(): string

  abstract getSelections(): string[]

  abstract getWhere(): string

}
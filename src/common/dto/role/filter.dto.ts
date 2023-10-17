import { ParamsDTO } from "./params.dto";
import { BaseFilterDTO } from "../base-filter.dto";

export class RoleFilterDTO extends BaseFilterDTO {

  static readonly principalAlias = "u";
  protected readonly _authority: string;

  constructor(filter: ParamsDTO) {
    super(filter.limit, filter.page, filter.sort, filter.order);
    this._authority = filter?.authority;

    this.getPrincipalAlias = this.getPrincipalAlias.bind(this);
    this.getWhere = this.getWhere.bind(this);
    this.getSelections = this.getSelections.bind(this);
  }

  get authority(){
    return this._authority
  }

  public getPrincipalAlias(){
    return RoleFilterDTO.principalAlias;
  }

  public getWhere(): string {
    const alias = this.getPrincipalAlias();

    let where = this.defaultWhere();

    if(this.authority){
      where += ` and upper(${alias}.authority) like upper('%${this.authority}%') `;
    }

    return where;
  }

  public getSelections(){
    const alias = this.getPrincipalAlias();

    return [
      `${alias}.*`
    ];
  }

  public getDefaultSort() {
    return "authority"
  }

}

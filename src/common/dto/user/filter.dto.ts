import { ParamsDTO } from "./params.dto";
import { BaseFilterDTO } from "../base-filter.dto";

export class UserFilterDTO extends BaseFilterDTO {

  static readonly principalAlias = "u";
  protected readonly _username: string;
  protected readonly _email: string;

  constructor(filter: ParamsDTO) {
    super(filter.limit, filter.page, filter.sort, filter.order);
    this._username = filter?.username;
    this._email = filter?.email;

    this.getPrincipalAlias = this.getPrincipalAlias.bind(this);
    this.getWhere = this.getWhere.bind(this);
    this.getSelections = this.getSelections.bind(this);
  }

  get username(){
    return this._username
  }

  get email(){
    return this._email
  }

  public getPrincipalAlias(){
    return UserFilterDTO.principalAlias;
  }

  public getWhere(): string {
    const alias = this.getPrincipalAlias();

    let where = this.defaultWhere();

    if(this.username){
      where += ` and upper(${alias}.username) like upper('%${this.username}%') `;
    }

    if(this.email){
      where += ` and upper(${alias}.email) like upper('%${this.email}%') `;
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
    return "username"
  }

}

import { Repository, SelectQueryBuilder } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { BasePaginationDTO, IPaginationMeta } from "../../common/dto/base-pagination.dto";

export abstract class BaseService<T, B> {

  protected constructor(
    protected repository: Repository<T>
  ) {
  }

  abstract setJoins(query: SelectQueryBuilder<T>, alias: string): SelectQueryBuilder<T>

  abstract entityToDTO(entity: T): B

  getQueryBuilder(alias?: string){
    return this.repository.createQueryBuilder(alias)
  }

  getQueryBuilderFindAll(filter: any, pageNumer: number = 1, limitNumer: number = 10){
    return this.getQueryBuilder(filter?.getPrincipalAlias())
      .where(filter?.getWhere())
      .orderBy(filter.getSort(), filter.getOrder())
      .skip(pageNumer)
      .take(limitNumer)
  }

  getQueryBuilderFindForAttribute(
    alias: string = 'c',
    atribute: string,
    value: string,
  ): SelectQueryBuilder<T>{
    const queryBuilder = this.getQueryBuilder(alias);
    const sqlWhere = `upper(${alias}.${atribute}) = upper('${value}') `;
    return queryBuilder.where(sqlWhere);
  }

  async findById(id: string): Promise<T> {
    const alias = 'u'
    const queryBuilder = this.getQueryBuilderFindForAttribute(alias, 'id', id)
    return await this.setJoins(queryBuilder, alias).getOne();
  }

  async findByIdOrTrhow(id: string, alias: string): Promise<T | null> {
    if(!id)
      throw new NotFoundException(`${alias}.error.notFound.label`);

    const entity = await this.findById(id);

    if(!entity)
      throw new NotFoundException(`${alias}.error.notFound.label`);

    return entity;
  }

  calculePageNumber(currentPage: number, limitNumer: number){
    return ( currentPage * limitNumer ) - limitNumer
  }

  async findAll(filter: any): Promise<BasePaginationDTO<B>> {
    const { limit, page } = filter;
    const pageNumber = this.calculePageNumber(page, limit);

    const queryBuild = this.setJoins(this.getQueryBuilderFindAll(filter, pageNumber, limit), filter.getPrincipalAlias());

    const [items, count] = await queryBuild.getManyAndCount();

    const list: B[] = items.map(this.entityToDTO);

    return new BasePaginationDTO<B>(list, new IPaginationMeta(limit, page, count));
  }

  async findByIdAsDTOOrTrhow(id: string, alias: string): Promise<B> {
    return this.entityToDTO(await this.findByIdOrTrhow(id, alias));
  }

  async findByIdAsDTO(id: string): Promise<B> {
    return this.entityToDTO(await this.findById(id));
  }

  async getHashValue(value: string, salt: number = 10){
    return hash(value, salt);
  }

  async verifyPassword(hashed: string, password: string): Promise<boolean> {
    return await compare(password, hashed)
  }

}
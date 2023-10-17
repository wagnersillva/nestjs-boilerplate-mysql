import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { getModulesPermissions } from "./common/general/permissions-list";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./app/entities/permission.entity";
import { Repository } from "typeorm";

@Injectable()
export class AppService implements OnApplicationBootstrap {

  permissionRepository: Repository<Permission>

  constructor(
    @InjectRepository(Permission)
    permissionRepository: Repository<Permission>
  ){
    this.permissionRepository = permissionRepository;
  }

  async createPermissions(): Promise<void> {
    const permissions = getModulesPermissions();
    
    for(const name of permissions ){
      const where = { name };
      const exists = await this.permissionRepository.exist({ where });
      
      if(!exists)
        await this.permissionRepository.save({ name });
    }
  }

  async onApplicationBootstrap(){
   await this.createPermissions();
  }

  getHello(): string {
    return 'Hello World!';
  }
}

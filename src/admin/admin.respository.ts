import {EntityRepository,  Repository } from "typeorm";
import { AdminEntity } from "./admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { GetAdminsDto } from "./dto/get-admins-filter.dto";


@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {
    
    async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
        const {role} = createAdminDto;

        const adminEntity = this.create({
            role,
        })

        await this.save(adminEntity);
        return adminEntity;
    }

    async getAdmins(filterDto: GetAdminsDto): Promise<AdminEntity[]> {
        const { role, search } = filterDto;
    
        const query = this.createQueryBuilder('admin');

        if (role) {
            query.andWhere('admin.role = :role', { role });
          }
        if (search) {
          query.andWhere(
            'LOWER(admin.role) LIKE LOWER(:search)',
            { search: `%${search}%` },
          );
        }
    
        const admins = await query.getMany();
        return admins;
      }

}
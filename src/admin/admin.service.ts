import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { AdminRepository } from "./admin.respository";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { GetAdminsDto } from "./dto/get-admins-filter.dto";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository, 
    ) {}

    createAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
        return this.adminRepository.createAdmin(createAdminDto);
    }

    getAdmins(filterDto: GetAdminsDto): Promise<AdminEntity[]> {
        return this.adminRepository.getAdmins(filterDto);
    }

    async getAdminById(id:number): Promise<AdminEntity> {
        const found =  await this.adminRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Department with ID "${id}"" not found`)
        }
        return found;
    }
    async deleteAdminById(id: number): Promise<void> {
        const result = await this.adminRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Admin with "${id}" not found `);
        }
    }

    async updateAdmin(id: number, role: string): Promise<AdminEntity> {
        const admin = await this.getAdminById(id);
        admin.role = role;
        await this.adminRepository.save(admin);
        return admin;
    }

}
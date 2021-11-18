import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./dept.entity";
import { DepartmentRepository } from "./dept.repository";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { GetAllEmployeesByDeptIdFilterDto } from "./dto/get-departments-filter.dto";

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(DepartmentRepository)
        private departmentRepository: DepartmentRepository, 
    ) {}

    createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        return this.departmentRepository.createDepartment(createDepartmentDto);
    }

    async getDepartmentById(dept_id:number): Promise<Department> {
        const found =  await this.departmentRepository.findOne(dept_id);

        if(!found) {
            throw new NotFoundException(`Department with ID "${dept_id}"" not found`)
        }
        return found;
    }

    getAllEmployeesByDeptId(filterDto: GetAllEmployeesByDeptIdFilterDto): Promise<Department[]> {
        return this.departmentRepository.getAllEmployeesByDeptId(filterDto);
    }

    async deleteDepartmentById(dept_id: number): Promise<void> {
        const result = await this.departmentRepository.delete(dept_id);

        if (result.affected === 0) {
            throw new NotFoundException(`Department with "${dept_id}" not found `);
        }
    }

    async updateDeptNameOrDesc(dept_id: number, dept_name: string, description: string): Promise<Department> {
        const department = await this.getDepartmentById(dept_id);
        department.dept_name = dept_name;
        department.description = description;
        await this.departmentRepository.save(department);
        return department;
    }

}
import { AdminEntity } from "src/admin/admin.entity";
import { Department } from "src/dept/dept.entity";
import { DepartmentRepository } from "src/dept/dept.repository";
import { AppModule } from "../app.module"
import { EntityRepository, Repository } from "typeorm";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { Employee } from "./employee.entitiy";
import { GetEmployeesFilterDto } from "./dto/get-employees-filter.dto";
import { NotFoundException } from "@nestjs/common";


@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

    async createEmployee(
        createEmployeeDto: CreateEmployeeDto, department: Department, adminEntity: AdminEntity): Promise<Employee> {
        const {name, salary} = createEmployeeDto;

        const employee = this.create({
            name,
            salary,
            department,
            adminEntity
        })

        await this.save(employee);
        return employee;
    }
    async getEmployees(filterDto: GetEmployeesFilterDto): Promise<Employee[]> {
        const { isActive, search } = filterDto;
    
        const query = this.createQueryBuilder('employee');        

        if (isActive) {
            query.andWhere('employee.isActive = :isActive', { isActive });
          }
        if (search) {
          query.andWhere(
            'LOWER(employee.name) LIKE LOWER(:search)',
            { search: `%${search}%` },
          ).getRawMany();
        }
    
        const employees = await query.getMany();
        return employees;
      }


}
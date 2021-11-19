import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/admin/admin.entity";
import { Department } from "src/dept/dept.entity";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { GetEmployeesFilterDto } from "./dto/get-employees-filter.dto";
import { Employee } from "./employee.entitiy";
import { EmployeeRepository } from "./employee.repository";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeRepository)
        private employeeRepository: EmployeeRepository, 
    ) {}


    createEmployee(createEmployeeDto: CreateEmployeeDto, department: Department, adminEntity: AdminEntity): Promise<Employee> {
        return this.employeeRepository.createEmployee(createEmployeeDto, department, adminEntity);
    }

    async getEmployeeById(id:number): Promise<Employee> {
        const found =  await this.employeeRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Employee with ID "${id}"" not found`)
        }
        return found;
    }

    async getEmployeeByName(name:string): Promise<Employee | undefined> {
        const found =  await this.employeeRepository.findEmployee(name);
        if(!found) {
            throw new NotFoundException(`Employee with name "${name}"" not found`)
        }
        return found;
    }

    getEmployees(filterDto: GetEmployeesFilterDto): Promise<Employee[]> {
        return this.employeeRepository.getEmployees(filterDto);
    }

    async deleteEmployeeById(id: number): Promise<void> {
        const result = await this.employeeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with "${id}" not found `);
        }
    }

    async updateEmployeeName(id: number, name: string): Promise<Employee> {
        const employee = await this.getEmployeeById(id);
        employee.name = name;
        await this.employeeRepository.save(employee);
        return employee;
    }
}
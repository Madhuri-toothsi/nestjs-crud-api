import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AdminEntity } from 'src/admin/admin.entity';
import { Department } from 'src/dept/dept.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entitiy';
import { EmployeeService } from './employee.service';
import {getConnectionManager, createConnections} from "typeorm";
import { GetEmployeesFilterDto } from './dto/get-employees-filter.dto';
import { UpdateEmployeeNameDto } from './dto/update-employee-data.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

const connection = createConnections([{
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'test',
    database: 'nest',
    entities: [
      Employee,
      Department,
      AdminEntity,
    ],
    synchronize: true,
  }]);
const defaultConnection = getConnectionManager().get('default');

export class getDefaultConnection{
  async conn(){
    return defaultConnection
  }
};

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<Employee> {
    const {department_id, adminEntity_id, ...rest} = createEmployeeDto
    
    const department = await defaultConnection
        .getRepository(Department)
        .createQueryBuilder("department")
        .where("department.dept_id = :id", { id: department_id })
        .getOne();
    const adminEntity = await defaultConnection
        .getRepository(AdminEntity)
        .createQueryBuilder("adminEntity")
        .where("adminEntity.id = :id", { id: adminEntity_id })
        .getOne();
    console.log(department, adminEntity)
    if (!department) {
      throw new NotFoundException("Department not found");
    }
    return this.employeeService.createEmployee(createEmployeeDto, department, adminEntity);
  }

  @Get()
  getEmployees(@Query() filterDto: GetEmployeesFilterDto): Promise<Employee[]> {
      return this.employeeService.getEmployees(filterDto);
  }


  @Get('/:id')
  getEmployeeById(@Param('id') id: number): Promise<Employee> {
      return this.employeeService.getEmployeeById(id);
  }

  @Get('/name/:name/')
  getEmployeeByName(@Param('name') name: string): Promise<Employee> {
    return this.employeeService.getEmployeeByName(name);
  }

  @Delete('/:id')
  deleteEmployeeById(@Param('id') id: number): Promise<void>{
      return this.employeeService.deleteEmployeeById(id);
  }

  @Patch('/:id')
  updateEmployeeName(
      @Param('id') id: number,
      @Body() updateEmployeeNameDto: UpdateEmployeeNameDto,
  ): Promise<Employee> {
      const {name} = updateEmployeeNameDto;
      return this.employeeService.updateEmployeeName(id, name);
  }

}
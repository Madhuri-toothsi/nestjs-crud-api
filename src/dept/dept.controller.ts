import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { Department } from './dept.entity';
import { DepartmentService } from './dept.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetAllEmployeesByDeptIdFilterDto } from './dto/get-departments-filter.dto';
import { UpdateDeptNameOrDescDto } from './dto/update-department-data';


@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Get()
  getEmployees(@Query() filterDto: GetAllEmployeesByDeptIdFilterDto): Promise<Department[]> {
      return this.departmentService.getAllEmployeesByDeptId(filterDto);
  }

  @Delete('/:dept_id')
  deleteDepartmentById(@Param('dept_id') dept_id: number): Promise<void>{
      return this.departmentService.deleteDepartmentById(dept_id);
  }

  @Patch('/:dept_id')
  updateDeptNameOrDesc(
      @Param('dept_id') dept_id: number,
      @Body() updateDeptNameOrDescDto: UpdateDeptNameOrDescDto,
  ): Promise<Department> {
      const {dept_name, description} = updateDeptNameOrDescDto;
      return this.departmentService.updateDeptNameOrDesc(dept_id, dept_name, description);
  }

}
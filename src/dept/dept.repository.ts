import { Employee } from "src/employee/employee.entitiy";
import { EntityRepository, Repository } from "typeorm";
import { Department } from "./dept.entity";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { GetAllEmployeesByDeptIdFilterDto } from "./dto/get-departments-filter.dto";


@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {
    
    async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const {dept_name, description} = createDepartmentDto;
        
        const department = this.create({
            dept_name,
            description,
        })

        await this.save(department);
        return department;
    }

    async getAllEmployeesByDeptId(filterDto: GetAllEmployeesByDeptIdFilterDto): Promise<Department[]> {
        const { dept_id, dept_name, search } = filterDto;
    
        const query = this.createQueryBuilder('department');

        if (dept_id) {
            query.andWhere('department.dept_id = :dept_id', { dept_id });
          }
        if (dept_name) {
            query.andWhere('department.dept_name = :dept_name', { dept_name });
          }
        if (search) {
          query.andWhere(
            'LOWER(department.description) LIKE LOWER(:search)',
            { search: `%${search}%` },
          );
        }
    
        const departments = await query.getMany();
        return departments;
      }
}
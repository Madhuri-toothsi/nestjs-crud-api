import { Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';

@Injectable()
export class AuthService {
    constructor(private employeesService: EmployeeService) {}

    async validateEmployee(name: string, password: string): Promise<any> {
        const user = await this.employeesService.getEmployeeByName(name);
        console.log(user)
        console.log("coming from AuthService")

        if (user && user.password === password) {
            const {password, ...rest} = user;
            return user;
        }

        return null
    }
}

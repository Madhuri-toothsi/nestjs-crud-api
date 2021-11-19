import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { EmployeeService } from 'src/employee/employee.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeRepository]), EmployeeModule, PassportModule.register({session:true})],
    providers: [AuthService, EmployeeService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}

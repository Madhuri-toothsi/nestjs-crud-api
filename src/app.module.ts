import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './dept/dept.module';
import { AdminModule } from './admin/admin.module';
import { Employee } from './employee/employee.entitiy';
import { Department } from './dept/dept.entity';
import { AdminEntity } from './admin/admin.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { EmployeeService } from './employee/employee.service';
import { EmployeeRepository } from './employee/employee.repository';

@Module({
  imports: [
    EmployeeModule,
    DepartmentModule,
    AdminModule,
    TypeOrmModule.forFeature([EmployeeRepository]),
    TypeOrmModule.forRoot({
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
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, EmployeeService],
})
export class AppModule {}

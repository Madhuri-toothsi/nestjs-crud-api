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

@Module({
  imports: [EmployeeModule,
    DepartmentModule,
    AdminModule,
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
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

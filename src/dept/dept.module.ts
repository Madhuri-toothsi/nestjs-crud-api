import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './dept.controller';
import { DepartmentRepository } from './dept.repository';
import { DepartmentService } from './dept.service';


@Module({
  imports: [TypeOrmModule.forFeature([DepartmentRepository])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
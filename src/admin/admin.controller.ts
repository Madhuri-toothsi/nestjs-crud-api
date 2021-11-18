import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { GetAdminsDto } from './dto/get-admins-filter.dto';
import { UpdateAdminDto } from './dto/update-admin-data.dto';


@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  createAdmin(
    @Body() createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  getAdmins(@Query() filterDto: GetAdminsDto): Promise<AdminEntity[]> {
      return this.adminService.getAdmins(filterDto);
  }

  @Delete('/:id')
  deleteAdminById(@Param('id') id: number): Promise<void>{
      return this.adminService.deleteAdminById(id);
  }

  @Patch('/:id')
  updateAdmin(
      @Param('id') id: number,
      @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<AdminEntity> {
      const {role} = updateAdminDto;
      return this.adminService.updateAdmin(id, role);
  }

}
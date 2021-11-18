import { IsBoolean, IsOptional, IsString } from "class-validator";

export class GetAllEmployeesByDeptIdFilterDto {

    @IsOptional()
    @IsString()
    dept_id?: number;
    
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    dept_name?: string;
}
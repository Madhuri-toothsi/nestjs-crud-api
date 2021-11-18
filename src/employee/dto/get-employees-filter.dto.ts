import { IsBoolean, IsOptional, IsString } from "class-validator";

export class GetEmployeesFilterDto {

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
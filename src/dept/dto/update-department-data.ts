import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDeptNameOrDescDto {
    @IsOptional()
    @IsString()
    dept_name?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
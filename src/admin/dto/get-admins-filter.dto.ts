import {IsOptional, IsString } from "class-validator";

export class GetAdminsDto {

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    search?: string;
    
}
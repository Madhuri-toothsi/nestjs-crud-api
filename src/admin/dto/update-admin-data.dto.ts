import { IsNotEmpty, IsString } from "class-validator";

export class UpdateAdminDto {
    @IsNotEmpty()
    @IsString()
    role?: string;

}
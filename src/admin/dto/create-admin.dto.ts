import { IsNotEmpty } from "class-validator";

export class CreateAdminDto {

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    emp_Id: number;


}
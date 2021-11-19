import { IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    department_id: number;

    @IsNotEmpty()
    adminEntity_id: number;

    @IsNotEmpty()
    salary: number;

    @IsNotEmpty()
    password: string;
}
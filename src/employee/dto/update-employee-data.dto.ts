import { IsNotEmpty } from "class-validator";

export class UpdateEmployeeNameDto {
    @IsNotEmpty()
    name: string;
}
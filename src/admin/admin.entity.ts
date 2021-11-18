import { type } from "os";
import { Employee } from "src/employee/employee.entitiy";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type=> Employee, employee => employee.adminEntity)
    employee: Employee;

    @Column({default:null})
    role: string;


}
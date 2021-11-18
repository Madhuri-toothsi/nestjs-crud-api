import { type } from "os";
import { Employee } from "src/employee/employee.entitiy";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    dept_id: number;

    @Column()
    dept_name: string;

    @Column()
    description: string;

    @OneToMany(type => Employee, (employee) => employee.department)
    employees: Employee[];

}
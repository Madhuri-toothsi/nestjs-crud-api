import { type } from "os";
import { AdminEntity } from "src/admin/admin.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "../dept/dept.entity";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    emp_id: number;

    @Column()
    name: string;

    @ManyToOne(type => Department, (department)=> department.employees, {eager:true})
    @JoinColumn()
    department: Department;


    @ManyToOne(type => AdminEntity, adminEntity => adminEntity.employee, {eager:true})
    @JoinColumn()
    adminEntity: AdminEntity;

    @Column({
        type: 'boolean',
        default: 1,
    })
    isActive: boolean;

    @Column()
    salary: number;

    @Column()
    password: string;
}
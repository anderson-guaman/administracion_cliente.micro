import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    codigoUnicoUsuario: number;

    @Column({ type: "varchar",})
    nombre: string;
    
    @Column({ type: "varchar",})
    apellido: string;

    @Column({ type: "varchar",})
    cedula: string;

    @Column({ type: "varchar", unique: true })
    usuario: string;

    @Column({ type: "varchar"})
    constrasena: string;
}

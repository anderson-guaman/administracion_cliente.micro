import { IsEnum } from "class-validator";
import { TipoIdentificacion } from "src/utilitarios/enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Cliente {
    
    @PrimaryGeneratedColumn()
    codigoUnicoCliente: number;

    @Column({type:'varchar',length:100})
    primerNombreCliente: string;

    @Column({type:'varchar',length:100})
    segundoNombreCliente: string;

    @Column({type:'varchar',length:100})
    primerApellidoCliente: string;

    @Column({type:'varchar',length:100})
    segundoApellidoCliente: string;

    @Column({type: 'enum', enum: TipoIdentificacion })
    @IsEnum(TipoIdentificacion)
    tipoIdentificacionCliente: string;

    @Column({type:'varchar',length:14,unique:true})
    numeroCedulaCliente: string;

    @Column({type:'varchar',length:100})
    direccionCliente: string;

    @Column({type:'varchar',array:true,length:10})
    telefonoCliente: string[];

    @Column({type:'varchar'})
    usuarioCreacion: string;

    @Column({type:'varchar',nullable:true})
    usuarioEliminacion: string;

    @Column({type:'varchar',nullable:true})
    usuarioModificacion: string;

    @Column({type:'date'})
    fechaCreacion: Date;

    @Column({type:'date',nullable:true})
    fechaEliminacion: Date;

    @Column({type:'date',nullable:true})
    fechaModificacion: Date;

    // metodo para obtener el nombre completo
    get fullName(): string {
        const parts = [
          this.primerNombreCliente,
          this.segundoNombreCliente,
          this.primerApellidoCliente,
          this.segundoApellidoCliente,
        ].filter(part => part && part.trim() !== '');
        return parts.join(' ').toUpperCase();
    }
}

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNumberString, IsOptional, IsString, Matches, MaxLength } from "class-validator";
import { TipoIdentificacion } from "src/utilitarios/enum";


export class CreateClienteDto {

    @ApiProperty()
    @IsString()
    primerNombreCliente: string;

    @ApiProperty()
    @IsString()
    segundoNombreCliente: string;
    
    @ApiProperty()
    @IsString()
    primerApellidoCliente: string;
    
    @ApiProperty()
    @IsString()
    segundoApellidoCliente: string;
    
    @ApiProperty()
    @IsEnum(TipoIdentificacion)
    tipoIdentificacionCliente: string;

    @ApiProperty()
    @IsString({ message: 'El número de cédula debe ser una cadena de texto' })
    @Matches(/^\d{1,14}$/, { message: 'El número de cédula debe contener solo dígitos y tener un máximo de 14 caracteres' })
    numeroCedulaCliente: string;
    
    @ApiProperty()
    @IsString()
    direccionCliente: string;
    
    @ApiProperty()
    @IsArray()
    telefonoCliente: string[];

    @ApiProperty()
    @IsString()
    // @IsOptional()
    usuario?: string
}

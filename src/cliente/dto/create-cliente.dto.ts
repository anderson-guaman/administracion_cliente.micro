import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
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
    @IsString()
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

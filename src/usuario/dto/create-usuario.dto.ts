import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @ApiProperty()
    @IsString()
    nombre: string;

    @ApiProperty()
    @IsString()
    apellido: string;

    @ApiProperty()
    @IsString()
    cedula: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    usuario: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    constrasena: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {

    @ApiProperty()
    @IsString()
    usuario?: string
}

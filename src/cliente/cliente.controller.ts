import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClienteService } from './cliente.service';
import { CreateClienteDto,UpdateClienteDto } from './dto';


@ApiTags('ClienteController')
@Controller('clienteController')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }
  @Get('tipoDocumento')
  tipoDocumento() {
    return this.clienteService.tipoDocumentos();
  }

  @Get(':filtro')
  findOne(@Param('filtro') filtro: string) {
    return this.clienteService.find(filtro);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }



}

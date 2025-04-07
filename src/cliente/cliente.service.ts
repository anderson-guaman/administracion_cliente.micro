import { Type } from './../../node_modules/typeorm/node_modules/path-scurry/dist/esm/index.d';
import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ManejoError } from 'src/utilitarios/manejo-errores';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ClienteService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly dataSource: DataSource,
  ){};

  async create(createClienteDto: CreateClienteDto) {
    try {
      const { usuario, ...clienteDto } = createClienteDto;
      const cliente = this.clienteRepository.create({
        ...clienteDto,
        usuarioCreacion: usuario,
        fechaCreacion: new Date(),
      });
      await this.clienteRepository.save(cliente);
      return cliente;
    } catch (error) {
      console.log(error)
      ManejoError.handleDBErrors(error)
    }
  }

  findAll() {
    try {
      return this.clienteRepository.find()
    } catch (error) {
      console.log(error)
      ManejoError.handleDBErrors(error)
    }
  }

  async find(filtro: string) {
    try {
      let clientes: Cliente[]=[];
      if ( !isNaN(+filtro) ){
        const cliente = await this.clienteRepository.findOne({
          where: { codigoUnicoCliente: +filtro }
        }) ?? null;
        if (cliente)
          clientes.push(cliente);
      }else{
        clientes = await this.clienteRepository
        .createQueryBuilder('client')
        .where(
          `CONCAT(
            COALESCE(client.primerNombreCliente, ''), ' ',
            COALESCE(client.segundoNombreCliente, ''), ' ',
            COALESCE(client.primerApellidoCliente, ''), ' ',
            COALESCE(client.segundoApellidoCliente, '')
          ) ILIKE :searchTerm`,
          { searchTerm: `%${filtro}%` },
        )
        .getMany();
      }
      return clientes;
    } catch (error) {
      console.log(error)
      ManejoError.handleDBErrors(error)
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const queryRunner = await this.dataSource.createQueryRunner();
    const { usuario, ...rest } = updateClienteDto; 
    try {
      const cliente = await this.clienteRepository.preload( {codigoUnicoCliente:id, usuarioModificacion: usuario, fechaModificacion: new Date() ,...rest} );
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.manager.save( cliente );
      await queryRunner.commitTransaction();
      return this.find(id.toString())
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.log(error);
      ManejoError.handleDBErrors(error)
    }
  }

  async remove(id: number) {
    try {
      const cliente = await this.clienteRepository.findOne({ where:{codigoUnicoCliente:id} });
      if( cliente )
        await this.clienteRepository.remove(cliente);
      return cliente;
    } catch (error) {
      console.log(error);
      ManejoError.handleDBErrors(error)
    }
  }

}

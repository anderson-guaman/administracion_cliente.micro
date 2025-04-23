import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Like, Repository } from 'typeorm';
import { ManejoError } from 'src/utilitarios/manejo-errores';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepositorio: Repository<Usuario>,
  ){}

  create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const nuevoUsuario = this.usuarioRepositorio.create(createUsuarioDto);
      return this.usuarioRepositorio.save(nuevoUsuario);
    } catch (error) {
      console.log(error)
      ManejoError.handleDBErrors(error)
    }
  }

  findAll() {
    try {
      return this.usuarioRepositorio.find()
    } catch (error) {
      console.log(error)
      ManejoError.handleDBErrors(error)
    }
  }

  async find(filtro: string) {
    try {
      return await this.usuarioRepositorio.find({
        where: { usuario: Like(`%${filtro}%`) }, // Busca coincidencias parciales en el nombre
      });
    } catch (error) {
      console.log(error);
      ManejoError.handleDBErrors(error);
    }
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}

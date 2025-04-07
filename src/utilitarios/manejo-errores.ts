import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

export abstract class ManejoError {
    static handleDBErrors(error: any): never {
        // Verificamos si es un error con un código específico
        switch (error.code) {
            // Error de violación de unicidad (clave primaria o índice único)
            case '23505':
                throw new ConflictException(`Ya existe un registro con este valor: ${error.detail || error.message}`);

            // Error de violación de clave foránea
            case '23503':
                throw new BadRequestException(`Referencia inválida: ${error.detail || error.message}`);

            // Error de valor no encontrado (si aplica en tu lógica)
            case '23502': // NOT NULL violation
                throw new BadRequestException(`Falta un valor requerido: ${error.detail || error.message}`);

            case '22P02':
                throw new BadRequestException(`Formato de dato inválido: ${error.message}`);
            case '42703':
                throw new NotFoundException(`Columna no encontrada: ${error.message}`);
            // Otros códigos personalizados que quieras manejar
            default:
                // Si no reconocemos el código, lanzamos un error genérico
                throw new InternalServerErrorException('Error inesperado en la base de datos');
        }
    }
}
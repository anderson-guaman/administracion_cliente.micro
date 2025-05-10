export abstract class Validador {

    static cedula(cedula: string): boolean{
        return /^\d{1,14}$/.test(cedula)
    }

    static numerosCelulares(celulares: string[]):boolean{
        return celulares.every(numero => /^\d{1,10}$/.test(numero));
    }
}
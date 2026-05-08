//Importar el cliente axios configurando en cliente.ts
//Importamos el tipo de Carros para tipar la respuesta de la API
import { Ramo } from '../types/ramo';
import { client } from './client';

//Definimos un servicio ramoService
//Este servicio va a centralizar las operaciones relacionadas
//con la entidad ramo y contendra metodos asincronicos para interactura con la API
export const ramoService = {
    //Metodo GET: onbtinene todos los carros del backend
    //Retorna una promesa que resuelve a un arreglo de objetos Carro
    getAll: async (): Promise<Ramo[]> => {
        const { data } = await client.get<Ramo[]>('/Ramos');
        return data;
    },
    //Metodo POST: agregar un nuevo carro enviamos la marca al backend
    //Retornar un promisa con el objeto carro recien creado
    add: async (nombre:string, costo:number): Promise<Ramo> => {
        const { data } = await client.post<Ramo>('/Ramos', { nombre, costo });
        return data;
    }
};
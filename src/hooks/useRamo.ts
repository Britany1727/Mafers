//Importar los hooks de tanstack query
// -useQuery: para consultas GET
//-useMutation: para operarciones POST/PUT/DELETE
//-useQueryClient: para interactuar con la cache
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
//Importar el servicio ramoService, que contiene las funciones de API
import { ramoService } from '../api/ramo.service';
//Definir una constante key me va a servir como identificador unico
//para las querys relacionadas con el recurso ramo
const KEY = ['ramos'];

//Hook Personalizado useRamos
//Para encapsular la logica de obtener carros desde la API
//Utilizar useQuery que reemplaza al useEffect y el UseState con queryKey 'carros'
//-queryFin: ejecuta carros Service.getAll() y muestre un consolo log
//-staleTime: definir que los datos se mantengan cacheados por n minutos
export function useRamos() {
    return useQuery({
        queryKey: ['ramos'],
        queryFn: () => {
            console.log('Get ejecutado - se fue a la red');
            return ramoService.getAll();
        },
        staleTime: 1000 * 60 * 5 // cache valido de 5 minutos
    });
}
//Hook Personalizado
//Emcapsular la logica de agregar un ramo nuevo
//Usar useMutation para llamar a ramoService.add()
//onSuccess: invalida la query 'ramos' para regresar la lista  automaticamente cuando haya cambios

export function useAgregarRamo() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ nombre, costo }: { nombre: string; costo: number }) => ramoService.add(nombre, costo),
        onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
        
    });
}
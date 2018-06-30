
import { Injectable } from '@angular/core';
import {Cliente, Grupo } from './cliente.model';  //el modelo
import { Observable } from 'rxjs';                //libreria de Observable
import { Subject } from 'rxjs';                   //libreria de subject (emisor de eventos para el observable)


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private clientes$ = new Subject<Cliente[]>();  //vamos a observar el array de clientes instanciando una propiedad terminada con el
                                                 //signo $ para identificar que es del tipo observable y definimos que vamos a observar
                                                 //el array Cliente, definido en el modelo.
  private clientes: Cliente[];
  private grupos: Grupo[];

  constructor() {
    this.grupos = [
      {
        id: 0,
        nombre: 'Sin definir'
      },
      {
        id: 1,
        nombre: 'Activos'
      },
      {
        id: 2,
        nombre: 'Inactivos'
      },
      {
        id: 3,
        nombre: 'Deudores'
      }
    ],
    this.clientes = [];
   }

   getGrupos(){
     return this.grupos;
   }

   getClientes(){
     return this.clientes;
   }

   agregarCliente(cliente: Cliente){
     this.clientes.push(cliente);
     this.clientes$.next(this.clientes);//el metodo para generar el evento es next, y se pasa el array con el estado de ese momento
   }

   nuevoCliente(): Cliente {
     return {
      id: this.clientes.length,
      nombre: '',
      cif: '',
      direccion: '',
      grupo: 0
     };
   }

   getCliente$(): Observable<Cliente[]>{      //este metodo (que tambien termina con $) devuelve un Observable invocando a la prop.
     return this.clientes$.asObservable();    //cliente$ definida previamente.
   }
}

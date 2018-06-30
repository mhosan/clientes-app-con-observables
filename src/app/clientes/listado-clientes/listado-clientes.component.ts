import { Component, OnInit } from '@angular/core';
import { Cliente, Grupo } from '../cliente.model';
import { ClientesService} from '../clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  clientes: Cliente[];
  
  //propiedad para almacenar el observable. Se declara el tipo pero no se inicializa todavia
  clientes$: Observable<Cliente[]>;

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {
    //se accede al observable mediante el metodo getCliente$() del servicio clientesService. Ese observable
    //es el que puede escuchar los eventos que necesitamos consumir
    this.clientes$ = this.clientesService.getCliente$();

    //se crea una suscripcion mediante el metodo subscribre() del observable. Este metodo tiene la funcion 
    //manejadora de eventos que contiene el codigo a ejecutar al dispararse el evento. Recibe el array que
    //se esta observando como parametro
    this.clientes$.subscribe(clientes => this.clientes = clientes);
  }

}

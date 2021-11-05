import { Injectable } from '@angular/core';
import { Client } from './client'
import { CLIENTS } from './clientes.json'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients(): Client[]{
    return CLIENTS;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from '../Client';
import { Init } from '../initClients'

@Injectable({
  providedIn: 'root'
})
export class ClientService extends Init {
  client = new Subject<Client>();

  constructor() { 
    super();
    this.load();
  }

  getClients() {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    return clients;
  }
  
  addClient(newClient: Client) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));
    this.getClients();
    location.reload();
  }
  
  onDelete(email: string) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    
    for(let i = 0; i <clients.length; i++) {
      if(clients[i].email == email) {
        clients.splice(i, 1);
      }
    }
    localStorage.setItem('clients', JSON.stringify(clients));
    location.reload();
  }

  onEdit(email:string) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    const clientEdit = clients.find((c: { email: string; }) => c.email === email);
    this.client.next(clientEdit);
  }
    
  onUpdate (oldClient: any, newClient:  any) { 
    let clients = JSON.parse(localStorage.getItem('clients')!);
    let uniqueClient = clients.find( (c: { email: any; firstName: any; lastName: any; dateOfBirth: any; }) => 
        c.email === oldClient.email || 
        c.firstName === oldClient.firstName && 
        c.lastName === oldClient.lastName && 
        c.dateOfBirth === oldClient.dateOfBirth)
    const index = clients.findIndex( (c: { email: any; }) => c.email === uniqueClient.email );
    
    let copyClient = clients.find((c: { firstName: string; lastName: string; dateOfBirth: any; email: any; }) =>
        (c.firstName.toLowerCase() === newClient.firstName.toLowerCase() &&
        c.lastName.toLowerCase() === newClient.lastName.toLowerCase() &&
        c.dateOfBirth === newClient.dateOfBirth) ||
        c.email === newClient.email);
    const copyIndex = clients.findIndex( (c: { email: any; }) => c.email === copyClient.email );

    if (copyIndex != index) {
      alert('This client is already in the database');
      return;
    } else {
      clients[index] = newClient;
    }

    localStorage.setItem('clients', JSON.stringify(clients));
    this.getClients();
    location.reload();
  }
  
}

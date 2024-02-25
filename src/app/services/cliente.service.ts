import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, catchError, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.clienteApiUrl)
      .pipe(
        tap(_ => this.log('fetched clients')),
        catchError(this.handleError<Cliente[]>('getClients', []))
      );
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${environment.clienteApiUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      tap(_ => this.log(`fetched cliente id=${id}`)),
      catchError(this.handleError<Cliente>(`getCliente id=${id}`))
    );
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    cliente.dataCadastro = new Date();
    return this.http.post<Cliente>(environment.clienteApiUrl, cliente, this.httpOptions).pipe(
      tap((newCliente: Cliente) => this.log(`added cliente w/ id=${newCliente.id}`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  deleteCliente(id: number): Observable<Cliente> {
    const url = `${environment.clienteApiUrl}/${id}`;

    return this.http.delete<Cliente>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted cliente id=${id}`)),
      catchError(this.handleError<Cliente>('deleteCliente'))
    );
  }

  updateCliente(cliente: Cliente): Observable<any> {
    const url = `${environment.clienteApiUrl}/${cliente.id}`;

    return this.http.put(url, cliente, this.httpOptions).pipe(
      tap(_ => this.log(`updated cliente id=${cliente.id}`)),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.log(`ClienteService: ${message}`);
  }
}

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente, ClientePaginado } from '../models/cliente';
import { Observable, catchError, map, of, tap } from 'rxjs';
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

  getClientes(limit: number, page: number, orderField: string = '', orderDirection: string = '', textoFiltro: string = ''): Observable<ClientePaginado> {

    return this.http.get<Cliente[]>(this.buildGetClientesFilterUrl(limit, page, orderField, orderDirection, textoFiltro),
      { observe: 'response', transferCache: { includeHeaders: ['X-filtered-count'] } })
      .pipe(
        map((response: HttpResponse<Cliente[]>) => {
          const count = response.headers.get('X-filtered-count')
          console.log(count)
          return new ClientePaginado(parseInt(count as string, 10), response.body as Cliente[])
        })
      );
  }

  private buildGetClientesFilterUrl(limit: number, page: number, orderField: string = '', orderDirection: string = '', textoFiltro: string = ''): string {
    return environment.clienteApiUrl + "?page=" + page + "&limit=" + limit + (textoFiltro != '' ? "&search=" + textoFiltro : "") + (orderField != '' ? ("&sort=" + orderField + "&order=" + orderDirection) : "")
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

  private log(message: any) {
    this.messageService.log(`ClienteService: ${message}`);
  }
}

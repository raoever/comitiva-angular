import { Injectable } from '@angular/core';

import {take, tap} from "rxjs/operators";
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Familia} from "../models/familia";

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  url = 'https://comitiva.cyclic.app'; //https://web-production-0daa.up.railway.app/cadastro
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getFamilias(): Observable<Familia[]> {
      return this.httpClient
        .get<Familia[]>(`${this.url}/cadastro`)
        .pipe(retry(2), catchError(this.handleError));
  }

  delFamilia(id: number): Observable<Familia> {
    console.log('chegou no serviço del. ' + id);
    console.log(`${this.url}/cadastro/familia/${id}`);
    return this.httpClient.delete<Familia>(
      `${this.url}/cadastro/familia/${id}`
    );
    //  .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  baseUrl= 'http://localhost:8000'

  constructor(public http: HttpClient) { }
  get(pathUrl){
    return this.http.get(`${this.baseUrl}/${pathUrl}`)
    .pipe(
      // catchError(err => of(err))
      catchError(err => {
        // console.log(err)
        alert('error in source. Details: ' + err.error)
        throw 'error in source. Details: ' + err.error;
      })
    );
  }

  getParamEmail(pathUrl, header, email){
    const httpOptions = {
      headers: new HttpHeaders({
        'password':  header
      })  
    };

    return this.http.get(`${this.baseUrl}/${pathUrl}/${email}`,httpOptions)
  }

  post(pathUrl, body: any) {
    return this.http.post(`${this.baseUrl}/${pathUrl} `, body)
    .pipe(
      // catchError(err => of(err))
      catchError(err => {
        // console.log(err)
        alert('error in source. Details: ' + err.error)
        throw 'error in source. Details: ' + err.error;
      })
    );
    
  }

  put(pathUrl, id, body: any) {
    return this.http.put(`${this.baseUrl}/${pathUrl}/${id}`, body)
    .pipe(
      // catchError(err => of(err))
      catchError(err => {
        // console.log(err)
        alert('error in source. Details: ' + err.error)
        throw 'error in source. Details: ' + err.error;
      })
    );;
  }

  delete(pathUrl, id) {
    return this.http.delete(`${this.baseUrl}/${pathUrl}/${id}`)
    .pipe(
      // catchError(err => of(err))
      catchError(err => {
        // console.log(err)
        alert('error in source. Details: ' + err.error)
        throw 'error in source. Details: ' + err.error;
      })
    );;
  }
}

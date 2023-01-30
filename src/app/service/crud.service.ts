import { HttpClient,HttpEvent, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class CRUDService {
  private baseURL = 'http://localhost:3000/';
  
  //==================================> User <===================================

  constructor(private http: HttpClient) {
   }
  getUserInfo(){
    return this.http.get(this.baseURL+'user-data');
  }

  postUser(data:any){
    return this.http.post<any>(this.baseURL+'user-data',data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //=================================> Books <==================================

  getAllBooks(){
    return this.http.get(this.baseURL+'books');
  }
  getIndividualBook(bookId:number):any{
    return this.http.get(this.baseURL+'books/'+bookId);
  }
  postBooks(bookdetails:any){
    return this.http.post<any>(this.baseURL+'books',bookdetails).pipe(map((response:any)=>{
      return response;
    }))
  }
  deleteBook(id:any){
    return this.http.delete(this.baseURL+'books/'+id)
    .pipe(retry(1))
  }
  updateBook(id:any, params:any){
    return this.http.put(`${this.baseURL}books/${id}`,params);
  }
  //====================================================================================
}
 
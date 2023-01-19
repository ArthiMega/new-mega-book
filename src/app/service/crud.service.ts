import { HttpClient,HttpEvent, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root' 
})
export class CRUDService {
  private baseURL = 'http://localhost:3000/';
  todo = null;
  //userInfo = [{"name":"Arthi","rent":5500},{"name":"dhivya","rent":5500}]
  

  constructor(private http: HttpClient) {
    
   }
   myReadings:string[] = [];
  getUserInfo(){
    return this.http.get(this.baseURL+'user-data');
  }

  getAllVidios(){
    return this.http.get(this.baseURL);
  }
  getAllBooks(){
    return this.http.get(this.baseURL+'books');
  }
  
  // saveData(inputData:any){
  //   this.http.post(this.baseURL, inputData);
  // }
  // videoGetByCode(code:any){
  //   this.http.get(this.baseURL +"/"+ code);
  // }
  // removeVideo(code:any){
  //   this.http.delete(this.baseURL +"/"+code);
  // }
  //new
  
  postUser(data:any){
    return this.http.post<any>(this.baseURL+'user-data',data).pipe(map((res:any)=>{
      return res;
    }))
  }
  // postDashBoard(bookName:string){
  //   return this.http.post<any>(this.baseURL+'myreading/',{'name':bookName}).pipe(map((res:any)=>{
  //     return res;
  //   }))
  //}
  postBooks(bookdetails:any){
    return this.http.post<any>(this.baseURL+'books',bookdetails).pipe(map((response:any)=>{
      return response;
    }))
  }
  deleteBook(id:any){
    return this.http.delete(this.baseURL+'books/'+id)
    .pipe(retry(1))
  }
  updateBook(id:any){
    return this.http.put(this.baseURL +'books/',id)
  }
  uploadfile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseURL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  // ==========add to cart========
  // addToMyReadings(bookname:string,userId:number){
  //   //return this.http.post<any>(this.baseURL+'user-data/'+userId,)
  // }
  // saveMyReading(): void {
  //   localStorage.setItem('cart_items', JSON.stringify(this.myReadings)); 
  // }
  // getMyReadings(){
  //   return this.myReadings;
  // }
}
 
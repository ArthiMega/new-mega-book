import { HttpClient, HttpHandler, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CRUDService } from './crud.service';
import { baseURL } from 'src/environments/environment';

describe('CRUDService', () => {
  let service: CRUDService;
  let httpClient :HttpClient;
  let httpTestingController:HttpTestingController;
  let USER = [{
    "firstName": "Dhanush",
    "lastName": "Baskaran",
    "email": "dhanush@gmail.com",
    "password": "Aspire123",
    "id": 1 
  }];
  let BOOKS = [
    {
      "name": "History of the Marvel Universe",
      "author": "Dany",
      "price": 350,
      "img": "http://localhost:4200/assets/images/marvel.png",
      "about": "Marvel was started in 1939 by Martin Goodman as Timely Comics, and by 1951 had generally become known as Atlas Comics. The Marvel era began in June 1961 with the launch of The Fantastic Four and other superhero titles created by Stan Lee, Jack Kirby, Steve Ditko and many others.",
      "id": 6
    }
  ]
let id = 1
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers:[HttpClient,
               HttpHandler,
               {
                provide:HttpClient, 
                useValue:httpClientSpyObj
              }],
      imports:[HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CRUDService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // describe('post()',()=>{
  //   it('Should add books',()=>{
  //     service.postBooks(BOOKS).subscribe(
  //       data =>expect(data).toEqual(BOOKS,'should return biooks'),
  //       fail
  //     );
  //     const req = httpTestingController.expectOne(service.baseURL);
  //     expect(req.request.method).toEqual('POST');
  //     expect(req.request.body).toEqual(BOOKS);
  //     const expectedResponce = new HttpResponse({status:201,statusText:'Created',body:BOOKS})
  //     req.event(expectedResponce);
  //     req.flush(BOOKS);
  //   });
  // });
  it('should call update book and return the updated book',()=>{
    service.updateBook(id,BOOKS).subscribe((data:any)=>{
      expect(data).toEqual(BOOKS);
    });
    const req = httpTestingController.expectOne({
      method:'PUT',
      url:`${baseURL}/books`,
    })
  })
  it('should delete books',()=>{
    service.deleteBook(id).subscribe((data:any)=>{
      expect(data).toEqual(BOOKS);
    });
    const req = httpTestingController.expectOne({
      method:'DELETE',
      url:`${baseURL}/books`,
    });
  });
  it('should post book',()=>{
    service.postBooks(BOOKS).subscribe((data:any)=>{
      expect(data).toEqual(BOOKS);
    })
    const req = httpTestingController.expectOne({
      method:'POST',
      url:`${baseURL}/books`,
    });
  })
  it('should post user',()=>{
    service.postUser(USER).subscribe((data:any)=>{
      expect(data).toEqual(USER);
    })
    const req = httpTestingController.expectOne({
      method:'POST',
      url:`${baseURL}/user-data`,
    });
    const expectedResponse = new HttpResponse({ status: 304, statusText: 'Created', body: USER });
    req.event(expectedResponse);
  })
});

/* tslint:disable:no-unused-variable */

import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ToastrModule, ToastrService} from 'ngx-toastr';
import { AuthService } from './authentication.service';

describe('Service: Authentication', () => {
  let toastrService :ToastrService;
  let httpClient:HttpClient;
  let httpTestingController: HttpTestingController;

  let httpClientSpy:jasmine.SpyObj<HttpClient>;
  let authService: AuthService;
  let POSTS = [
    {
      "firstName": "Dhanush",
      "lastName": "Baskaran",
      "email": "dhanush@gmail.com",
      "password": "Aspire123",
      "id": 1
    },
  ];
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient',['get']);
    // httpClientSpy = jasmine.createSpyObj('HttpClient',['get'])
    // authService = new AuthService();
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService',['error','success'])
    TestBed.configureTestingModule({
      providers: [AuthService, HttpClient, HttpHandler,{provide:ToastrService, useValue:toastrService}],
      imports:[ToastrModule.forRoot()]
    });
  });
  describe('#getUser', () => {
    let expectedEmps: any[]=[];

    beforeEach(() => {
      //Dummy data to be returned by request.
      expectedEmps = [
  
        {
          "firstName": "Dhanush",
          "lastName": "Baskaran",
          "email": "dhanush@gmail.com",
          "password": "Aspire1 23",
          "id": 1
        }
      ];
    });
  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();  
  }));
  it('base url should', inject([AuthService], (service: AuthService)=>{
    expect(service.baseURL).toBe("http://localhost:3000/");
  }));
  // it('Should test "show Success" method',()=>{
  //   expect(toastrService.success).toHaveBeenCalledWith("Logged in successfully!", "User");
  // })
  // it('Should test "show error" method',()=>{
  //   expect(toastrService.error).toHaveBeenCalledWith('Something was wrong');
  // })
  it('should return data expected user',()=>{
    authService.getUser().subscribe(
      users=>expect(users).toEqual(expectedEmps,'should return expected users'),fail
    );
    const req = httpTestingController.expectOne(authService.baseURL);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedEmps);
  })
});
})
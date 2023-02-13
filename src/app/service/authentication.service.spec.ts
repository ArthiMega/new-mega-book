/* tslint:disable:no-unused-variable */

import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from './authentication.service';
import { of } from 'rxjs';

describe('Service: Authentication', () => {
  let toastrService: ToastrService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
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
  let MYREADINGS = [
    {
      "email": "guna@gmail.com",
      "mybooks": {
        "name": "History of the Marvel Universe",
        "author": "Dany",
        "price": 350,
        "img": "http://localhost:4200/assets/images/marvel.png",
        "about": "Marvel was started in 1939 by Martin Goodman as Timely Comics, and by 1951 had generally become known as Atlas Comics. The Marvel era began in June 1961 with the launch of The Fantastic Four and other superhero titles created by Stan Lee, Jack Kirby, Steve Ditko and many others.",
        "id": 6
      },
      "id": 1
    },
  ]
  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    // authService = new AuthService();
    toastrService = jasmine.createSpyObj<ToastrService>('ToastrService', ['error', 'success'])
    TestBed.configureTestingModule({
      providers: [AuthService, {
        provide: HttpClient,
        useValue: httpClientSpyObj,
      },
        HttpHandler,
        {
          provide: ToastrService,
          useValue: toastrService
        }],
      imports: [ToastrModule.forRoot(), HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });
  describe('#getUser()', () => {
    it('should return expected get', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(POSTS));
      authService.getUser().subscribe({
        next: (posts) => {
          expect(posts).toEqual(POSTS);
          done();
        },
        error: () => {
          done.fail
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })
  

    it('should ...', inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    }));
    it('base url should', inject([AuthService], (service: AuthService) => {
      expect(service.baseURL).toBe("http://localhost:3000/");
    }));
    // it('Should test "show Success" method',()=>{
    //   expect(toastrService.success).toHaveBeenCalledWith("Logged in successfully!", "User");
    // })
    // it('Should test "show error" method',()=>{
    //   expect(toastrService.error).toHaveBeenCalledWith('Something was wrong');
    // })
  });

  describe('#postUser()', () => {
    it('should add books and return it', () => {
      authService.postDashBoard(MYREADINGS).subscribe(
        data => expect(data).toEqual(MYREADINGS, 'shoud return my readings'),
        fail
      );
      const req = httpTestingController.expectOne(authService.baseURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(MYREADINGS);
    });
  });
  it('should add books and return it', () => {
    authService.buyNow(MYREADINGS).subscribe(
      data => expect(data).toEqual(MYREADINGS, 'shoud return my readings'),
      fail
    );
    const req = httpTestingController.expectOne(authService.baseURL);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(MYREADINGS);
  });
})
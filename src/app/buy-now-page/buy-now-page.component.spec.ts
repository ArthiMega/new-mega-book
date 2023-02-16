/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowPageComponent } from './buy-now-page.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication.service';
import { of } from 'rxjs';
import { CRUDService } from '../service/crud.service';


describe('BuyNowPageComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router',['navigate']);
  let component: BuyNowPageComponent;
  let fixture: ComponentFixture<BuyNowPageComponent>;
  let router : Router;
  let obj = {};
  let authService:AuthService;
  let crudServise: CRUDService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyNowPageComponent ],
      providers:[HttpClient, 
                HttpHandler,
                ToastrService,
                ToastrModule,
                {
                  provide:Router,
                  useValue:routerSpy
                }
                ],
      imports:[ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BuyNowPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    crudServise = TestBed.get(CRUDService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('router navigation to book page',()=>{
    component.navigateToHome();
    const spy = router.navigate as jasmine.Spy;
    const navArgs =spy.calls.first().args[0];
    expect(navArgs[0]).toBe('../book')
  })
  it('should call buy now() ',()=>{
    component.buyNow(obj);
  });
  it('getCartDetails()',()=>{
    const response :string[]= [];
    spyOn(authService,'getCart').and.returnValue(of(response))
    component.getCartDetails();
    expect(component.cardDetails).toEqual(response);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BuyNowPageComponent);
    component = fixture.componentInstance;
    component.currentUser = 'test@example.com';
    component.buyNowModuleObj = { "email": "art@gmail.com",
    "cartedBooks": {
      "name": "My Sustem: An Evolved Computer I Made with my unique ability",
      "author": "James",
      "price": 350,
      "img": "http://localhost:4200/assets/images/MySystem.webp",
      "about": "A young man found himself reborn as a Kryptonian. Content with living a quiet and peaceful life. Sadly it came to an abrupt end when a pink hair alien crash ...",
      "id": 7
    },
    "id": 11};
    component.cardDetails = [
      { email: 'test@example.com', cartedBooks: { id: 'book-456' } },
    ];
    fixture.detectChanges();
  });

  it('should return true if no duplicate items in cart', () => {
    const result = component.checkDuplicates({ email: 'test@example.com', cartedBooks: { id: 'book-789' } });
    expect(result).toBeTrue();
  });
  
  it('should return false if duplicate items in cart', () => {
    const result = component.checkDuplicates({ email: 'test@example.com', cartedBooks: { id: 'book-456' } });
    expect(result).toBeFalse();
  });
  it('should set the IndividualBook property with the response from the service', () => {
   const response :string[]=[];
   spyOn(crudServise,'getIndividualBook').and.returnValue(of(response))
   component.getIndividualBook()
   fixture.detectChanges();
   expect(component.IndividualBook).toEqual(response)
  });
});

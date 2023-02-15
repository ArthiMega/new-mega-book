/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowPageComponent } from './buy-now-page.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../service/authentication.service';
import { of } from 'rxjs';


describe('BuyNowPageComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router',['navigate']);
  let component: BuyNowPageComponent;
  let fixture: ComponentFixture<BuyNowPageComponent>;
  let router : Router;
  let obj = {};
  let authService:AuthService;

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
  it('call check duplicates ',()=>{
    component.checkDuplicates(obj);
  });
  it('should call buy now() ',()=>{
    component.buyNow(obj);
  });
  it('getCartDetails()',()=>{
    const response :string[]= [];
    spyOn(authService,'getCart').and.returnValue(of(response))
    component.getCartDetails();
    expect(component.cardDetails).toEqual(response);
  });
});

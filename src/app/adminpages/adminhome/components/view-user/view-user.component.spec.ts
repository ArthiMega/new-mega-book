/* tslint:disable:no-unused-variable */
import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { CRUDService } from 'src/app/service/crud.service';
import { AuthService } from 'src/app/service/authentication.service';

import { ViewUserComponent } from './view-user.component';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let text = "Arthi";
  let crudService:CRUDService;
  let authService:AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserComponent ],
      providers:[HttpClient, HttpHandler,ToastrService, ToastrModule],
      imports:[ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    crudService = TestBed.get(CRUDService);
    authService= TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onSearchEntered',()=>{
    component.onSearchTextEnterd(text);
  });
  it('should call get user and return list of users',()=>{
    const response: string[]= [];
    spyOn(crudService, 'getUserInfo').and.returnValue(of(response))
    component.viewUsers();
    fixture.detectChanges();
    expect(component.users).toEqual(response);
  });
  it('Should call and return user books',()=>{
    const response: string[]= [];
    spyOn(authService, 'getDashboard').and.returnValue(of(response))
    component.viewUserBooks();
    fixture.detectChanges();
    expect(component.dashBoard).toEqual(response);
  });
  it('getCart()',()=>{
    const response1 :string[]= [];
    spyOn(authService, 'getCart').and.returnValue(of(response1))
    component.viewUserBooks();
    fixture.detectChanges();
    expect(component.cartedBooks).toEqual(response1);
  })
});

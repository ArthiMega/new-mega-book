/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/authentication.service';
import { CRUDService } from '../service/crud.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService:AuthService
  let crudService:CRUDService;
  let id = 1;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers:[HttpClient,HttpHandler,ToastrService,ToastrModule],
      imports:[ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService)
    crudService = TestBed.get(CRUDService);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getUser()',()=>{
    const response :string[]=[];
    spyOn(authService,'getDashboard').and.returnValue(of(response))
    component.getUser();
    fixture.detectChanges();
    expect(component.users).toEqual(response);
  });
  it('should call getBooks()',()=>{
    const response:string[]=[]
    spyOn(crudService,'getAllBooks').and.returnValue(of(response))
    component.getBooks();
    expect(component.books).toEqual(response);
  });
  it('should call the parchasedBooks()',()=>{
    const response :string[]=[];
    spyOn(authService,'getCart').and.returnValue(of(response))
    component.getPurchasedBookDetails();
    fixture.detectChanges();
    expect(component.cartedBooks).toEqual(response);
  });
});

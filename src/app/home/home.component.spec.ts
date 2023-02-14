/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CRUDService } from '../service/crud.service';
import { of } from 'rxjs';
import { AuthService } from '../service/authentication.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let text = "Peppa pig";
  let obj = {}
  let crudService:CRUDService;
  let authService:AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers:[HttpClient, HttpHandler, CRUDService],
      imports:[ToastrModule.forRoot(), FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    crudService = TestBed.get(CRUDService);
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Enter search entered...',()=>{
    component.onSearchTextEnterd(text);
  });
  it('check duplicates for true',()=>{
    var result = component.checkDuplicates(obj);
    expect(result).toBe(true)
  })
  it('add to dash board', ()=>{
    component.addDashBoard(obj);
  })
  // it('get dashbotrdBooks',()=>{
  //   const response :any[]= [];
  //   spyOn(crudService,'getDashboard').and
  // })
  it('should call the method in servise in onINit',()=>{
    const response :string[] = [];
    spyOn(crudService,'getAllBooks').and.returnValue(of(response));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.books).toEqual(response);
  });
  it('getDashBoard()',()=>{
    const response:string[] = [];
    spyOn(authService,'getDashboard').and.returnValue(of(response));
    component.getDashboardBooks();
    expect(component.userReadings).toEqual(response);
  })
});

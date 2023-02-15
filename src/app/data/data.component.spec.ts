/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataComponent } from './data.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/authentication.service';
import { of } from 'rxjs';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let authService :AuthService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataComponent ],
      providers:[HttpClient,HttpHandler],
      imports:[ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the getIndividualUser()',()=>{
    const response :string[]=[]
    spyOn(authService,'getIndividualUser').and.returnValue(of(response))
    component.getindividualUser();
    fixture.detectChanges();
    expect(component.individualUser).toEqual(response)
  })
});

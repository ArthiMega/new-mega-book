/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingComponent } from './listing.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CRUDService } from '../service/crud.service';
import { of } from 'rxjs';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let crudService :CRUDService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingComponent ],
      providers:[HttpClient,HttpHandler],
      imports:[ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    crudService = TestBed.get(CRUDService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getAllUsers()',()=>{
    const response:string[]= [];
    spyOn(crudService,'getUserInfo').and.returnValue(of(response))
    component.getAllUsers();
    fixture.detectChanges();
    expect(component.userData).toEqual(response);
  })
});

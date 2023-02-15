/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import {baseURL} from '../../../../../environments/environment'
import { EditebooksComponent } from './editebooks.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CRUDService } from 'src/app/service/crud.service';
import  {of} from 'rxjs';

describe('EditebooksComponent', () => {
  let component: EditebooksComponent;
  let fixture: ComponentFixture<EditebooksComponent>;
  let text = "fetch";
  let id = 1;
  let crudService:CRUDService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditebooksComponent ],
      providers:[HttpClient, HttpHandler, CRUDService],
      imports:[ToastrModule.forRoot(), HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditebooksComponent);
    component = fixture.componentInstance;
    crudService = TestBed.get(CRUDService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onearchEnterd()',()=>{
    component.onSearchTextEnterd(text);
  })
  it('deleteBook()',()=>{
    window.confirm = ()=>true
    spyOn(crudService,'deleteBook');
    component.deleteBook(id);
    expect(crudService.deleteBook).toHaveBeenCalled();
  });
  it('viewBooks()',()=>{
    const response:string[] = [];
    spyOn(crudService, 'getAllBooks').and.returnValue(of(response))
    component.viewBooks();
    fixture.detectChanges();
    expect(component.books).toEqual(response);
  });
});

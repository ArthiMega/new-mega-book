/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import {baseURL} from '../../../../../environments/environment'
import { EditebooksComponent } from './editebooks.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CRUDService } from 'src/app/service/crud.service';

describe('EditebooksComponent', () => {
  let component: EditebooksComponent;
  let fixture: ComponentFixture<EditebooksComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should fetch books using the CRUDService', inject([CRUDService, HttpTestingController], (service: CRUDService, httpMock: HttpTestingController) => {
  //   const booksData = [    {
  //     "name": "Batman curse of the white knight",
  //     "author": "James",
  //     "price": 300,
  //     "about": "Ancient curses are awoken and timeless secrets are revealed in this explosive sequel to the critically acclaimed blockbuster Batman: White Knight from writer/artist Sean Murphy! The Joker recruits Azrael to help him expose a shocking secret from the Wayne family's legacy-and run Gotham City into the ground!",
  //     "file": "C:\\fakepath\\077YDd57P7u7kiyUWVZXUrz.fit_lim.size_800x450.v1573095484.jpg",
  //     "img": "http://localhost:4200/assets/images/077YDd57P7u7kiyUWVZXUrz.fit_lim.size_800x450.v1573095484.jpg",
  //     "id": 1
  //   }];

  //   service.getAllBooks().subscribe(books => {
  //     expect(books).toEqual(booksData);
  //   });

  //   const req = httpMock.expectOne(`${baseURL}books`);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(booksData);
  // }));
});

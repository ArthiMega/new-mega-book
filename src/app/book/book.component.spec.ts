/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { BookComponent } from './book.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CRUDService } from '../service/crud.service';
import { AuthService } from '../service/authentication.service';
import { of } from 'rxjs';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let location : Location;
  let router:jasmine.SpyObj<Router>;
  let authService :AuthService;
  let id = 1
  beforeEach(async(() => {
    router = jasmine.createSpyObj<Router>('Router',['navigate'])
     TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers:[HttpClient, HttpHandler,{provide:Router,useValue:router}],
      imports:[ToastrModule.forRoot(), RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations:[BookComponent]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(BookComponent);
    authService = TestBed.get(AuthService);
    component = fixture.componentInstance;
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('goToTop()',()=>{
    component.goToTop();
  })
  it('getBook',()=>{
    const response: string[]= [];
    //spyOn(authService,'getIndividualBook').and.returnValue(of(response))
    let spy = spyOn<AuthService, any>(authService,'getIndividualBook').and.returnValue(of(response))//(authService,'getIndividualBook').and.returnValue(of(response))
    component.getBook();
    fixture.detectChanges();
    expect(component.book).toEqual(response);
  })
  it('getCart',()=>{
    const response:string[]=[];
    spyOn(authService,'getCart').and.returnValue(of(response))
    component.getAllCart();
    fixture.detectChanges();
    expect(component.cartItems).toEqual(response);
  })
  it('should expand the details if book is in cart', () => {
    const bookId = '1';
    component.bookId = bookId;
    spyOn(component, 'isInCart').and.returnValue(true);
    const initialExpand = component.expand;
    const initialAnchor = component.anchor;
    component.showMore();
    expect(component.expand).toBe(!initialExpand);
    expect(component.anchor).toBe(initialExpand ? '' : 'Read more');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to buy page if book is not in cart', () => {
    const bookId = '1';
    component.bookId = bookId;
    spyOn(component, 'isInCart').and.returnValue(false);
    component.showMore();
    expect(router.navigate).toHaveBeenCalledWith(['buy']);
    expect(component.expand).toBeFalse();
    expect(component.anchor).toBe('Read more');
  });
  it('should return true if book is in cart for the logged in user', () => {
    // set up test data
    const component = TestBed.createComponent(BookComponent);
    const instance = component.componentInstance;
    instance.cartItems = [
      {
        email: 'test@example.com',
        cartedBooks: {
          id: '123',
          title: 'The Great Gatsby',
          price: 10.99
        }
      }
    ];
    spyOn(sessionStorage, 'getItem').and.returnValue('test@example.com');

    // call the function being tested
    const result = instance.isInCart('123');

    // assert the result
    expect(result).toBe(true);
  });
  it('should return false if book is not in cart for the logged in user', () => {
    // set up test data
    const component = TestBed.createComponent(BookComponent);
    const instance = component.componentInstance;
    instance.cartItems = [
      {
        email: 'test@example.com',
        cartedBooks: {
          id: '123',
          title: 'The Great Gatsby',
          price: 10.99
        }
      }
    ];
    spyOn(sessionStorage, 'getItem').and.returnValue('test@example.com');

    // call the function being tested
    const result = instance.isInCart('456');

    // assert the result
    expect(result).toBe(false);
  });
});

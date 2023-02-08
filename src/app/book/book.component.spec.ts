/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { BookComponent } from './book.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CRUDService } from '../service/crud.service';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let location : Location;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers:[HttpClient, HttpHandler],
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
});

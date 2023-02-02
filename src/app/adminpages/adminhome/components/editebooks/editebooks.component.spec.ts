/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditebooksComponent } from './editebooks.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('EditebooksComponent', () => {
  let component: EditebooksComponent;
  let fixture: ComponentFixture<EditebooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditebooksComponent ],
      providers:[HttpClient, HttpHandler],
      imports:[ToastrModule.forRoot()]
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
});

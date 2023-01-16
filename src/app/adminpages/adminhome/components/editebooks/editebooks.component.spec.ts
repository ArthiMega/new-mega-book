/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditebooksComponent } from './editebooks.component';

describe('EditebooksComponent', () => {
  let component: EditebooksComponent;
  let fixture: ComponentFixture<EditebooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditebooksComponent ]
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

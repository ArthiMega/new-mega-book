/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormComponent ],
      providers:[HttpClient, HttpHandler,ToastrModule,ToastrService],
      imports:[ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('call f()',()=>{
    component.f
  })
  it('should call onsubmit',()=>{
    component.onSubmit();
  });
  it('onReset()',()=>{
    component.onReset();
  })
});

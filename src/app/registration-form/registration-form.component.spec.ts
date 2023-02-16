/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { MustMatch } from './must-match';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      providers: [HttpClient, HttpHandler, ToastrModule, ToastrService],
      imports: [ToastrModule.forRoot()]
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
  it('call f()', () => {
    component.f
  })
  it('should call onsubmit()', () => {
    component.onSubmit();
  });
  it('onReset()', () => {
    component.onReset();
  })
});
describe('MustMatch', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      password: new FormControl('password'),
      confirmPassword: new FormControl('confirmPassword'),
    }, MustMatch('password', 'confirmPassword'));
  });

  it('should return null if the controls match', () => {
    const password = formGroup.get('password');

    if (password) {
      password.setValue('new-password');
    }
    const confirmPassword = formGroup.get('password');

    if (confirmPassword) {
      confirmPassword.setValue('new-password');
    }

    expect(confirmPassword?.errors).toBeNull();
  });

  it('should set the mustMatch error if the controls do not match', () => {
    const password = formGroup.get('password');
    if (password) {
      password.setValue('new-password');
    }
    const confirmPassword = formGroup.get('password');

    if (confirmPassword) {
      confirmPassword.setValue('new-password');
    }
    expect(confirmPassword?.errors).toEqual({ mustMatch: true });
  });
});


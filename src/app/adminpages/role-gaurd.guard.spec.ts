import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { RoleGaurdGuard } from './role-gaurd.guard';

describe('RoleGaurdGuard', () => {
  let guard: RoleGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler],
      imports:[ToastrModule.forRoot()]
    });
    guard = TestBed.inject(RoleGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

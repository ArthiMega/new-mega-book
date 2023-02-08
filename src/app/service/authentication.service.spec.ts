/* tslint:disable:no-unused-variable */

import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { ToastrModule} from 'ngx-toastr';
import { AuthService } from './authentication.service';

describe('Service: Authentication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, HttpClient, HttpHandler],
      imports:[ToastrModule.forRoot()]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});

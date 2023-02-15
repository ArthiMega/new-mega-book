import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RoleGaurdGuard } from './role-gaurd.guard';
import { AuthService } from '../service/authentication.service';

describe('RoleGaurdGuard', () => {
  let guard: RoleGaurdGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['isAdmin']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ]
    });
    guard = TestBed.inject(RoleGaurdGuard);
  });

  it('should return true if user is an admin', () => {
    authService.isAdmin.and.returnValue(true);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should return false and redirect to home if user is not an admin', () => {
    authService.isAdmin.and.returnValue(false);
    const result = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});

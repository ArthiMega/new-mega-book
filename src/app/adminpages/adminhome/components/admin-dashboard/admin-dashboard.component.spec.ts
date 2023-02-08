/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NavService } from 'src/app/service/nav.service';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let navService: NavService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardComponent ],
      providers:[HttpClient,HttpHandler,NavService, {provide:ToastrService, useClasss:ToastrService}],
      imports:[ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    navService = TestBed.get(NavService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the hide method in nav service on onInit',()=>{
    spyOn(navService,'hide');
    component.ngOnInit();
    expect(navService.hide).toHaveBeenCalled();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyNowPageComponent } from './buy-now-page.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


describe('BuyNowPageComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router',['navigate']);
  let component: BuyNowPageComponent;
  let fixture: ComponentFixture<BuyNowPageComponent>;
  let router : Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyNowPageComponent ],
      providers:[HttpClient, 
                HttpHandler,
                ToastrService,
                ToastrModule,
                {
                  provide:Router,
                  useValue:routerSpy
                }
                ],
      imports:[ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BuyNowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('router navigation to book page',()=>{
    component.
  })
});

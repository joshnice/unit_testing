import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // example of a unit test
  it ('should use the user name from the service', async() => {
    let fixture = TestBed.createComponent(UserComponent);               // component being created
    let app = fixture.debugElement.componentInstance;                   
    let service = fixture.debugElement.injector.get(UserService);       // service being used, manually injected
    fixture.detectChanges();                                            // manually run detech changes
    expect(service.user_name).toEqual(app.username);                   // what the expected result is
  }); 

  it ('when user is not logged in it should display a message', async() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    let complied = fixture.debugElement.nativeElement;
    expect(complied.querySelector('div').textContent).toEqual('Please login');

  });

  it ('when user is logged in it should display there user name', async() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    app.user_logged_in = true;
    fixture.detectChanges();
    let complied = fixture.debugElement.nativeElement;
    expect(complied.querySelector('div').textContent).toEqual('User logged in ' + app.username);
  });
  
  it ('when button pressed the user should login', async() => {
    let fixture = TestBed.createComponent(UserComponent);
    let app = fixture.debugElement.componentInstance;
    let button = fixture.debugElement.nativeElement.querySelector('button');

    button.click();
    fixture.detectChanges();

    let complied = fixture.debugElement.nativeElement;



    expect(complied.querySelector('div').textContent).toEqual('User logged in ' + app.username);
  });
});

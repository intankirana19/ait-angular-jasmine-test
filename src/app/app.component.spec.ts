import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { UserService } from './shared/service/user/user.service';
import { mockUserArray } from './shared/mocks/user.mock';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    matDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: MatDialog, useValue: matDialog},
      ],
      declarations: [AppComponent],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    let store = {} as any;
    const mockLocalStorage = {
      getItem: (key: any): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render register button', () => {
    // TODO: write unit test that expect register button has show in app
    
    const buttonRegister = fixture.debugElement.query(By.css('.app__user-buttonRegister'));
    const element: HTMLElement = buttonRegister.nativeElement;
    expect(element.innerText).toContain('Register');
  });

  it('should show user registration form dialog when register button clicked', () => {
    // TODO: write unit test that expect user registration form rendered at dialog when register button clicked
    
    spyOn(component, 'showNewUserForm').and.callThrough();
    let buttonRegister = fixture.debugElement.query(By.css('.app__user-buttonRegister'));
    buttonRegister.nativeElement.click();
    expect(component.showNewUserForm).toHaveBeenCalled();
  });

  it('should load data from https://jsonplaceholder.typicode.com/users, so it can bind to user-list component', () => {
    // TODO: write unit test that expect all data fetched from URL and store to localStorage
    
    // let userDataURL = 'https://jsonplaceholder.typicode.com/users';

    userService.getUsersService().subscribe((userData) => {
      expect(userData).toEqual(mockUserArray);
    });

    // const req = httpTestingController.expectOne({
    //   method: 'GET',
    //   url: `${userDataURL}`,
    // });

    // req.flush(mockUserArray);
    userService.setUserDataOnLocalStorage(mockUserArray)
    expect(localStorage.getItem('userList')).toEqual(JSON.stringify(mockUserArray));
  });

  it('should render user-list component', () => {
    // TODO: write unit test that expect user-list component has show in app with data provided from https://jsonplaceholder.typicode.com/users
    
    let userListComponentSelector = fixture.debugElement.query(By.css('app-user-list'));
    expect(userListComponentSelector).not.toBeNull();

    userService.getUsersService().subscribe((userDataFromAPI) => {
      expect(userDataFromAPI).toEqual(mockUserArray);
      userService.userDatas$.subscribe((userDataFromBindingService) => {
        expect(userDataFromBindingService).toEqual(userDataFromAPI);
        let userListComponent: UserListComponent = fixture.debugElement.query(By.directive(UserListComponent)).componentInstance;
        expect(userListComponent.dataSource.data).toEqual(userDataFromBindingService);
      });
    });

    
  });

  it('should store data to localStorage when "Add" button in user-registration-form dialog clicked', () => {
    // TODO: write unit test that expect entried data to append to localStorage, then close the dialog

    let userRegistrationFormComponent: UserRegistrationFormComponent = fixture.debugElement.query(By.directive(UserRegistrationFormComponent)).componentInstance;
  
  });

  it('should close user-registration-form when "Close" button in user-registration-form dialog clicked', () => {
    // TODO: write unit test that expect user-registration-form dialog closed when button clicked
  });
});


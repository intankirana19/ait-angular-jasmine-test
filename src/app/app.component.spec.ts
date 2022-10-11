import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { UserService } from './shared/service/user/user.service';
import { mockUser11, mockUserArray } from './shared/mocks/user.mock';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  // let matDialog: jasmine.SpyObj<MatDialog>;
  let userService: UserService;

  beforeEach(async () => {
    // matDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule,
        OverlayModule,
        MatDialogModule
      ],
      providers: [
        MatDialog,
      ],
      declarations: [AppComponent],
    }).compileComponents();

    userService = TestBed.inject(UserService);
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
    expect(buttonRegister).toBeTruthy();
    const buttonRegisterElement: HTMLButtonElement = buttonRegister.nativeElement;
    expect(buttonRegisterElement.textContent).toContain('Register');
  });

  it('should show user registration form dialog when register button clicked', () => {
    // TODO: write unit test that expect user registration form rendered at dialog when register button clicked
    let buttonRegister: HTMLButtonElement = fixture.debugElement.query(By.css('.app__user-buttonRegister')).nativeElement;
    spyOn(component, 'showNewUserForm').and.callThrough();

    const dialogConfig = {
      autoFocus: false,
          data: {
            user: {isTrusted: false,},
            id: []
          },
          panelClass: 'userRegistrationDialog'
    };
    const dialogSpy = spyOn(component.dialog, 'open').and.callThrough();
    buttonRegister.click();
    expect(component.showNewUserForm).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(UserRegistrationFormComponent, dialogConfig);
  });

  it('should load data from https://jsonplaceholder.typicode.com/users, so it can bind to user-list component', () => {
    // TODO: write unit test that expect all data fetched from URL and store to localStorage
    
    // let userDataURL = 'https://jsonplaceholder.typicode.com/users';

    const getUserListSpy = spyOn(component, 'getUserList').and.callThrough();
    component.ngOnInit();
    expect(getUserListSpy).toHaveBeenCalled();

    userService.getUsersService().subscribe((userDataFromAPI) => {
      // expect(userDataFromAPI).toEqual(mockUserArray);

      userService.userSubject.next(userDataFromAPI);
      userService.userDatas$.subscribe((userData) =>{
        const setDataOnLocalStorage = spyOn(userService, 'setUserDataOnLocalStorage');
        expect(setDataOnLocalStorage).toHaveBeenCalledWith(userData);
        expect(localStorage.getItem('userList')).toEqual(JSON.stringify(userDataFromAPI));
      });
    });


    // const req = httpTestingController.expectOne({
      //   method: 'GET',
      //   url: `${userDataURL}`,
      // });

      // req.flush(mockUserArray);
  });

  it('should render user-list component', () => {
    // TODO: write unit test that expect user-list component has show in app with data provided from https://jsonplaceholder.typicode.com/users
    
    let userListComponentSelector = fixture.debugElement.query(By.css('app-user-list'));
    expect(userListComponentSelector).toBeTruthy();

    userService.getUsersService().subscribe((userDataFromAPI) => {
      // expect(userDataFromAPI).toEqual(mockUserArray);
      userService.userDatas = userDataFromAPI;
      
      let userListComponentDebugElement: DebugElement = fixture.debugElement.query(By.directive(UserListComponent));
      expect(userListComponentDebugElement).toBeTruthy();

      let userListComponentComponentInstance = userListComponentDebugElement.componentInstance;
      
      const fetchUserDatasSpy = spyOn(userListComponentComponentInstance, 'fetchUserDatas').and.callThrough();
      userListComponentComponentInstance.ngOnInit();
      expect(fetchUserDatasSpy).toHaveBeenCalled();
      
      userService.userDatas$.subscribe((userDataFromBindingService) => {
        expect(userDataFromBindingService).toEqual(userDataFromAPI);
      });

      expect(userListComponentComponentInstance.dataSource.data).toEqual(userDataFromAPI);
    });

    
  });

  describe('UserRegistrationFormComponent', () => {
    // let matDialogRef: jasmine.SpyObj<MatDialogRef<UserRegistrationFormComponent>>;

    const dialogMock = {
      close: () => { }
     };

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule
        ],
        providers: [
          {provide: MatDialogRef, useValue: dialogMock},
          { provide: MAT_DIALOG_DATA, useValue: {} },
        ],
        declarations: [UserRegistrationFormComponent],
      }).compileComponents();

      // matDialogRef = jasmine.createSpyObj('MatDialogRef', ['open', 'close']);
    });

    it('should store data to localStorage when "Add" button in user-registration-form dialog clicked', () => {
      // TODO: write unit test that expect entried data to append to localStorage, then close the dialog
      
      let formFixture = TestBed.createComponent(UserRegistrationFormComponent);
      let userRegistrationFormComponent = formFixture.componentInstance;
      formFixture.detectChanges();
  
      // const dialogWithDataConfig = {
      //   autoFocus: false,
      //       data: {
      //         user: mockUser11,
      //         id: [1,2,3,4,5,6,7,8,9,10,11]
      //       },
      //       panelClass: 'userRegistrationDialog'
      // };
      
      // const dialogSpy = spyOn(component.dialog, 'open').and.callThrough();
      // expect(dialogSpy).toHaveBeenCalledWith(UserRegistrationFormComponent, dialogWithDataConfig);
      
      
      // const dialogData = spyOn(component.dialog, 'open')
      //   .and
      //   .returnValue({
      //     afterClosed: () => of({
      //       user: mockUser11,
      //       id: [1,2,3,4,5,6,7,8,9,10,11]
      //     })
      //   } as any);

      userRegistrationFormComponent.data.id = [1,2,3,4,5,6,7,8,9,10,11];
      userRegistrationFormComponent.userForm.get('username')?.setValue(mockUser11.username);
      userRegistrationFormComponent.userForm.get('name')?.setValue(mockUser11.name);
      userRegistrationFormComponent.userForm.get('email')?.setValue(mockUser11.email);
      userRegistrationFormComponent.userForm.get('company')?.setValue(mockUser11.company.name);
      userRegistrationFormComponent.userForm.get('address')?.setValue(mockUser11.address.street + ',' + mockUser11.address.suite + ',' + mockUser11.address.city);
      // userRegistrationFormComponent.user = mockUser11;
      let addButton: HTMLButtonElement = formFixture.debugElement.query(By.css('.userForm__button-add')).nativeElement;

      spyOn(userRegistrationFormComponent, 'closeDialog').and.callThrough();
      const formMatDialogRefSpy = spyOn(userRegistrationFormComponent.dialogRef, 'close').and.callThrough();
      spyOn(component.dialog, 'open')
        .and
        .returnValue({
          afterClosed: () => of({
            user: userRegistrationFormComponent.user,
            id: [1,2,3,4,5,6,7,8,9,10,11]
          })
        } as any);

      addButton.click();


      expect(userRegistrationFormComponent.closeDialog).toHaveBeenCalledWith(true);
      // console.log(userRegistrationFormComponent.user);
      // expect(formMatDialogRefSpy).toHaveBeenCalledWith(mockUser11);

      // const createUserServiceSpy = spyOn(component, 'createUserService').and.callThrough();
      // expect(createUserServiceSpy).toHaveBeenCalledWith(mockUser11);

      // userService.userDatas$.subscribe((userData) =>{
      //   const setDataOnLocalStorage = spyOn(userService, 'setUserDataOnLocalStorage');
      //   expect(setDataOnLocalStorage).toHaveBeenCalledWith(userData);
      //   expect(localStorage.getItem('userList')).toEqual(JSON.stringify(mockUser11));
      // });
            
    });
  
    it('should close user-registration-form when "Cancel" button in user-registration-form dialog clicked', () => {
      // TODO: write unit test that expect user-registration-form dialog closed when button clicked

      let formFixture = TestBed.createComponent(UserRegistrationFormComponent);
      let userRegistrationFormComponent = formFixture.componentInstance;
      formFixture.detectChanges();
  
      let cancelButton: HTMLButtonElement = formFixture.debugElement.query(By.css('.userForm__button-cancel')).nativeElement;
      spyOn(userRegistrationFormComponent, 'closeDialog').and.callThrough();
      const formMatDialogRefSpy = spyOn(userRegistrationFormComponent.dialogRef, 'close').and.callThrough();
      cancelButton.click();
      expect(userRegistrationFormComponent.closeDialog).toHaveBeenCalledWith(false);
      expect(formMatDialogRefSpy).toHaveBeenCalled();
    });
  });

});

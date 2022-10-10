import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { mockUser1 } from '../shared/mocks/user.mock';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    matDialog = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatTableModule
      ],
      providers: [
        {provide: MatDialog, useValue: matDialog},
      ],
      declarations: [UserListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
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

  // it('should render user-list table', () => {
  //   // TODO: write unit test that expect user-list table show in app
    
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     let tableRows = fixture.nativeElement.querySelectorAll('tr');

  //     let headerRow = tableRows[0];
  //     expect(headerRow.cells[0].innerHTML).toBe('User Name');
  //     expect(headerRow.cells[1].innerHTML).toBe('Full Name');
  //     expect(headerRow.cells[2].innerHTML).toBe('Email');
  //     expect(headerRow.cells[3].innerHTML).toBe('Company');
  //     expect(headerRow.cells[4].innerHTML).toBe('Address');

  //     let row1 = tableRows[1];
  //     expect(row1.cells[0].innerHTML).toBe(mockUser1.username);
  //     expect(row1.cells[1].innerHTML).toBe(mockUser1.name);
  //     expect(row1.cells[2].innerHTML).toBe(mockUser1.email);
  //     expect(row1.cells[3].innerHTML).toBe(mockUser1.company);
  //     expect(row1.cells[4].innerHTML).toBe(mockUser1.address);


  //     done();
  //   });
  // });

  // it('should re-render user-list table every time user data append', () => {
  //   // TODO: write unit test that expect the count of user-list shown in table equal with data from localStorage
    
  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     let tableRows = fixture.nativeElement.querySelectorAll('tr');
  //     let row1 = tableRows[1];

  //     const userList = JSON.parse(localStorage.getItem('userList') || '{}');
  //     expect(row1.cells.length).toBe(userList.length);

  //     done();
  //   });
  // });
});

function done() {
  throw new Error('Function not implemented.');
}


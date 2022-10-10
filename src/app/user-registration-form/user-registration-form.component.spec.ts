import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { UserRegistrationFormComponent } from './user-registration-form.component';

describe('UserRegistrationFormComponent', () => {
  let component: UserRegistrationFormComponent;
  let fixture: ComponentFixture<UserRegistrationFormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      declarations: [UserRegistrationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all input field', () => {
    // TODO: write unit test that expect all input field has shown in app
    
    const usernameInput = fixture.debugElement.query(
      By.css('input[formControlName="username"]')
    );
    const nameInput = fixture.debugElement.query(
      By.css('input[formControlName="name"]')
    );
    const emailInput = fixture.debugElement.query(
      By.css('input[formControlName="email"]')
    );
    const companyInput = fixture.debugElement.query(
      By.css('input[formControlName="company"]')
    );
    const addressInput = fixture.debugElement.query(
      By.css('input[formControlName="address"]')
    );

    expect(usernameInput).toBeTruthy();
    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(companyInput).toBeTruthy();
    expect(addressInput).toBeTruthy();
  });

  it('should render "Cancel" and "Add" button ', () => {
    // TODO: write unit test that expect "Cancel" and "Add" button has shown in app
    
    const buttonCancel = fixture.debugElement.query(By.css('.userForm__button-cancel'));
    expect(buttonCancel).toBeTruthy();
    const buttonCancelElement: HTMLButtonElement = buttonCancel.nativeElement;
    expect(buttonCancelElement.textContent).toContain('Cancel');
    
    const buttonAdd = fixture.debugElement.query(By.css('.userForm__button-add'));
    expect(buttonAdd).toBeTruthy();
    const buttonAddElement: HTMLButtonElement = buttonAdd.nativeElement;
    expect(buttonAddElement.textContent).toContain('Add');
  });
});

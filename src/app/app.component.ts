import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserCreateModel } from './shared/model/user-create.model';
import { UserModel } from './shared/model/user.model';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ait-angular-jasmine-test';

  private subs!: Subscription[];

  public userListArray: UserModel[] = [];

  constructor(
		private dialog: MatDialog,
	) {
	}

  ngOnInit(): void {
		this.subs = [];
  }

  public showNewUserForm(user: any) {
    const subUserFormDialog = this.dialog
    .open(UserRegistrationFormComponent, {
        autoFocus: false,
				data: {
					user: {...user},
				},
        panelClass: 'userRegistrationDialog',
    })
    .afterClosed()
    .subscribe((resp) => {
      if (resp) {
        this.createUserService(resp);
      }
    });

    this.subs.push(subUserFormDialog);
  }

  private createUserService(user: UserModel) {
    const userData = new UserCreateModel().clone(user);
    this.userListArray.push(userData);
  }

  ngOnDestroy(): void {
		this.subs.forEach((sub) => sub.unsubscribe());
	}
}

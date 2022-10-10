import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserCreateModel } from './shared/model/user-create.model';
import { UserModel } from './shared/model/user.model';
import { UserService } from './shared/service/user/user.service';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ait-angular-jasmine-test';

  private subs!: Subscription[];

  public userListArray!: UserModel[];
  public userIDs!: number[];

  constructor(
		public dialog: MatDialog,
    private userService: UserService
	) {
	}

  ngOnInit(): void {
		this.subs = [];
		this.userIDs = [];
    this.userListArray = [];
    this.getUserList();
  }

  public getUserList() {
    const userList = JSON.parse(localStorage.getItem('userList') || '{}');
    if(userList.length > 0) {
      this.userService.userDatas = userList;
    } else {
      this.userService.getUsersService().subscribe(
        results => {
          if (!results) {
            return;
          }
          results.forEach((user) => {
              const idInt = user.id;
              this.userIDs.push(idInt);
              const userData = new UserCreateModel().clone(user);
              this.userListArray.push(userData);
              this.userService.userDatas = this.userListArray;
          });
        });
    }
  }

  public showNewUserForm(user: any) {
      const subUserFormDialog = this.dialog
      .open(UserRegistrationFormComponent, {
          autoFocus: false,
          data: {
            user: {...user},
            id: this.userIDs
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

  public createUserService(user: UserModel) {
    const userData = new UserCreateModel().clone(user);
    const idInt = userData.id;
    this.userIDs.push(idInt);
    this.userListArray.push(userData);
    this.userService.userDatas = this.userListArray;
  }

  ngOnDestroy(): void {
		this.subs.forEach((sub) => sub.unsubscribe());
	}
}

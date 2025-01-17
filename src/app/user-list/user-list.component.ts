import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { UserService } from '../shared/service/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private subs!: Subscription[];

  public dataSource = new MatTableDataSource();

  public userDataColumns = ['username', 'name', 'email', 'company', 'address'];
  
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.subs = [];
    this.fetchUserDatas();
  }

  fetchUserDatas() {
    const userSub = this.userService.userDatas$.subscribe((response) =>{
      this.dataSource.data = response;
    });

    this.subs.push(userSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((each) => each.unsubscribe());
  }
}

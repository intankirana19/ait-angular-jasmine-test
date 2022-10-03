import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../shared/model/user.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  
  @Input()
	public data!: UserModel[];

  public dataSource = new MatTableDataSource(this.data);

  columnsToDisplay = ['username', 'fullname', 'email', 'company', 'address'];
  
  constructor() { 
    this.dataSource.data = this.data;
  }

  ngOnInit(): void {
    console.log('this.data', this.data)
    console.log('this.dataSource', this.dataSource)
    this.dataSource.sort = this.sort;
  }


}

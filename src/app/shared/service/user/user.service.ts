import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(
    [],
  );

  userDatas$: Observable<UserModel[]> = this.userSubject.asObservable();

  constructor() { }

  set userDatas(value: UserModel[]) {
    this.userSubject.next(value);
  }

  get userDatas() {
    return this.userSubject.value;
  }

  clearUser() {
    this.userDatas = [];
  }
}

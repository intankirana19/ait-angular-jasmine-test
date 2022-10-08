import { HttpClient } from '@angular/common/http';
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

  idSubject: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    [],
  );

  idDatas$: Observable<number[]> = this.idSubject.asObservable();

  private userDataUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient
  ) { }

  getUsersService() {
    return this.http.get<UserModel[]>(this.userDataUrl);
  }

  set userDatas(value: UserModel[]) {
    this.userSubject.next(value);
    localStorage.setItem('userList', JSON.stringify(value));
  }

  get userDatas() {
    return this.userSubject.value;
  }

  set idDatas(value: number[]) {
    this.idSubject.next(value);
  }

  get idDatas() {
    return this.idSubject.value;
  }

  clearUser() {
    this.userDatas = [];
  }
}

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserModel } from '../shared/model/user.model';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  public user!: UserModel;

	public isLoading!: boolean;
	public userForm!: FormGroup;
	public validationMessages: any;

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
		public data: {
			user: UserModel,
      id: number[]
		},
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;
    this.initForm();
  }

  private initForm() {
    this.userForm = this.fb.group({
      username: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      company: [null, [Validators.required]],
      address: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._ ]+,[a-zA-Z0-9._ ]+,[a-zA-Z0-9._ ]+$")]]
    })
  }

  public closeDialog(status: boolean) {
		if (!status) {
			return this.dialogRef.close();
		}

		this.userForm.markAllAsTouched();

		if (!this.userForm.valid) {
			return;
		}

    let lastID = Math.max.apply(null, this.data.id)
    const currentID = lastID + 1;

    this.user.id = currentID;
		this.user.username = this.userForm.get('username')?.value;
		this.user.name = this.userForm.get('name')?.value;
		this.user.email = this.userForm.get('email')?.value;
		this.user.company = { 
      name: this.userForm.get('company')?.value,
      bs: '',
      catchPhrase: ''
    };

    let addressArray: any = [];
    addressArray = this.userForm.get('address')?.value.split(',');
    this.user.address = {
      street: addressArray[0],
      suite: addressArray[1],
      city: addressArray[2],
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    };
		this.dialogRef.close(this.user);
	}
}

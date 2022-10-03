export class UserCreateModel {
    public username!: string;
    public fullname!:  string;
    public email!:  string;
    public company!:  string;
    public address!:  string;

	public clone(dto: any): UserCreateModel {
		if (dto.username) {
			this.username = dto.username;
		}
		if (dto.fullname) {
			this.fullname = dto.fullname;
		}
		if (dto.email) {
			this.email = dto.email;
		}
		if (dto.company) {
			this.company = dto.company;
		}
		if (dto.address) {
			this.address = dto.address;
		}

		return this;
	}

    public convert(): any {
        return {
            username: this.username,
            fullname:  this.fullname,
            email:  this.email,
            company:  this.company,
            address:  this.address
        }
    }
}

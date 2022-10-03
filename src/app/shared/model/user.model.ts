export class UserModel {
    public username!: string;
    public fullname!:  string;
    public email!:  string;
    public company!:  string;
    public address!:  string;

	public convert(dto: any): UserModel {
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
}

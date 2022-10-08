export class GeoModel {
	public lat!: string;
	public lng!: string;
}

export class AddressModel {
	public street!: string;
	public suite!: string;
	public city!: string;
	public zipcode!: string;
	public geo!: GeoModel;

}

export class CompanyModel {
	public name!: string;
	public catchPhrase!: string;
	public bs!: string;
}

export class UserModel {
    public id!: number;	
	public name!: string;	
	public username!: string;	
	public email!: string;	
	public address!: AddressModel;	
	public phone!: string;	
	public website!: string;	
	public company!: CompanyModel;	


	public convert(dto: any): UserModel {
		if (dto.id) {
			this.id = dto.id;
		}
		if (dto.name) {
			this.name = dto.name;
		}
		if (dto.username) {
			this.username = dto.username;
		}
		if (dto.email) {
			this.email = dto.email;
		}
		if (dto.address) {
			this.address = dto.address;
		}
		if (dto.phone) {
			this.phone = dto.phone;
		}
		if (dto.website) {
			this.website = dto.website;
		}
		if (dto.company) {
			this.company = dto.company;
		}

		return this;
	}
}

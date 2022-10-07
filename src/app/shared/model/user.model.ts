export class GeoModel {
	public lat!: string;
	public lng!: string;

	public convert(dto: any): GeoModel {
		if	(dto.lat) {
			this.lat = dto.lat;
		}
		if	(dto.lng) {
			this.lng = dto.lng;
		}
	
		return this;
	}
}

export class AddressModel {
	public street!: string;
	public suite!: string;
	public city!: string;
	public zipcode!: string;
	public geo!: GeoModel;

	public convert(dto: any): AddressModel {
		if	(dto.street) {
			this.street = dto.street;
		}
		if	(dto.suite) {
			this.suite = dto.suite;
		}
		if	(dto.city) {
			this.city = dto.city;
		}
		if	(dto.zipcode) {
			this.zipcode = dto.zipcode;
		}
		if	(dto.geo) {
			this.geo = dto.geo;
		}
	
		return this;
	}

}

export class CompanyModel {
	public name!: string;
	public catchPhrase!: string;
	public bs!: string;	

	public convert(dto: any): CompanyModel {
		if	(dto.name) {
			this.name = dto.name;
		}
		if	(dto.catchPhrase) {
			this.catchPhrase = dto.catchPhrase;
		}
		if	(dto.bs) {
			this.bs = dto.bs;
		}
	
		return this;
	}
}

export class UserModel {
    public id!: string;	
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

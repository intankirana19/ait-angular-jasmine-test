export class GeoCreateModel {
	public lat!: string;
	public lng!: string;

	public clone(dto: any): GeoCreateModel {
		if	(dto.lat) {
			this.lat = dto.lat;
		}
		if	(dto.lng) {
			this.lng = dto.lng;
		}
	
		return this;
	}

	public convert(): any {
        return {
            lat: this.lat,
            lng:  this.lng
        }
    }
}

export class AddressCreateModel {
	public street!: string;
	public suite!: string;
	public city!: string;
	public zipcode!: string;
	public geo!: GeoCreateModel;

	public clone(dto: any): AddressCreateModel {
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

	public convert(): any {
        return {
            street: this.street,
            suite:  this.suite,
            city:  this.city,
            zipcode:  this.zipcode,
            geo:  this.geo
        }
    }

}

export class CompanyCreateModel {
	public name!: string;
	public catchPhrase!: string;
	public bs!: string;	

	public clone(dto: any): CompanyCreateModel {
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

	public convert(): any {
        return {
            name: this.name,
            catchPhrase:  this.catchPhrase,
            bs:  this.bs
        }
    }
}

export class UserCreateModel {
    public id!: number;	
	public name!: string;	
	public username!: string;	
	public email!: string;	
	public address!: AddressCreateModel;	
	public phone!: string;	
	public website!: string;	
	public company!: CompanyCreateModel;	


	public clone(dto: any): UserCreateModel {
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

	public convert(): any {
        return {
            id: this.id,
			name:  this.name,
            username: this.username,
            email:  this.email,
			address:  this.address,
			phone:  this.phone,
			website:  this.website,
            company:  this.company,
        }
    }
}

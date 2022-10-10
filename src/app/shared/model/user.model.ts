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
}

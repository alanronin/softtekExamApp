import { ICourse } from 'app/shared/model/course.model';

export interface IStudent {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  countryCode?: number;
  languageCode?: number;
  contactPhone?: number;
  courses?: ICourse[];
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public addressLine?: string,
    public city?: string,
    public state?: string,
    public countryCode?: number,
    public languageCode?: number,
    public contactPhone?: number,
    public courses?: ICourse[]
  ) {}
}

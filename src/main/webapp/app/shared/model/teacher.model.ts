import { ICourse } from 'app/shared/model/course.model';

export interface ITeacher {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  countryCode?: number;
  languageCode?: number;
  phone?: number;
  courses?: ICourse[];
}

export class Teacher implements ITeacher {
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
    public phone?: number,
    public courses?: ICourse[]
  ) {}
}

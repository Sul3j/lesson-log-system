import {User} from "./user.model";

export class Student {
  id!: number;
  firstName!: string;
  lastName!: string;
  pesel!: string;
  phoneNumber!: string;
  email!: string;
  className!: string;
  classYear!: number;
  classId!: number;
  tutorFirstName!: string;
  tutorLastName!: string;
  user!: User;
}

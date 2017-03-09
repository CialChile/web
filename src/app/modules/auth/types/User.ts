import {Role} from './Role'


export class User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  roles?: Role[];
  permissions?: any[];
  isSuperUser?: boolean;
  rut_passport?: string;
  position?: string;
  birthday?: string;
  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  address?: string;
  telephone?: string;
  emergency_telephone?: string;
  emergency_contact?: string;
  medical_information?: string;
}

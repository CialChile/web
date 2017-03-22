import {Role} from './Role'

export class User {
  public id?: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public roles?: Role[];
  public permissions?: any[];
  public isSuperUser?: boolean;
  public rut_passport?: string;
  public position?: string;
  public birthday?: string;
  public country?: string;
  public state?: string;
  public city?: string;
  public zip_code?: string;
  public address?: string;
  public telephone?: string;
  public emergency_telephone?: string;
  public emergency_contact?: string;
  public medical_information?: string;
  public image?: string | null;
  public thumb?: string | null;
}

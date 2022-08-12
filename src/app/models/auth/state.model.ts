import { PROFILE } from './user.model';
import { REGISTER_FORM_DATA } from './auth-forms.model';

export interface USERINFOSTATE{
    profiles: PROFILE[];
    users: REGISTER_FORM_DATA[];
}
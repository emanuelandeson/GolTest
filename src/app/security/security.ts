import { User } from '../models/user.model';
import { SecurityKey } from './securityKey';

export class Security {
    public static set(usuario: User) {
        const data = JSON.stringify(usuario);
        localStorage.setItem(SecurityKey.Data, btoa(data));
    }

    public static get(): User {
        const data = localStorage.getItem(SecurityKey.Data);
        if (data)
            return JSON.parse(atob(data));
        else
            return null;
    }

    public static hasToken(): boolean {
        const user = this.get();

        if (user && user.token)
            return true;

        return false;
    }

    public static clear() {
        localStorage.removeItem(SecurityKey.Data);
    }
}
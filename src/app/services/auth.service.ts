import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Security } from '../security/security';
import { SecurityKey } from '../security/securityKey';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  canActivate() {
    const token = Security.hasToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


  logout() {
    localStorage.removeItem(SecurityKey.Data);
    this.router.navigate(['/login']);
  }
}
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Security } from 'src/app/security/security';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  name: string;

  constructor(private service: AuthService) {
    let usuario = Security.get();
    if (usuario)
      this.name = usuario.name;

  }

  ngOnInit(): void {
  }

  logout() {
    this.service.logout();
  }
}

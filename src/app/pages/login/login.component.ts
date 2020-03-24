import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/security/security';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Errors } from 'src/app/Util/errors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public busy: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private service: DataService, private toastr: ToastrService) {
    this.form = this.fb.group({
      Username: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.required,
      ])],
      Password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required,
      ])]
    });
  }

  ngOnInit(): void {
  }

  enviar() {
    this.busy = true;

    this.service.authenticate(this.form.value)
      .subscribe((result) => {
        this.busy = false;
        this.setData(result);
        this.router.navigate(['/']);
      }, err => {
        var ex = Errors.sanitiseError(err);
        this.showError(ex.message);

        this.busy = false;
      });
  }

  showError(message) {
    this.toastr.error('Opps!', message);
  }

  async setData(usuario: User) {
    Security.set(usuario);
  }
}

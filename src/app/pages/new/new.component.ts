import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Errors } from 'src/app/Util/errors';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public form: FormGroup;
  public busy: boolean;
  public minDate = moment(new Date()).format('YYYY-MM-DD');
  public minTime = moment(new Date()).format('HH:mm');

  constructor(private router: Router, private fb: FormBuilder, private service: DataService, private toastr: ToastrService) {
    this.form = this.fb.group({
      Name: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ])],
      Date: [this.minDate, Validators.compose([
        Validators.required,
      ])],
      Time: [this.minTime, Validators.compose([
        Validators.required,
      ])],
      Origin: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(55),
        Validators.required,
      ])],
      Destination: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(55),
        Validators.required,
      ])],
    });
  }

  submit() {
    this.busy = true;

    this.service.createTrip(this.form.value)
      .subscribe(res => {
        this.toastr.success("Success", "Successfully done");

        this.busy = false;
        this.router.navigateByUrl("/");
      }, err => {
        var ex = Errors.sanitiseError(err);

        this.showError(ex.message);
        this.busy = false;
      });
  }

  showError(message) {
    this.toastr.error('Opps!', message);
  }

  ngOnInit(): void {
  }
}

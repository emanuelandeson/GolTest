import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Errors } from 'src/app/Util/errors';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  public trips: any[] = null;
  public busy: boolean = false;

  constructor(private service: DataService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.busy = true;

    this.service.getTrips().subscribe((data: any) => {
      this.trips = data;
      this.busy = false;
    }, err => {
      var ex = Errors.sanitiseError(err);
      this.showError(ex.message);
      this.busy = false;
    });
  }

  showError(message) {
    this.toastr.error('Opps!', message);
  }
}

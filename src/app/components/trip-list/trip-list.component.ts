import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Trip } from 'src/app/models/trip.model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from 'src/app/Util/errors';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  @Input() trips: Trip[] = null;
  busy = false;

  public form: FormGroup;

  mindate = new Date();
  oldValue: Trip = null;
  areEdinting: boolean = false;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private service: DataService, private router: Router) {

    this.form = this.fb.group({
      Id: "",
      Name: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.required,
      ])],
      Date: ['', Validators.compose([
        Validators.required,
      ])],
      Time: ['', Validators.compose([
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

  ngOnInit(): void {
  }

  remove(trip: Trip) {
    this.service.delete(trip.id).subscribe(data => {
      this.toastr.success("Success", "Successfully done");

      this.service.getTrips().subscribe(data => {
        this.trips = data;
      });
    }, err => {
      this.showError(err.message);
      this.busy = false;
    })
  }

  cancel() {
    let trip = this.oldValue;
    this.areEdinting = false;
    this.setFormFields(trip);

    this.trips.map(x => {
      if (x.id == trip.id) {
        this.oldValue = null;
        x.editing = false;
        x.date = trip.date;
        x.time = trip.time;
        x.origin = trip.origin;
        x.name = trip.name;
        x.destination = trip.destination;
      }
    })
  }


  edit(trip: Trip) {

    this.oldValue = new Trip(trip.id, trip.name, trip.date, trip.time, trip.origin, trip.destination);
    this.setFormFields(trip);

    this.trips.map(x => {
      if (x.id == trip.id) {
        x.editing = true
        this.areEdinting = true;
      }
      else
        x.editing = false
    })
  }

  save(trip: Trip) {
    this.setFormFields(trip);

    if (this.form.invalid)
      return;

    this.service.updateTrip(trip).subscribe(data => {
      this.toastr.success("Success", "Successfully done");

      this.service.getTrips().subscribe(data => {
        this.trips = data;
      });
    }, err => {
      var ex = Errors.sanitiseError(err);

      this.showError(ex.message);
      this.busy = false;
    })

    this.areEdinting = false;
  }

  showError(message) {
    this.toastr.error('Opps!', message);
  }

  private setFormFields(trip: Trip) {
    this.form.setValue({
      Name: trip.name,
      Date: trip.date,
      Time: trip.time,
      Origin: trip.origin,
      Destination: trip.destination,
      Id: trip.id
    });
  }
}
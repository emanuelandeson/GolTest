import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trip } from '../models/trip.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { version } from 'punycode';
import { Result } from '../models/result.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public composeHeaders() {
    const token = localStorage.getItem('gol.token');
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  authenticate(data) {
    return this.http.post<any>(`${this.url}/auth`, data).pipe(map(resp => {
      let user = null;

      if (resp && resp.data)
        user = new User(resp.data.id, resp.data.user.name, resp.data.token);

      return user;
    }));
  }

  createTrip(data) {
    return this.http.post(`${this.url}/trip`, data);
  }

  updateTrip(data) {
    return this.http.put(`${this.url}/trip`, data);
  }

  delete(data) {
    return this.http.delete(`${this.url}/trip/${data}`);
  }

  getTrips() {
    return this.http.get<Result<Trip[]>>(`${this.url}/trip`).pipe(
      map(resp => {
        let trips = [];

        resp.data.map(x => {
          trips.push(new Trip(x.id, x.name, x.date, x.time, x.origin, x.destination));
        })

        return trips;
      }));
  }
}
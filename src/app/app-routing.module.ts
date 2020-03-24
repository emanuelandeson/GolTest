import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewComponent } from './pages/new/new.component';
import { TripsComponent } from './pages/trips/trips.component';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  { path: "login", component: LoginComponent },

  {
    path: "",
    canActivate: [AuthService],
    component: HomeComponent, children: [
      { path: '', component: TripsComponent },
      { path: 'new', component: NewComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

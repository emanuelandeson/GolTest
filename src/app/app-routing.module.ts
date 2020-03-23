import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TravelsComponent } from './pages/travels/travels.component';
import { NewComponent } from './pages/new/new.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "", component: HomeComponent, children: [
      { path: '', component: TravelsComponent },
      { path: 'new', component: NewComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

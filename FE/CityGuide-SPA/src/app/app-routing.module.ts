import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityAddComponent } from './city/city-add/city-add.component';

const routes: Routes = [
  { path: 'city', component: CityComponent },
  { path: 'cityadd', component: CityAddComponent },
  { path: 'cityDetail/:cityId', component: CityDetailComponent },
  { path: '**', redirectTo: 'city', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

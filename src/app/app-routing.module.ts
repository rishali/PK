import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GuessComponent } from './components/guess/guess.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'guess', component:GuessComponent },
  {path:'result', component:ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

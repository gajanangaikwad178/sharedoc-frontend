import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helper/auth.guard';
import { TandCComponent } from './login/tand-c/tand-c.component';

const dashboardModule = () => import('./dashboard/dashboard.module').then(x => x.DashboardModule);

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', loadChildren: dashboardModule, canActivate: [AuthGuard] },
  { path: 'TandCComponent', component: TandCComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

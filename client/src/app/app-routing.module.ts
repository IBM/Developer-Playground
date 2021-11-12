import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { ThemeComponent } from './pages/theme/theme.component';
import { HomeComponent } from './pages/home/home.component';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'analytics', component: AnalyticsComponent},
      { path: 'theme', component: ThemeComponent },
      { path: 'secure/configurations', component: ConfigurationsComponent, canActivate: [AuthGuard] },
      { path: '**', component: HomeComponent }
      // { path: '', component: ConfigurationsComponent, pathMatch: 'full' },
      // { path: 'home', component: HomeComponent},
      // { path: 'analytics', component: AnalyticsComponent},
      // { path: 'theme', component: ThemeComponent },
      // { path: '**', component: ConfigurationsComponent }
    ], { useHash: true, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  constructor(private router: Router) {
  	this.router.errorHandler = (error: any) => {
  		this.router.navigate(['404']); // or redirect to default route
  	}
  }
}

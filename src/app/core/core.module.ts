import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { httpInterceptorProviders } from './interceptors';
import { LoadingSpinner } from '../shared/components';


@NgModule({
  declarations: [LoadingSpinner],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    OverlayModule,
    MatProgressSpinnerModule,
  ],
  providers:[CookieService, httpInterceptorProviders],
})
export class CoreModule { }

import '@angular/compiler';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, DatePipe } from '@angular/common';
import { HomeRoutingModule } from './pages/home-routing.module';
import { BaseInterceptor } from './Interceptor/base.interceptor';
import { ErrorInterceptor } from './Interceptor/error.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticModule } from '../app/pages/statistic/statistic.module';
import { MockModule } from './mock/mock.module';
import { environment } from 'src/environments/environment.mock';

let extraModules = environment.mockApi ? [MockModule] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    StatisticModule,
    extraModules
  ],


  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US },
    DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }

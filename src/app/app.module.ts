import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { ImagesViewComponent } from './images-view/images-view.component';
import { LoginComponent } from './login/login.component';

import { AdminService} from './admin.service';

import { AlertModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    BlogCreateComponent,
    BlogViewComponent,
    ImagesViewComponent,
    LoginComponent
  ],
  imports: [
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      { path: 'login', component: LoginComponent },
      { path: 'blogs', component: BlogViewComponent },
      { path: 'create', component: BlogCreateComponent },
      { path: 'images', component: ImagesViewComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

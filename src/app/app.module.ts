import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router'
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { ImagesViewComponent } from './images-view/images-view.component';
import { LoginComponent } from './login/login.component';

import { AdminService} from './admin.service';

import { AlertModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { TinymceModule } from 'angular2-tinymce';
import {ImageUploadModule} from 'angular2-image-upload';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    BlogCreateComponent,
    BlogViewComponent,
    ImagesViewComponent,
    LoginComponent
  ],
  imports: [
    ImageUploadModule.forRoot(),
    FormsModule,
    TinymceModule.withConfig({}),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
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
      { path: 'create/:id', component: BlogCreateComponent },
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

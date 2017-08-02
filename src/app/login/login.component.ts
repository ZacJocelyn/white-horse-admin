import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from '../../environments/environment';
import { AlertModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';

  public alert_message: string;
  public alert_type = 'danger';

  public isProduction = environment.production;

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService) {
  }

  ngOnInit() {
  }

  public submit() {

    this.adminService
      .postAdminLogin(this.email, this.password)
      .subscribe(
      (res) => {
        this.adminService.apiKey = res.token;
        const newLink = ['/blogs'];
        this.router.navigate(newLink);
      },
      (error) => {
        this.alert_message = "Login failed. Please try again";
      }
      );
  }

  public skip() {
    this.email = 'vapedenver@gmail.com';
    this.password = 'whitehorseDenver2017';
    this.submit();
  }

}

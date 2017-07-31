import { Component, OnInit , ViewChild } from '@angular/core';
import {AdminService} from '../admin.service';
import {ActivatedRoute, Router} from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  @ViewChild(ModalDirective) public staticModal: ModalDirective;

  public posts: any;

  public postToDelete: string;
  public postToDeleteIndex: number;

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    if (!this.adminService.apiKey) {
      const newLink = ['/login'];
      this.router.navigate(newLink);
    }

    this.adminService
      .getBlogPosts()
      .subscribe(
      (res) => {
        console.log( res );
        this.posts = res;
      },
      (error) => {

      }
      );
  }

  goEditPost( id: number ){
    const newLink = ['/create/' + id];
    this.router.navigate(newLink);
  }

  onDeleteButtonClick(id:string , index:number){
    this.postToDelete = id;
    this.postToDeleteIndex = index;
    this.staticModal.show();
  }

  deletePost(){
    this.adminService
      .deleteBlog( this.postToDelete )
      .subscribe(
      (res) => {
        console.log( res );
        console.log( this.postToDelete );
        console.log( this.postToDeleteIndex );
        this.posts.slice( this.postToDeleteIndex , 1 );
        console.log( this.posts );
        this.staticModal.hide();
      },
      (error) => {
        this.staticModal.hide();
      }
      );
  }

}

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

  public posts = [];

  public postToDelete: string;
  public postToDeleteIndex: number;

  public modalText: string;
  public isInfoModal: boolean;

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
        this.posts = res;
      },
      (error) => {
        this.modalText = 'Error: failed to retrieve the blog posts.';
        this.isInfoModal = true;
        this.staticModal.show();
      }
      );
  }

  goEditPost( id: number ){
    const newLink = ['/create/' + id];
    this.router.navigate(newLink);
  }

  onDeleteButtonClick(id:string , index:number){
    this.modalText = 'Are you sure you want to delete this post?';
    this.isInfoModal = false;
    this.postToDelete = id;
    this.postToDeleteIndex = index;
    this.staticModal.show();
  }

  deletePost(){

    this.adminService
      .deleteBlog( this.postToDelete )
      .subscribe(
      (res) => {
        this.posts.splice( this.postToDeleteIndex , 1 );
        this.staticModal.hide();
      },
      (error) => {
        this.modalText = 'Error: failed to delete the post';
        this.isInfoModal = true;
      }
      );
  }

}

import { Component, OnInit , ViewChild } from '@angular/core';
import {AdminService} from '../admin.service';
import {ActivatedRoute, Router} from '@angular/router';

import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

@ViewChild(ModalDirective) public staticModal: ModalDirective;

  public title = '';
  public author = '';
  public content = '';
  public image_url = '';

  public authToken = 'bearer ' + this.adminService.apiKey;
  public authHeaders = [{ header: 'Authorization', value: this.authToken }];

  private sub: any
  public blogId: string;

  public isEditing = false;

  public modalText: string;
  public isInfoModal: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    if (!this.adminService.apiKey) {
      const newLink = ['/login'];
      this.router.navigate(newLink);
    }

    else {
      this.sub = this.route.params.subscribe(params => {
        this.blogId = params['id'];

        if (this.blogId) {
          this.isEditing = true;
          this.getBlogPost(this.blogId);
        }
      });
    }

  }

  imageUploaded(event) {
    let res = JSON.parse(event.serverResponse._body);
    this.image_url = res.image_url;
  }

  createPost() {
    if (this.isEditing) {
      this.adminService
        .updateBlog(this.blogId, this.title, this.author, this.content, this.image_url)
        .subscribe(
        (res) => {
          this.modalText = 'Successfully updated post.';
          this.isInfoModal = true;
          this.staticModal.show();
        },
        (error) => {
          this.modalText = 'Error: Could not update post with changes';
          this.isInfoModal = true;
          this.staticModal.show();
        }
        );
    }

    else {
      this.adminService
        .postNewBlog(this.title, this.author, this.content, this.image_url)
        .subscribe(
        (res) => {
          this.modalText = 'Successfully created new post.';
          this.isInfoModal = true;
          this.staticModal.show();
        },
        (error) => {
          this.modalText = 'Error: Could not create new post.';
          this.isInfoModal = true;
          this.staticModal.show();
        }
        );
    }
  }

  getBlogPost(id: string) {
    this.adminService
      .getBlogPost(id)
      .subscribe(
      (res) => {
        this.title = res[0].title;
        this.author = res[0].author;
        this.content = res[0].body;
        this.image_url = res[0].image_url;
      },
      (error) => {
        this.modalText = 'Error: Could not get post data';
        this.isInfoModal = true;
        this.staticModal.show();
      }
      );
  }

  onOkButtonClick(){
    this.staticModal.hide();
    const newLink = ['/blogs'];
    this.router.navigate(newLink);
  }

}

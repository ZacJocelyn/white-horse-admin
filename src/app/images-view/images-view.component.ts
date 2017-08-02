import { Component, OnInit , ViewChild } from '@angular/core';
import {AdminService} from '../admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-images-view',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.css']
})
export class ImagesViewComponent implements OnInit {

  public home_page_images = [];

  public isEditing = false;
  public currentImage: any;
  public currentImageIndex: number;
  public previousImageUrl: string;

  public isPostButtonDisabled = false;
  public modalText: string;

  public authToken = 'bearer ' + this.adminService.apiKey;
  public authHeaders = [{ header: 'Authorization', value: this.authToken }];

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService) { }

  @ViewChild(ModalDirective) public staticModal: ModalDirective;

  ngOnInit() {
    if (!this.adminService.apiKey) {
      const newLink = ['/login'];
      this.router.navigate(newLink);
    }

    this.adminService
      .getHomeImages()
      .subscribe(
      (images) => {
        this.home_page_images = images;
      }
      );
  }

  onEditButtonClick( index: number ){
    this.currentImage = this.home_page_images[index];
    this.previousImageUrl = this.currentImage.image_url;
    this.currentImage.image_url = '';
    this.currentImageIndex = index;
    this.isEditing = true;
  }

  updateImage(){
    this.isPostButtonDisabled = true;

    this.adminService
      .updateHomeImage( this.currentImage.id , this.currentImage.title , this.currentImage.image_url )
      .subscribe(
      (image) => {
        this.currentImage.image_url = image.image_url;
        this.home_page_images[this.currentImageIndex] = this.currentImage;
        this.isPostButtonDisabled = false;
        this.modalText = 'The image was successfully updated';
        this.staticModal.show();
      },(err)=>{
        this.modalText = 'Error: the image failed to update';
        this.staticModal.show();
      }
      );
  }

  imageUploaded(event) {
    let res = JSON.parse(event.serverResponse._body);
    this.currentImage.image_url = res.image_url;
  }

  onOkButtonClick(){
    this.staticModal.hide();
    this.isEditing = false;
  }

  onGoBackButtonClick(){
    this.isEditing = false;
  }

}

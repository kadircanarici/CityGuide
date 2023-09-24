import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { City } from 'src/app/models/city';
import { CityService } from 'src/services/city.service';
// import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cityService: CityService) { }

  city!: City;
  photos: Photo[] = [];

  // galleryOptions: NgxGalleryOptions[] = [];
  // galleryImages: NgxGalleryImage[] = [];
  images:string[]=[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getCityById(params["cityId"]);
      this.getPhotosByCity(params["cityId"]);

    })
  }
  getCityById(cityId: number) {
    this.cityService.getCityById(cityId).subscribe(data => {
      this.city = data;
    })
  }
  getPhotosByCity(cityId: number) {
    this.cityService.getPhotosByCity(cityId).subscribe(data => {
      this.photos = data;
      this.getImages();
      // this.setGallery();
    })
  }

  getImages() {
    // const imageUrls = [];
    for (let i = 0; i < this.city.photos.length; i++) {
      this.images.push(this.city.photos[i].url);
      // imageUrls.push({
      //   small: this.city.photos[i].url,
      //   mdeium: this.city.photos[i].url,
      //   big: this.city.photos[i].url
      // })
    }
    console.log(this.images);
    
    return this.images;
  }

  // setGallery() {
  //   this.galleryOptions = [
  //     {
  //       width: '600px',
  //       height: '400px',
  //       thumbnailsColumns: 4,
  //       imageAnimation: NgxGalleryAnimation.Slide
  //     },
  //     // max-width 800
  //     {
  //       breakpoint: 800,
  //       width: '100%',
  //       height: '600px',
  //       imagePercent: 80,
  //       thumbnailsPercent: 20,
  //       thumbnailsMargin: 20,
  //       thumbnailMargin: 20
  //     },
  //     // max-width 400
  //     {
  //       breakpoint: 400,
  //       preview: false
  //     }
  //   ];

  //   this.galleryImages = this.getImages();
  // }

}

import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  public newRoomScenes: any;
  ngOnInit(): void {
  }

  constructor(private route: ActivatedRoute, public apicallService: ApicallService) {
    this.getHomePageHeroSlider();
  }

  getHomePageHeroSlider() {
    this.apicallService.getHomePageHero().subscribe({
      next: (httpResponse: any) => {
        this.newRoomScenes = httpResponse
        console.log(this.newRoomScenes)
      },

      error: (error: any) => {
        console.log('Error', error);
      },
      complete: () => {

      },
    });
  }
}







import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  loading = false;
  public routerUrl: any;
  public getAboutUsData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apicallService: ApicallService,
  ) {
    this.routerUrl = this.router.url;
    this.getBasicPageData();

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getBasicPageData() {
    this.loading = true;
    this.apicallService.getBasicPageData("about-us").subscribe({
      next: (httpResponse: any) => {
        this.getAboutUsData = httpResponse;
        console.log('Aboutus Data', this.getAboutUsData);
        this.loading = false;
      },

      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      },
    });
  }

}

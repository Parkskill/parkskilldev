import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ApicallService } from '../shared/apicall.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  loading = false;
  public routerUrl: any;
  public getFAQData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apicallService: ApicallService,
    private formBuilder: FormBuilder
  ) {
    this.routerUrl = this.router.url;
    this.getBasicPageData();

  }


  getBasicPageData() {
    this.loading = true;
    this.apicallService.getBasicPageData("faq").subscribe({
      next: (httpResponse: any) => {
        this.getFAQData = httpResponse;
        console.log('FAQ Data', this.getFAQData);
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

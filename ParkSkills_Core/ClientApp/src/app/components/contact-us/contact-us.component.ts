import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
loading = false;
  public routerUrl: any;
  public getContactUsData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    public apicallService: ApicallService,
  ) {
    this.routerUrl = this.router.url;
    this.getBasicPageData();

  }

  sanitizeHTML(html: string): SafeHtml {

    return this.sanitizer.bypassSecurityTrustHtml(html);

  }



  ngOnInit(): void {}

  getBasicPageData() {
    this.loading = true;
    this.apicallService.getBasicPageData("contact-us").subscribe({
      next: (httpResponse: any) => {
        this.getContactUsData = httpResponse;
        console.log('Contact Data', this.getContactUsData);
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

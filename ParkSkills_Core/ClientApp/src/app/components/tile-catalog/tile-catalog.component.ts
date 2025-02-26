import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'tile-catalog',
  templateUrl: './tile-catalog.component.html',
  styleUrls: ['./tile-catalog.component.scss']
})
export class TileCatalogComponent implements OnInit {
  public catalogList: any = {};
  public routerUrl: any;
  public getCatalogData: any;
  loading = false;

  catalogLoading = true;
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) { 
    this.getCatalogs()
    this.getBasicPageData();

  }
  ngOnInit(): void {
  }


  getBasicPageData() {
    this.loading = true;
    this.apicallService.getBasicPageData("catalog").subscribe({
      next: (httpResponse: any) => {
        this.getCatalogData = httpResponse;
        console.log('FAQ Data', this.getCatalogData);
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


  getCatalogs() {
    this.apicallService
      .getCatalogs()
      .subscribe({
        next: (httpResponse:any) => {
          this.catalogList = httpResponse;
        },
        error: (error:any) => {},
        complete: () => {
          this.catalogLoading = false;
        },
      });
  }

}

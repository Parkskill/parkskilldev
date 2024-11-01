import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-product-collectiongallerysearch',
  templateUrl: './product-collectiongallerysearch.component.html',
  styleUrls: ['./product-collectiongallerysearch.component.scss'],
})
export class ProductCollectiongallerysearchComponent implements OnInit {
  ngOnInit(): void {}

  loading = false;
  filtered: any = [];
  getFilterTags: any
  public noResults: any = false;
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) {
    this.getSearchResults()
    // this.getSearchFilters()
  }


  getSearchResults(value?: any) {
    this.loading = true;
    this.noResults = false;
     this.apicallService.getSearchAPI(value).subscribe({
      next: (httpResponse) => {
       this.filtered = httpResponse;
       console.log()
        if (this.filtered.length === 0) {

          this.noResults = true;
        }
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

  getSearchFilters(value?: any) {
    this.loading = true;
     this.apicallService.getSearchAPIFilters(value).subscribe({
      next: (httpResponse) => {
       this.getFilterTags = httpResponse;
       console.log(this.getFilterTags)
        
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

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
  catalogLoading = true;
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) { 
    this.getCatalogs()
  }
  ngOnInit(): void {
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

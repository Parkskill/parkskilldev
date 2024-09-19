import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-product-collectiongallerysearch',
  templateUrl: './product-collectiongallerysearch.component.html',
  styleUrls: ['./product-collectiongallerysearch.component.css']
})
export class ProductCollectiongallerysearchComponent implements OnInit {


  ngOnInit(): void {
  }
  public tilesCollection: any = {};
  constructor(private route: ActivatedRoute, public apicallService: ApicallService) {
    this.apicallService.getAllTiles().subscribe(
      {
        next: (httpResponse) => {
          debugger;
          console.log('tilesdata', httpResponse)
          this.tilesCollection = JSON.parse(httpResponse);
        },

        error: (error) => {
          console.log('Error', error)
        },
        complete: () => {
          console.log('Completed')
        }
      }
    );
  }
}

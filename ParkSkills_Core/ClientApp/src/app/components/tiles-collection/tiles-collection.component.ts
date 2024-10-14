import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-tiles-collection',
  templateUrl: './tiles-collection.component.html',
  styleUrls: ['./tiles-collection.component.scss']
})
export class TilesCollectionComponent implements OnInit {

  ngOnInit(): void {
  }
  
  loading = true;
  public tileDetails:any;
  displayStyle = "none"; 

  public tilesCollection: any = [];
  public searchFilters: any = [];
  public noResults: any = [];
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) {
    this.getAllTiles();
  }

  openPopup(value:any) { 
    this.tileDetails = value
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 

  getAllTiles() {
    this.loading = true;
    this.apicallService.getNewTiles().subscribe({
      next: (httpResponse) => {
        this.tilesCollection = httpResponse;
      },
      error: (error) => {},
      complete: () => {
        this.loading = false;
      },
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-tiles-collection',
  templateUrl: './tiles-collection.component.html',
  styleUrls: ['./tiles-collection.component.scss']
})
export class TilesCollectionComponent implements OnInit {

  ngOnInit(): void {
  }
  
  onRedirect(linkUrl:any) {
    this.router.navigate([`/CollectionGalleryItem/${linkUrl.title}`]); 
  }
  
  loading = true;
  public tileDetails:any;
  displayStyle = "none"; 

  public tilesCollection: any = [];
  public searchFilters: any = [];
  public noResults: any = [];
  public routerUrl:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apicallService: ApicallService
  ) {
    console.log("this.", this.router.url)
     this.routerUrl = this.router.url

    this.getTileCollection();
  }


  openPopup(value:any) { 
    this.tileDetails = value
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 

  getTileCollection() {
    this.loading = true;
    this.apicallService.getTileCollection().subscribe({
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

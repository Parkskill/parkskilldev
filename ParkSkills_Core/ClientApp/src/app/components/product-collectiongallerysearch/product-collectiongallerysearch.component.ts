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

  loading = true
  filtered: any = [];
  searching = false

  public tilesCollection: any = {};
  public searchFilters: any = {};
  public noResults: any = {}
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) {
    this.filtered = this.getAllTiles()
    this.getFilters()
    console.log(this.filtered)
  }

  // For search 
  onSubmit(value: any) {
    this.loading = true
    this.searching = true
    setTimeout(() => {
      this.getAllTiles() 
      this.filtered = this.tilesCollection.filter( 
        (tile: any) => tile?.pst_name.toLowerCase().includes(value.reg.toLowerCase())
      );
      this.loading = false
    }, 2000);
  }

  // For click filters
  onFilterClick(value: any) {
    this.searching = true
    this.noResults = false
    this.loading = true
    setTimeout(() => {
      this.getAllTiles() 
      this.filtered = this.tilesCollection.filter( 
        (tile: any) => tile?.pst_name.toLowerCase().includes(value.toLowerCase())
      );
      if(this.filtered = []) {
        console.log("123 no results")
        this.noResults = true
      }
    }, 2000);
   
  }

  getAllTiles() {
    this.loading = true
    this.apicallService.getAllTiles().subscribe({
      next: (httpResponse) => {
        this.tilesCollection = httpResponse;
        
      },

      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
        this.loading = false
        console.log('Completed');
      },
    });
  }
  
  getFilters() {
    this.apicallService.getAllTiles().subscribe({
      next: (httpResponse) => {
        this.searchFilters = httpResponse;
        console.log(this.searchFilters)
      },

      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
        this.loading = false
        console.log('Completed');
      },
    });
  }

}

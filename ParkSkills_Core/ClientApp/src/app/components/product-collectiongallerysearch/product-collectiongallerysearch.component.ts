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

  loading = true;
  filtered: any = [];
  searching = false;

  public tilesCollection: any = {};
  public searchFilters: any = {};
  public noResults: any = {};
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) {
    this.filtered = this.getAllTiles();
    this.getFilters();
  }

  // For search
  onSubmit(value: any) {
    this.loading = true;
    this.searching = true;
    this.noResults = false;
    setTimeout(() => {
      this.getAllTiles();
      this.filtered = this.tilesCollection.filter((tile: any) =>
        tile?.pst_name.toLowerCase().includes(value.reg.toLowerCase())
      );
      if (this.filtered.length === 0) {
        this.noResults = true;
      }
      this.loading = false;
    }, 2000);
  }

  // For click filters
  onFilterClick(value: any) {
    this.searching = true;
    this.loading = true;
    this.noResults = false;
    if (value === 'reset') {
      this.getAllTiles();
      this.loading = false;
      this.searching = false;
    } else {
      setTimeout(() => {
        this.getAllTiles();
        this.filtered = this.tilesCollection.filter((tile: any) =>
          tile?.pst_name.toLowerCase().includes(value.toLowerCase())
        );
        this.loading = false;
        if (this.filtered.length === 0) {
          this.noResults = true;
        }
      }, 2000);
    }
  }

  getAllTiles() {
    this.loading = true;
    this.apicallService.getAllTiles().subscribe({
      next: (httpResponse) => {
        this.tilesCollection = httpResponse;
      },
      error: (error) => {},
      complete: () => {
        this.loading = false;
      },
    });
  }

  getFilters() {
    this.apicallService.getAllTiles().subscribe({
      next: (httpResponse) => {
        this.searchFilters = httpResponse;
      },

      error: (error) => {},
      complete: () => {
        this.loading = false;
      },
    });
  }
}

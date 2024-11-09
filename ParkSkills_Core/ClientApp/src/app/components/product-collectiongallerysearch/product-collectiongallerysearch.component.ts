import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-collectiongallerysearch',
  templateUrl: './product-collectiongallerysearch.component.html',
  styleUrls: ['./product-collectiongallerysearch.component.scss'],
})
export class ProductCollectiongallerysearchComponent implements OnInit {
  multiFilterFormGroup: FormGroup | any;
  checkboxFilters: any;
  selected: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;  // Reference to MatPaginator


  loading = false;
  searchResults: any = [];
  public routerUrl: any;
  getFilterTags: any;
  getFilterFacetTags: any;
  public noResults: any = false;
  pageSize = 10;
  pageIndex = 0;
  total_items=0;

  ngOnInit(): void {
    this.multiFilterFormGroup = this.formBuilder.group({
      checkboxFilters: this.formBuilder.array([]),
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apicallService: ApicallService,
    private formBuilder: FormBuilder
  ) {
    this.routerUrl = this.router.url;
    this.getSearchResults();
    this.getSearchFilters();
    setTimeout((res: any) => {
      this.checkboxFilters = this.getFilterTags;
    }, 2000);
  }


  resetPaginator(): void {
    if (this.paginator) {
      this.paginator.pageIndex = 0; // Reset to the first page
      this.pageIndex = 0; // Reset the pageIndex variable
    }
  }


  resetSearch() {
    console.log("Rset")
    this.getSearchResults()
  }

  resetCheckbox() {
    window.location.reload()
  }


  onChange(selectedOption: MatCheckboxChange) {
    const checkboxFilters = (<FormArray>(
      this.multiFilterFormGroup.get('checkboxFilters')
    )) as FormArray;

    if (selectedOption.checked) {
      checkboxFilters.push(new FormControl(selectedOption.source.value));
    } else {
      const i = checkboxFilters.controls.findIndex(
        (x) => x.value === selectedOption.source.value
      );
      checkboxFilters.removeAt(i);
    }
  }

  onSubmit() {
    const value = this.multiFilterFormGroup.value;
    console.log('value', value);
    const filterVal = value?.checkboxFilters;
    const searchVal = filterVal.join(' ');
    this.getSearchResults(searchVal);
  }

  getSearchResults(value?: any) {
    if(value) {
     this.resetPaginator()
    }
    this.loading = true;
    this.noResults = false;
    this.apicallService.getSearchAPI(value, this.pageSize,this.pageIndex).subscribe({
      next: (httpResponse) => {
        this.searchResults = httpResponse;
        this.total_items = this.searchResults?.pager.total_items
        console.log(this.searchResults)
        if (this.searchResults?.rows.length === 0) {
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

  handlePageEvent(event: PageEvent): void {
    console.log("event", event)
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getSearchResults()
  }

  getSearchFilters(value?: any) {
    this.loading = true;
    this.apicallService.getSearchAPIFacetFilters().subscribe({
      next: (httpResponse: any) => {
        this.getFilterTags = httpResponse;
        console.log(this.getFilterTags);

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

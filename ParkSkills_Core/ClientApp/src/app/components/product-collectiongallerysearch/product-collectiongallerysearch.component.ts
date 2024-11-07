import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-product-collectiongallerysearch',
  templateUrl: './product-collectiongallerysearch.component.html',
  styleUrls: ['./product-collectiongallerysearch.component.scss'],
})
export class ProductCollectiongallerysearchComponent implements OnInit {

  multiFilterFormGroup: FormGroup | any;
  checkboxFilters: any;
  selected: any;

  loading = false;
  filtered: any = [];
  public routerUrl: any;
  getFilterTags: any
  public noResults: any = false;

  
  ngOnInit(): void {
    this.multiFilterFormGroup = this.formBuilder.group({
      checkboxFilters: this.formBuilder.array([])
    });
   
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public apicallService: ApicallService,
    private formBuilder: FormBuilder

  ) {
    this.routerUrl = this.router.url;
    this.getSearchResults()
    this.getSearchFilters()
    setTimeout((res:any) => {
      this.checkboxFilters = this.getFilterTags;
    },2000);
  }

  onChange(selectedOption: MatCheckboxChange) {
    const checkboxFilters = (<FormArray>(this.multiFilterFormGroup.get("checkboxFilters"))) as FormArray;

    if (selectedOption.checked) {
      checkboxFilters.push(new FormControl(selectedOption.source.value));
    } else {
      const i = checkboxFilters.controls.findIndex(
        x => x.value === selectedOption.source.value
      );
      checkboxFilters.removeAt(i);
    }
  }

  onSubmit() {
    const value = this.multiFilterFormGroup.value
    console.log("value",value);

    const filterVal = value?.checkboxFilters
    const searchVal = filterVal.join(' ')
    this.getSearchResults(searchVal)
  }

  getSearchResults(value?: any) {
    console.log(value)
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
      next: (httpResponse: any) => {
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

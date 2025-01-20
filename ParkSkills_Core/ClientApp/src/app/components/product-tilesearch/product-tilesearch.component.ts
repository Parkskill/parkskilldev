import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule, MatAccordion } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-product-tilesearch',
  templateUrl: './product-tilesearch.component.html',
  styleUrls: ['./product-tilesearch.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatPaginatorModule,
  ]
})
export class ProductTilesearchComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  loading = true;
  public roomScenesCollection: any = {};
  getFilterTags: any;
  checkboxFilters: any;
  sections: any = [];
  processing = false;
  searchResults: any = [];
  public routerUrl: any;
  public noResults: any = false;
  pageSize: any;


  pageIndex = 0;
  total_items = 0;
  currentPage = 0;
  totalPages = 0;
  itemsPerPage = 10;
  pager: any = {};

  constructor(
    public apicallService: ApicallService
  ) {
    this.getSearchFilters();
    this.getSearchResults();
  }

  ngOnInit(): void {}

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.getSearchResults();
  }

  // Method to handle pagination response
  handlePaginationResponse(response: any) {
    this.currentPage = response?.pager.current_page;
    this.total_items = response?.pager.total_items;
    this.totalPages = response?.pager.total_pages;
    this.itemsPerPage = response?.pager.items_per_page;
  }

  // Check if any checkbox in a section is checked
  isSectionChecked(sectionIndex: number): boolean {
    return this.sections[sectionIndex].checkboxes.some((checkbox: any) => checkbox.checked);
  }

  // Check if any checkbox in any section is checked
  isAnyCheckboxChecked(): boolean {
    return this.sections.some((section: any) => section.checkboxes.some((checkbox: any) => checkbox.checked));
  }

  // Trigger on checkbox change to update the state
  onCheckboxChange(sectionIndex: number): void {
    this.isSectionChecked(sectionIndex);
  }

  getCheckBoxValues(): void {
    this.processing = true;
    if (!this.getFilterTags) return;
    this.sections = this.getFilterTags.map((vocab: any) => ({
      title: vocab.vocabulary,
      checkboxes: vocab.terms.map((term: any) => ({
        label: term.name,
        checked: false
      }))
    }));
    this.processing = false;
  }

  // Get all selected values
  getSelectedValues(): void {
    const selectValues = this.sections.map((section: any) => ({
      title: section.title,
      selectedOptions: section.checkboxes.filter((checkbox: any) => checkbox.checked).map((checkbox: any) => checkbox.label)
    }));
    const selectValuesformatted = selectValues.flatMap((section: { title: string; selectedOptions: string[] }) => section.selectedOptions);
    this.getSearchResults(selectValuesformatted.join(' '))
  }

  // Reset all selections and collapse all sections
  resetSelections(): void {
    this.sections.forEach((section: any) => {
      section.checkboxes.forEach((checkbox: any) => checkbox.checked = false);
    });
    this.accordion.closeAll();
    this.getSearchResults();
  }

  // API Calls
  getSearchFilters() {
    this.loading = true;
    this.apicallService.getSearchAPIFacetFilters().subscribe({
      next: (httpResponse: any) => {
        this.getFilterTags = httpResponse;
        this.getCheckBoxValues();
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


  getSearchResults(value?: any) {
    // this.loading = true;
    this.apicallService.getSearchAPI(value, this.itemsPerPage,this.currentPage).subscribe({
      next: (httpResponse) => {
        this.searchResults = httpResponse;
        this.handlePaginationResponse(httpResponse);
        if (this.searchResults?.rows.length === 0) {
          this.noResults = true;
        }
        // this.loading = false;
      },

      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
        setTimeout(() => {
          // this.loading = false;
        }, 3000);
      },
    });
  }
}
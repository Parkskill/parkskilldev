import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  constructor() { }
  dropdownStates: { [key: string]: boolean } = {};

  isLargeScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }
  
  ngOnInit() {
    this.checkScreenWidth();
  }
  
  checkScreenWidth() {
    this.isLargeScreen = window.innerWidth >= 2000;
  }
  
  toggleDropdown(dropdownName: string): void {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }

  isDropdownOpen(dropdownName: string): boolean {
    return !!this.dropdownStates[dropdownName];
  }
}

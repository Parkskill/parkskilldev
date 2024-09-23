import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {

  constructor() { }
  dropdownStates: { [key: string]: boolean } = {};
  ngOnInit(): void {
  }
  toggleDropdown(dropdownName: string): void {
    this.dropdownStates[dropdownName] = !this.dropdownStates[dropdownName];
  }

  isDropdownOpen(dropdownName: string): boolean {
    return !!this.dropdownStates[dropdownName];
  }
}

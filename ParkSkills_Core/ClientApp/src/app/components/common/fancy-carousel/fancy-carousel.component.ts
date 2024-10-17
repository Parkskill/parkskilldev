import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fancy-carousel',
  templateUrl: './fancy-carousel.component.html',
  styleUrls: ['./fancy-carousel.component.scss']
})
export class FancyBannerComponent implements OnInit {
  @Input() data: any;

  ngOnInit(): void {
    console.log("Data", this.data)

  }

  constructor() {
  
  }
}

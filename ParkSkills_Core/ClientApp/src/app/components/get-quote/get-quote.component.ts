import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.scss']
})
export class GetQuoteComponent implements OnInit {
  isLargeScreen: boolean = false;
  constructor() { }

  
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
    

}

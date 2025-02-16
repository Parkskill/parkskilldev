import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public catalogList: any = {};
  catalogLoading = true;
  currentYear: number | undefined;
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) {
    this.getCatalogs()
  }


  isLargeScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }


  checkScreenWidth() {
    this.isLargeScreen = window.innerWidth >= 2000;
  }
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.checkScreenWidth();
  }

  // get tiles by ID
  getCatalogs() {
    this.apicallService
      .getCatalogs()
      .subscribe({
        next: (httpResponse: any) => {
          console.log("respn", httpResponse)
          this.catalogList = httpResponse;
        },
        error: (error: any) => { },
        complete: () => {
          this.catalogLoading = false;
        },
      });
  }


}

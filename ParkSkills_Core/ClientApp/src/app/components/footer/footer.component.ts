import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

    // get tiles by ID
    getCatalogs() {
      this.apicallService
        .getCatalogs()
        .subscribe({
          next: (httpResponse:any) => {
            console.log("respn", httpResponse)
            this.catalogList = httpResponse;
          },
          error: (error:any) => {},
          complete: () => {
            this.catalogLoading = false;
          },
        });
    }


}

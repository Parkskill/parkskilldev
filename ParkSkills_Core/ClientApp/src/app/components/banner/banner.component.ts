import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  public configurations: any = {};
  public baseUri: string = "";
  ngOnInit(): void {
  }
  constructor(private route: ActivatedRoute, public apicallService: ApicallService) {
    this.apicallService.getConfiguration().subscribe(
      {
        next: (httpResponse) => {
          console.log('data', httpResponse)
          this.configurations = JSON.parse(httpResponse)[0];
        },

        error: (error) => {
          console.log('Error', error)
        },
        complete: () => {
          console.log('Completed')
        }
      }
    );
  }

  onSearch(event :any): void {
    console.log('clicked');
  }
}
interface Configuration {
  pst_phonenumber: string;
  pst_quotenotes: string;
  pst_welcometext: string;
  pst_quoteboby: string;
  pst_aboutheader: string;
  pst_aboutbody: string;
  pst_email: string;
}

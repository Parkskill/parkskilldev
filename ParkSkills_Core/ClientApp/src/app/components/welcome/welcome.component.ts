import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../shared/apicall.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  ngOnInit(): void {
    
  }
  public configurations: any = {};
  public imageData : string = "";
  constructor(private route: ActivatedRoute, public apicallService: ApicallService) {
    this.apicallService.getConfiguration().subscribe(
      {
        next: (httpResponse) => {
          console.log('data', httpResponse)
          this.configurations = JSON.parse(httpResponse)[0];

          this.apicallService.getWelcomeImage(this.configurations.pst_configurationid).subscribe(
            {
              next: (httpResponse) => {
                console.log('data', httpResponse)
                var res = JSON.parse(httpResponse);
                this.imageData = res.pst_bannerimage;
              },

              error: (error) => {
                console.log('Error', error)
              },
              complete: () => {
                console.log('Completed')
              }
            }
          );

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

}

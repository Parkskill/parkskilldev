import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  public baseUri: string = "";
  ngOnInit(): void {
    //alert("welcome");
  }
  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  this.baseUri = baseUrl;
  //  http.get<WeatherForecast[]>(baseUrl + 'configuration').subscribe(result => {
  //    this.forecasts = result;
  //  }, error => console.error(error));
  //}

  constructor(private route: ActivatedRoute, public apicallService: ApicallService) {
    this.apicallService.getConfiguration().subscribe(
      {
        next: (httpResponse) => {
          console.log('data', httpResponse)
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

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

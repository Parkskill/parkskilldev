import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../../shared/apicall.service';

@Component({
  selector: 'app-tiles-collection',
  templateUrl: './tiles-collection.component.html',
  styleUrls: ['./tiles-collection.component.scss']
})
export class TilesCollectionComponent implements OnInit {

  ngOnInit(): void {
  }
  public configurations: any = {};
  public imageData: string = "";
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

}

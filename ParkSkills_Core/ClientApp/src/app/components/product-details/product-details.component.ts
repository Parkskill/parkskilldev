import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'room-scenes',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  loading = true;
  public roomScenesCollection: any = {};

  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) {
    this.getAllTiles();
  }

  ngOnInit(): void {}

  getAllTiles() {
    this.loading = true;
    this.apicallService.getAllTiles().subscribe({
      next: (httpResponse) => {
        console.log(httpResponse);
        this.roomScenesCollection = httpResponse;
      },

      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
        this.loading = false;
        console.log('Completed');
      },
    });
  }
}

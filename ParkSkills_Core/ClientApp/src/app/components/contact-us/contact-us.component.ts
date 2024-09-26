import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
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
      next: (httpResponse: any) => {
        console.log(httpResponse);
        this.roomScenesCollection = httpResponse;
      },

      error: (error: any) => {
        console.log('Error', error);
      },
      complete: () => {
        this.loading = false;
        console.log('Completed');
      },
    });
  }
}

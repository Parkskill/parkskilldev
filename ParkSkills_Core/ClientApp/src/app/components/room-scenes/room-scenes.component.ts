import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'room-scenes',
  templateUrl: './room-scenes.component.html',
  styleUrls: ['./room-scenes.component.scss'],
})
export class RoomScenesComponent implements OnInit {
  loading = true;
  public roomScenesCollection: any = {};

  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) {
    this.getAllTiles();
  }

  ngOnInit(): void {}
  public fullImage:any ;
  displayStyle = "none"; 
  
  openPopup(value:any) { 
    this.fullImage = value
    console.log(this.fullImage)
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 

  getAllTiles() {
    this.loading = true;
    this.apicallService.getRoomScenes().subscribe({
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

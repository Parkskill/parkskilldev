import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'app-room-scenes',
  templateUrl: './room-scenes.component.html',
  styleUrls: ['./room-scenes.component.scss'],
})
export class RoomScenesComponent implements OnInit {
  loading = true;
  public roomScenesCollection: any = {};
  public newRoomScenes: any;
  public routerUrl: any;
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService,
    private router: Router,
  ) {
    this.getNewRoomScenes();
    this.routerUrl = this.router.url;
  }

  ngOnInit(): void {}
  public fullImage:any ;
  displayStyle = "none"; 

  openDetails(value:any) {
    this.router.navigate([`/CollectionGalleryItem/${value}`])
  }
  
  openPopup(value:any) { 
    this.fullImage = value
    console.log(this.fullImage)
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 

  getNewRoomScenes() {
    this.apicallService.getNewRoomScenes().subscribe({
      next: (httpResponse) => {
        console.log("DData",httpResponse);
        this.newRoomScenes = httpResponse
      },

      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      },
    });
  }
}



// rs_collection_category


// CollectionGalleryItem/Balboa


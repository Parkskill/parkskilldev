import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'app-room-scenes',
  templateUrl: './room-scenes.component.html',
  styleUrls: ['./room-scenes.component.scss'],
})
export class RoomScenesComponent implements OnInit {
  loading = true;
  public newRoomScenes: any;
  public routerUrl: any;
  pageSize = 10;
  pageIndex = 0;
  total_items=0;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;  // Reference to MatPaginator


  isLargeScreen: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }
  
  ngOnInit() {
    this.checkScreenWidth();
  }
  
  checkScreenWidth() {
    console.log("window.innerWidth", window.innerWidth)
    this.isLargeScreen = window.innerWidth >= 2000;
  }
  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService,
    private router: Router,
  ) {
    this.getNewRoomScenes();
    this.routerUrl = this.router.url;
  }

  public fullImage:any ;
  displayStyle = "none"; 

  openDetails(value:any) {
    this.router.navigate([`/CollectionGalleryItem/${value}`])
  }
  
  // todo: remove this
  openPopup(value:any) { 
    this.fullImage = value
    console.log(this.fullImage)
    this.displayStyle = "block"; 
  } 
  // todo: remove this
  closePopup() { 
    this.displayStyle = "none"; 
  } 

  resetPaginator(): void {
    if (this.paginator) {
      this.paginator.pageIndex = 0; // Reset to the first page
      this.pageIndex = 0; // Reset the pageIndex variable
    }
  }

  handlePageEvent(event: PageEvent): void {
    console.log("event", event)
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getNewRoomScenes()
  }
  

  getNewRoomScenes() {
    this.apicallService.getNewRoomScenes(this.pageSize,this.pageIndex).subscribe({
      next: (httpResponse) => {
        this.newRoomScenes = httpResponse
        this.total_items = this.newRoomScenes?.pager.total_items
      },

      error: (error) => {
        console.log('Error', error);
      },
      complete: () => {
          this.loading = false;
      },
    });
  }
}
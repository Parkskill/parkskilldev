import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'app-product-collectiongalleryitemview',
  templateUrl: './product-collectiongalleryitemview.component.html',
  styleUrls: ['./product-collectiongalleryitemview.component.scss'],
})
export class ProductCollectiongalleryitemviewComponent implements OnInit {
  tilesLoading = true;
  rsLoading = true;
  public tileDetails: any;
  displayStyle = 'none';
  public filteredTilesByCategory: any = {};
  public filteredRoomScenesByCategory: any = {};
  public id: any;

  ngOnInit(): void {}

  constructor(
    private route: ActivatedRoute,
    public apicallService: ApicallService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getFilteredTiles(this.id);
    this.getFilteredRoomScenes(this.id);
  }

  // Open Modal
  openPopup(value: any) {
    this.tileDetails = value;
    this.tileDetails.sliderImages =  this.productImages(this.tileDetails.images)
    console.log(this.tileDetails)
    this.displayStyle = 'block';
  }

  // convert product images to object
  productImages(imagePaths: any) {
    const imageUrls = imagePaths.split(',');
    const imageObj = imageUrls.map((imageUrl:any) => {
      return  {
        src: imageUrl,
        thumbSrc: imageUrl,
      };
    });

    return imageObj
  }

  // Modal close
  closePopup() {
    this.displayStyle = 'none';
  }

  // get tiles by ID
  getFilteredTiles(ID: any) {
    this.tilesLoading = true;
    this.apicallService
      .getNewFilteredTiles(`?collection_category=${ID}`)
      .subscribe({
        next: (httpResponse) => {
          this.filteredTilesByCategory = httpResponse;
        },

        error: (error) => {},
        complete: () => {
          this.tilesLoading = false;
        },
      });
  }

  // Get room scenes by ID
  getFilteredRoomScenes(ID: any) {
    this.rsLoading = true;
    this.apicallService
      .getFilteredRoomScenes(`?rs_collection_category=${ID}`)
      .subscribe({
        next: (httpResponse) => {
          this.filteredRoomScenesByCategory = httpResponse;
        },

        error: (error) => {},
        complete: () => {
          this.rsLoading = false;
        },
      });
  }
}

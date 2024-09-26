import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { GetQuoteComponent } from './components/get-quote/get-quote.component';
import { HomeComponent } from './components/home/home.component';
import { ProductCollectiongalleryitemviewComponent } from './components/product-collectiongalleryitemview/product-collectiongalleryitemview.component';
import { ProductCollectiongallerysearchComponent } from './components/product-collectiongallerysearch/product-collectiongallerysearch.component';
import { ProductTilesearchComponent } from './components/product-tilesearch/product-tilesearch.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { TilesCollectionComponent } from './components/tiles-collection/tiles-collection.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ApicallService } from './shared/apicall.service';
import { ApiResolver } from './shared/api-resolver.service';  // Import the resolver
/*import { Ng2SearchPipeModule } from 'ng2-search-filter';*/
import { RoomScenesComponent } from './components/room-scenes/room-scenes.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BannerComponent,
    GetQuoteComponent,
    HomeComponent,
    ProductCollectiongalleryitemviewComponent,
    ProductCollectiongallerysearchComponent,
    RoomScenesComponent,
    ProductTilesearchComponent,
    SideNavComponent,
    SubscriptionComponent,
    TilesCollectionComponent,
    TopHeaderComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    /*Ng2SearchPipeModule,*/
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent, pathMatch: 'full', resolve: { data: ApiResolver } },
        { path: 'TileSearch', component: ProductTilesearchComponent, pathMatch: 'full' },
        { path: 'CollectionGallerySearch', component: ProductCollectiongallerysearchComponent, pathMatch: 'full', resolve: { data: ApiResolver } },
        { path: 'CollectionGalleryItem', component: ProductCollectiongalleryitemviewComponent, pathMatch: 'full' },
        { path: 'room-scenes', component:RoomScenesComponent, pathMatch: 'full'}

        //{ path: 'counter', component: CounterComponent },
        //{ path: 'fetch-data', component: FetchDataComponent },
      ]
    )
  ],
  providers: [ApicallService, ApiResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from '@daelmaak/ngx-gallery';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { FancyBannerComponent } from './components/common/fancy-carousel/fancy-carousel.component';
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
import { ApiResolver } from './shared/api-resolver.service'; // Import the resolver
import { RoomScenesComponent } from './components/room-scenes/room-scenes.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MaterialModule } from './material.module';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
    ProductDetailsComponent,
    SideNavComponent,
    SubscriptionComponent,
    FancyBannerComponent,
    TilesCollectionComponent,
    TopHeaderComponent,
    WelcomeComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    GalleryComponent,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        resolve: { },
      },
      {
        path: 'TileSearch',
        component: ProductTilesearchComponent,
        pathMatch: 'full',
      },
      {
        path: 'CollectionGallerySearch',
        component: ProductCollectiongallerysearchComponent,
        pathMatch: 'full',
        resolve: { },
      },
      {
        path: 'CollectionGalleryItem/:id',
        component: ProductCollectiongalleryitemviewComponent,
        pathMatch: 'full',
      },
      {
        path: 'TilesCollections',
        component: TilesCollectionComponent,
        pathMatch: 'full',
      },
      {
        path: 'RoomScenes',
        component: RoomScenesComponent,
        pathMatch: 'full',
      },
      { path: 'RoomScenes/:id', component: ProductDetailsComponent },
      {
        path: 'ContactUs',
        component: ContactUsComponent,
        pathMatch: 'full',
      },
      //{ path: 'counter', component: CounterComponent },
      //{ path: 'fetch-data', component: FetchDataComponent },
    ]),
  ],
  providers: [
    ApicallService,
    ApiResolver,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}

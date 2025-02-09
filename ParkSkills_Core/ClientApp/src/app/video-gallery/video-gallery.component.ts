import { Component } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/shared/apicall.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.scss'
})
export class VideoGalleryComponent {

  sanitizedUrl!: SafeResourceUrl;
  videoGalleryList: any = {};
  videoGalleryLoading = true;
  constructor(private sanitizer: DomSanitizer,
  public apicallService: ApicallService
) {
  this.getVideoGallery()
}

  ngOnInit(): void {
    const nonEmbedUrl = 'https://youtu.be/aKpeddrw6Ig?si=Yh_vc2xXjwELbkVv';
    const embedUrl = this.convertToEmbedUrl(nonEmbedUrl);
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getSanitizedUrl(url: string): SafeResourceUrl {
    const embedUrl = this.convertToEmbedUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  convertToEmbedUrl(url: string): string {
    const videoId = this.extractVideoId(url);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  extractVideoId(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : '';
  }

  getVideoGallery() {
    this.apicallService
      .getVideoGallery()
      .subscribe({
        next: (httpResponse:any) => {
          this.videoGalleryList = httpResponse;
          console.log("Hey",this.videoGalleryList);
        },
        error: (error:any) => {},
        complete: () => {
          this.videoGalleryLoading = false;
        },
      });
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Pipe({
  name: 'extractGoogleDriveLink'
})
export class ExtractGoogleDriveLinkPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeUrl {
    if (!value) {
      return this.sanitizer.bypassSecurityTrustUrl('');
    }

    // Regular expression to extract the Google Drive link
    const regex = /https:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+\/view\?usp=drive_link/g;
    
    // Extract the link
    const matches = value.match(regex);
    
    // Return the sanitized link or an empty string if no link is found
    return matches ? this.sanitizer.bypassSecurityTrustUrl(matches[0]) : this.sanitizer.bypassSecurityTrustUrl('');
  }
}
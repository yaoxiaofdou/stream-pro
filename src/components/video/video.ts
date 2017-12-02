import { Component,Input } from '@angular/core';


@Component({
  selector: 'cc-video',
  templateUrl: 'video.html'
})
export class VideoComponent {

  @Input() src: any;

  video: any;

  constructor() {
    this.video = {
      src: this.src,
    };
  }


}

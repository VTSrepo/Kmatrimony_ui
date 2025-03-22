import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  constructor() {}

  @Input() images: string[] = [
    'assets/img/nalungu.jpg',
    'assets/img/metti.jpg',
    'assets/img/mangalyam.jpg',
    'assets/img/kasiyatra.jpg',
  ];
  currentIndex: number = 0;

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Change image every 3 seconds
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

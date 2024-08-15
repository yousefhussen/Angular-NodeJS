import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to the imports array
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  bookId: string | undefined;
  stars: number[] = [1, 2, 3, 4, 5];
  currentRating: number = 0;
  tempRating: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId') ?? 'Not found';
  }

  highlightStars(index: number): void {
    this.tempRating = index + 1;
  }

  resetStars(): void {
    this.tempRating = this.currentRating;
  }

  rateBook(rating: number): void {
    this.currentRating = rating;
  }
}

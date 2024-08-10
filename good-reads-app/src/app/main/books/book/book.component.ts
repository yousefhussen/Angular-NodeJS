import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  bookId: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('bookId') ?? 'Not found';
  }
}

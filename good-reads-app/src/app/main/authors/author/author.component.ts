import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../../../shared/services/Author/author.service';
import { Author } from '../../../shared/services/Author/Author';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  Author!: Author;

  id!: string;
  shelfOptions: string[] = ['Read', 'Reading', 'Want to Read'];


  constructor(private route: ActivatedRoute,protected AuthorService: AuthorService  , protected Rrouter:Router) {
   
    this.AuthorService.getAuthor( this.route.snapshot.paramMap.get('id')??"").then((Author: any)=>{
      this.Author = Author;


    });
  }

  toggleShelf(book: any) {
    const currentIndex = this.shelfOptions.indexOf(book.currentShelf);
    const nextIndex = (currentIndex + 1) % this.shelfOptions.length;
    book.currentShelf = this.shelfOptions[nextIndex];
  }

}

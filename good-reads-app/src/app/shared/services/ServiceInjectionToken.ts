import { InjectionToken } from '@angular/core';
import { AuthorService } from '../../shared/services/Author/author.service';
import { BookService } from '../../shared/services/Book/book.service';

export const SERVICE_MAP = new InjectionToken<Map<any, any>>('SERVICE_MAP', {
  providedIn: 'root',
  factory: () => new Map<any, any>([
    ['Author', AuthorService],
    ['Book', BookService],

  ])
});
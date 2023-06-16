import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleInterface } from './article.interface';

@Injectable()
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticles(searchValue: string): Observable<ArticleInterface[]> {
    return this.http.get<ArticleInterface[]>(
      `https://jsonplaceholder.typicode.com/posts?id=${searchValue}`
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleInterface } from './article.interface';
import { ArticlesService } from './articles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchValue = '';
  articles: ArticleInterface[] = [];
  searchForm = this.fb.group({
    searchValue: '',
  });

  constructor(
    private articlesService: ArticlesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.articlesService.getArticles(this.searchValue).subscribe((posts) => {
      this.articles = posts;
    });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '@model/hero';
import { HeroService } from '@svc/hero.service';

@Component({
  selector: 'app-hero-search',
  styleUrls: ['./hero-search.component.scss'],
  template: `
    <div id="search-component">
      <h4><label for="search-box">英雄搜索</label></h4>
      <input #searchBox id="search-box" (input)="search(searchBox.value)" />
      <ul class="search-result">
        <li *ngFor="let hero of heroes$ | async">
          <a routerLink="/detail/{{ hero.id }}">
            {{ hero.name }}
          </a>
        </li>
      </ul>
    </div>
  `
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // 将搜索词推入 observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 在每次击键后等待300毫秒，然后再执行下一步
      debounceTime(300),

      // 如果与前一个词相同，则忽略新词
      distinctUntilChanged(),

      // 每次字词更改时切换到新的 observable 搜索
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}

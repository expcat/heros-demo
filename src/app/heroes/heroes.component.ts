import { Component, OnInit } from '@angular/core';
import { Hero } from '@model/hero';
import { HeroService } from '@svc/hero.service';
import { MessageService } from '@svc/message.service';

@Component({
  selector: 'app-heroes',
  styleUrls: ['./heroes.component.scss'],
  template: `
    <h2>{{ title }}</h2>
    <div>
      <label
        >Hero name:
        <input #heroName />
      </label>
      <!-- (click) 将输入值传递给add（），然后清除输入 -->
      <button (click)="add(heroName.value); heroName.value = ''">
        add
      </button>
    </div>
    <ul class="heroes">
      <li *ngFor="let hero of heroes">
        <a routerLink="/detail/{{ hero.id }}">
          <span class="badge">{{ hero.id }}</span> {{ hero.name }}
        </a>
        <button class="delete" title="删除英雄" (click)="delete(hero)">
          x
        </button>
      </li>
    </ul>
  `
})
export class HeroesComponent implements OnInit {
  title = '我的英雄';
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '@svc/hero.service';
import { Hero } from '@model/hero';

@Component({
  selector: 'app-hero-detail',
  styleUrls: ['./hero-detail.component.scss'],
  template: `
    <div *ngIf="hero">
      <h2>{{ hero.name | uppercase }} 详情</h2>
      <div><span>id: </span>{{ hero.id }}</div>
      <div>
        <label
          >名字:
          <input [(ngModel)]="hero.name" placeholder="name" />
        </label>
      </div>
      <button (click)="save()">保存</button>
      <button (click)="goBack()">返回</button>
    </div>
  `
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}

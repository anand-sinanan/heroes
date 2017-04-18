import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
} from '@angular/animations';

@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: [
      './heroes.component.css'
    ],
    providers: [
        HeroService,
    ],
    animations: [
      trigger('heroState', [
        state('inactive', style({
          backgroundColor: '#eee',
          transform: 'scale(1)'
        })),
        state('active',   style({
          backgroundColor: '#cfd8dc',
          transform: 'scale(1.1)'
        })),
        transition('inactive => active', animate('100ms ease-in')),
        transition('active => inactive', animate('100ms ease-out'))
      ]),
      trigger('flyInOut', [
      state('in', style({width: 120, transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({width: 10, transform: 'translateX(50px)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.3s ease', style({
            transform: 'translateX(50px)',
            width: 10
          })),
          animate('0.3s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
    ]

})

export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;

    constructor(
      private heroService: HeroService,
      private router: Router
    ) { }

    getHeroes(): void {
        this.heroService.getHeroes().then(
          heroes => this.heroes = heroes
        );
    }

    ngOnInit(): void {
      this.getHeroes();
    }

    toggleState(hero: Hero) {
    hero.state = (hero.state === 'active' ? 'inactive' : 'active');
  }
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
    }
    delete(hero: Hero): void {
      this.heroService
          .delete(hero.id)
          .then(() => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) { this.selectedHero = null; }
          });
    }

}

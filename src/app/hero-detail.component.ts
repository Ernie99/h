
import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from "./hero.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Hero} from "./hero";
import {Location} from "@angular/common"

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'my-hero-detail',
  template: `
<div *ngIf="hero">
  <h2>{{hero.name}} details</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <!--<input value="{{hero.name}}" placeholder="name">-->
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name">
  </div>
  <button (click)="goBack()">Back</button>
</div>
`
})
export class HeroDetailComponent implements OnInit{
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void{
      this.route.params.switchMap((params: Params) => this.heroService.getHero(+params['id'])).subscribe(hero => this.hero = hero);
    // this.route.params.switchMap(null);
  }

  goBack(): void {
      this.location.back();
  }

}

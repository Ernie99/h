
import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';



@Injectable()
export class HeroService {

  constructor(private http: Http){}

  private heroesUrl = 'app/heroes';

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: Number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve => setTimeout(resolve, 3000)).then(() => this.getHeroes());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

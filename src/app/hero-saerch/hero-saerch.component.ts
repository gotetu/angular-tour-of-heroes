import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'

import { Hero } from '../hero'
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-saerch',
  templateUrl: './hero-saerch.component.html',
  styleUrls: ['./hero-saerch.component.css']
})
export class HeroSaerchComponent implements OnInit {
  heroes$ : Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeros(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero'

import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // Web API �� URL
  httpOpteions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)    
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error : any) : Observable<T> => {
      console.error(error);
      this.log(`${operation} failled: ${error.message}`);
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes.')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id :number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`feched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero:Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOpteions).pipe(
      tap(_ => this.log(`update hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  addHero(hero:Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero, this.httpOpteions).pipe(
      tap((newHero : Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<any>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, this.httpOpteions).pipe(
      tap(_ => this.log(`delete hero id=${id}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  searchHeros(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes match "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeros', []))
    );
  }
}
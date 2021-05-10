import { Injectable } from '@angular/core';
import { Monster } from './monsters/monster';
import { MONSTERS } from './monsters/mock-monsters';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  private monsterUrl = 'api/monster';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getMonsters(): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.monsterUrl)
      .pipe(
        catchError(this.handleError<Monster[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Monster> {
    const url = `${this.monsterUrl}/?id=${id}`;
    return this.http.get<Monster[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Monster>(`getHero id=${id}`))
      );
  }

  /* GET heroes whose name contains search term */
  searchMonsters(term: string): Observable<Monster[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Monster[]>(`${this.monsterUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Monster[]>('searchMonsters', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addMonster(hero: Monster): Observable<Monster> {
    return this.http.post<Monster>(this.monsterUrl, hero, this.httpOptions).pipe(
      catchError(this.handleError<Monster>('addMonster'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteMonster(id: number): Observable<Monster> {
    const url = `${this.monsterUrl}/${id}`;

    return this.http.delete<Monster>(url, this.httpOptions).pipe(
      catchError(this.handleError<Monster>('deleteHero'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

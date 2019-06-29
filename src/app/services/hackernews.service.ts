import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Item } from '../entities/item.entity';

@Injectable({
  providedIn: 'root'
})
export class HackernewsService {
  hnLocation: string = 'https://hacker-news.firebaseio.com/v0';

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 
   * @param type - type should be included in 'entities/storyparams.entity.ts'
   */
  getIds(type: string): Observable<Item[]> {
    return this.http.get<number[]>(`${this.hnLocation}/${type}.json`)
      .pipe(
        map(ids => {
          return ids.map(id => {
            return new Item(id)
          })
        }),
        catchError(this.handleError<Item[]>('getIds', []))
      );
  }

  /**
   * 
   * @param id 
   */
  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.hnLocation}/item/${id}.json`)
      .pipe(
        catchError(this.handleError<Item>(`getItem`))
      )
  }

  /**
   * 
   * @private
   * @param operation 
   * @param result 
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // Let the app keep running by returning an empty result
      return of(result as T)
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Item } from '../entities/item.entity';
import { validateParam } from '../entities/storyparams.entity';

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
  getIds(type: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.hnLocation}/${type}`)
      .pipe(
        catchError(this.handleError<string[]>('getIds', []))
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

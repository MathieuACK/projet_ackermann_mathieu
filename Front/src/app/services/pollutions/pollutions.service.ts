import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pollution } from '../../models/pollutions';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollutionsService {
  constructor(private http: HttpClient) {
    this.fetchPollutionData().subscribe(() => {});
  }

  private fetchPollutionData(): Observable<Pollution[]> {
    return of(
      this.http.get<Pollution[]>(`${environment.backendClient}/api/pollutions`)
    ).pipe(switchMap((pollutionDataObservable) => pollutionDataObservable));
  }

  public getPollutions(): Observable<Pollution[]> {
    return of(
      this.http.get<Pollution[]>(`${environment.backendClient}/api/pollutions`)
    ).pipe(switchMap((pollutionObservable) => pollutionObservable));
  }

  public getPollutionById(id: number): Observable<Pollution> {
    return of(
      this.http.get<Pollution>(
        `${environment.backendClient}/api/pollutions/${id}`
      )
    ).pipe(switchMap((pollutionObservable) => pollutionObservable));
  }

  public addPollution(pollution: Pollution): Observable<Pollution> {
    console.log(pollution);
    return of(
      this.http.post<Pollution>(
        `${environment.backendClient}/api/pollutions`,
        pollution
      )
    ).pipe(switchMap((pollutionResponse) => pollutionResponse));
  }

  public deletePollution(id: number): Observable<void> {
    return of(
      this.http.delete<void>(
        `${environment.backendClient}/api/pollutions/${id}`
      )
    ).pipe(switchMap((deletedPollutionResponse) => deletedPollutionResponse));
  }

  public updatePollution(
    id: number,
    pollution: Pollution
  ): Observable<Pollution> {
    return of(
      this.http.put<Pollution>(
        `${environment.backendClient}/api/pollutions/${id}`,
        pollution
      )
    ).pipe(switchMap((pollutionUpdateResponse) => pollutionUpdateResponse));
  }
}

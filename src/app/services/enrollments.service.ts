import { Injectable } from '@angular/core';
import { Enrollment } from '../components/enroll-on-battle/enroll-on-battle.component';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentsService {
  constructor(public db: AngularFireDatabase) {}

  getEnrollments(
    battleId: string,
    factionId?: string
  ): Observable<Enrollment[]> {
    const factionIdFilter: QueryFn | undefined = factionId
      ? (ref) => ref.orderByChild('factionId').equalTo(factionId)
      : undefined;
    return this.db
      .list<Enrollment>(`enrollments/${battleId}`, factionIdFilter)
      .valueChanges();
  }
}

import { Injectable } from '@angular/core';
import { Enrollment } from '../components/enrollment-form/enrollment-form.component';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Battle } from '../route-outlets/battle/battle.types';

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

  getEnrollment(
    battleId: Battle['battleId'],
    userId: Enrollment['userId']
  ): Observable<Enrollment | null> {
    return this.db
      .object<Enrollment>(`enrollments/${battleId}/${userId}`)
      .valueChanges();
  }

  /*
   * battleID is required
   * userId is required
   */
  patchEnrollment(
    enrollment: Partial<Enrollment> &
      Required<{
        battleId: Enrollment['battleId'];
        userId: Enrollment['userId'];
      }>
  ): Promise<void> {
    if (!enrollment.battleId) {
      throw new Error('battleId is not defined');
    }
    if (!enrollment.userId) {
      throw new Error('userId is not defined');
    }

    return this.db
      .object<Enrollment>(
        `enrollments/${enrollment.battleId}/${enrollment.userId}`
      )
      .update(enrollment);
  }
}

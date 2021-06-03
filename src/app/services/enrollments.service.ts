import { Injectable } from '@angular/core';
import { Enrollment } from '../components/enroll-on-battle/enroll-on-battle.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    const factionIdFilter = (enrollment: Enrollment) => {
      return !factionId || enrollment.factionId === factionId;
    };

    return this.db
      .list<Enrollment>(`enrollments/${battleId}`)
      .valueChanges()
      .pipe(
        map((enrollments) => {
          return enrollments.filter(factionIdFilter);
        })
      );
  }

  getEnrollment(
    battleId: Battle['battleId'],
    userId: Enrollment['userId']
  ): Observable<Enrollment | null> {
    return this.db
      .object<Enrollment>(`enrollments/${battleId}/${userId}`)
      .valueChanges();
  }

  setEnrollment(
    battleId: Battle['battleId'],
    enrollment: Enrollment
  ): Promise<void> {
    return this.db
      .object<Enrollment>(`enrollments/${battleId}/${enrollment.userId}`)
      .set(enrollment);
  }
}

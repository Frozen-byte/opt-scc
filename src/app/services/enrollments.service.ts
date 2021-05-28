import {Injectable} from '@angular/core';
import {Enrollment} from '../components/enroll-on-battle/enroll-on-battle.component';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(public db: AngularFireDatabase) {
  }

  getEnrollments(battleId: string): Observable<Enrollment[]> {
    return this.db
      .list<Enrollment>(`enrollments/${battleId}`)
      .valueChanges();
  }
}

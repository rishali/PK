import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor() {}

  private scoreSource = new BehaviorSubject<number>(0);
  currentScore = this.scoreSource.asObservable();

  sendScore(score: number) {
    this.scoreSource.next(score);
  }
}

import { Component } from '@angular/core';
import { ScoreService } from '../../services/scoreService/score.service';
import {
  message0,
  message25,
  message75,
  totalQuestions,
} from '../../../assets/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  message: string = '';

  constructor(private scoreService: ScoreService, private router: Router) {
    this.scoreService.currentScore.subscribe((score) => {
      this.calculatePercentage(score);
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  calculatePercentage(score: number) {
    this.message =
      (score / totalQuestions) * 100 >= 75
        ? message75
        : (score / totalQuestions) * 100 >= 25
        ? message25
        : message0;
  }
}

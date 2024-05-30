import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PokemonApiServiceService } from '../../services/PokemonApiService/pokemon-api-service.service';
import { take } from 'rxjs';
import { ScoreService } from '../../services/scoreService/score.service';
import { totalQuestions } from '../../../assets/constant';
import { questionInterface } from '../../types';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrl: './guess.component.scss',
})
export class GuessComponent implements OnInit {
  revealImg = false;
  totalQuestions = totalQuestions;
  currentQuestionNumber: number = 1;
  question: questionInterface = { id: -1, imgSrc: '', options: [] };
  selectedOptionIndex: number = -1;
  correctAnswerIndex: number = -1;
  isOptionDisabled: boolean = false;
  isNextDisabled: boolean = true;
  isAnswerCorrect: string = '';
  currentScore: number = 0;
  actualPokemonName = '';
  errorMessage = null;

  constructor(
    private router: Router,
    private pokemonApiService: PokemonApiServiceService,
    private scoreService: ScoreService
  ) {}

  ngOnInit() {
    this.fetchQuestion();
  }

  fetchQuestion() {
    this.pokemonApiService
      .getRandomPokemon()
      .pipe(take(1))
      .subscribe(
        (data: questionInterface) => {
          this.question = data;
        },
        (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      );
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  checkAndNavigate() {
    this.revealImg = false;
    this.isAnswerCorrect = '';
    this.isOptionDisabled = false;
    this.isNextDisabled = true;
    this.selectedOptionIndex = -1;
    this.correctAnswerIndex = -1;
    this.actualPokemonName = '';
    this.question = { id: -1, imgSrc: '', options: [] };

    if (this.currentQuestionNumber < totalQuestions) {
      this.currentQuestionNumber++;
      this.fetchQuestion();
    } else {
      this.scoreService.sendScore(this.currentScore);
      this.router.navigate(['/result']);
    }
  }

  selectOption(index: number) {
    this.revealImg = true;
    this.isOptionDisabled = true;
    this.selectedOptionIndex = index;
    this.pokemonApiService
      .verifySelectedPokemon(this.question?.id, this.question?.options[index])
      .pipe(take(1))
      .subscribe((data) => {
        if (data.isPokemonAMatch == true) {
          this.correctAnswerIndex = index;
          this.currentScore++;
          this.isAnswerCorrect = 'true';
        } else this.isAnswerCorrect = 'false';
        this.actualPokemonName = data.name;
      });
    this.isNextDisabled = false;
  }

  isCorrectAnswer(index: number): boolean {
    return index === this.correctAnswerIndex;
  }
}

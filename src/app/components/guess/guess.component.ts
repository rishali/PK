import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PokemonApiServiceService } from '../../services/PokemonApiService/pokemon-api-service.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrl: './guess.component.scss'
})
export class GuessComponent implements OnInit {

  currentQuestionNumber:number=1;
  totalQuestions:number=3;
  question:any={};
  selectedOptionIndex=null;
  correctAnswerIndex = -1;
  isOptionDisabled = false;
  isNextDisabled =true;
  isAnswerCorrect= false;
  currentScore=0;


  constructor(private router: Router , private pokemonApiService:PokemonApiServiceService){
  }

  ngOnInit(){
    this.fetchQuestion();
  }

  fetchQuestion(){
    this.pokemonApiService.getRandomPokemon().pipe(take(1)).subscribe((data) =>{this.question=data;
    });
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

  checkAndNavigate(){
    this.isAnswerCorrect=false;
    this.isOptionDisabled = false;
    this.isNextDisabled =true;
    this.selectedOptionIndex=null;
    this.correctAnswerIndex = -1;

    if (this.currentQuestionNumber < this.totalQuestions) {
      this.currentQuestionNumber++;
      this.fetchQuestion();
    } 
    else {
      this.router.navigate(['/result']);
    }
  }
  
  selectOption(index:any) {
    this.isOptionDisabled = true;
    this.selectedOptionIndex = index;
    let pokemon_id= this.question.id;
    let selected_name=this.question.options[index]
    this.pokemonApiService.verifySelectedPokemon(pokemon_id,selected_name).pipe(take(1)).subscribe(
      (data) => {if(data.isPokemonAMatch==true){
        this.correctAnswerIndex=index;
        this.currentScore++;
        this.isAnswerCorrect=true;
    console.log(this.correctAnswerIndex,"  :::  ",pokemon_id)

      }}
    )
    this.isNextDisabled=false;
  }

  isCorrectAnswer(index: number): boolean {
    console.log(index, " ::  ***  :: ",this.correctAnswerIndex)
    return index === this.correctAnswerIndex;
  }
}

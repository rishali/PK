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
  isOptionDisabled = false;


  constructor(private router: Router , private pokemonApiService:PokemonApiServiceService){
  }

  ngOnInit(){
    this.fetchQuestion();
  }

  fetchQuestion(){
    this.pokemonApiService.getRandomPokemon().pipe(take(1)).subscribe((data) =>{this.question=data;
      console.log(this.question)
    });
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }

  checkAndNavigate(){

    if (this.currentQuestionNumber < this.totalQuestions) {
      this.currentQuestionNumber++;
      this.fetchQuestion();
    } 
    else {
      this.router.navigate(['/result']);
    }
  }
  
  selectOption(option:any) {
    console.log("selected ",option);
  }
}

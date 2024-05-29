import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiServiceService {

  private baseUrl="http://localhost:8080/"
  private questionPokemonUrl=`${this.baseUrl}questionPokemon`;
  private verifyPokemonUrl=`${this.baseUrl}verifyPokemon`;

  constructor(private http:HttpClient) { 
  }

  getRandomPokemon(){
    return this.http.get<any>(this.questionPokemonUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError('An error occurred');
      }));
  }

  verifySelectedPokemon(pokemon_id:number, selected_name:string){
    return this.http.get<any>(`${this.verifyPokemonUrl}?actual_id=${pokemon_id}&selected_name=${selected_name}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { questionPokemonUrl, verifyPokemonUrl } from '../../../assets/constant';
import { questionInterface, verifyPokemonResponseInterface } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiServiceService {
  constructor(private http: HttpClient) {}

  getRandomPokemon(): Observable<questionInterface> {
    return this.http.get<questionInterface>(questionPokemonUrl).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError('Server down');
      })
    );
  }

  verifySelectedPokemon(
    pokemon_id: number,
    selected_name: string
  ): Observable<verifyPokemonResponseInterface> {
    return this.http.get<verifyPokemonResponseInterface>(
      `${verifyPokemonUrl}?actual_id=${pokemon_id}&selected_name=${selected_name}`
    );
  }
}

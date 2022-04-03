import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Item, FullResponse, Pokemon } from '../model/pokemon';
import { PaginatedResponse } from '../model/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  allPokemons: Observable<Pokemon[]> = this.httpClient.get<PaginatedResponse<Item>>('https://pokeapi.co/api/v2/pokemon/')
    .pipe(
      map(response => response.results),
      mergeMap(results => forkJoin(results.map(result => this.httpClient.get<FullResponse>(result.url)))),
      map(responses => responses.map(response => ({
        name: response.name,
        'number': response.id,
        'types': response.types.map(t => t.type.name),
        image: response.sprites.front_default
      }) as Pokemon)),
    );

  constructor(private httpClient: HttpClient) { }


}

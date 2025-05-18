import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DADATA_TOKEN } from './DADATA_TOKEN';
import { DadataSuggestions } from '../interfaces/dadata.interface';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class DadataService {
  #apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  #http = inject(HttpClient)
  getSuggestion(query: string) {
    return this.#http.post<{suggestions: DadataSuggestions[]}>(this.#apiUrl, {query}, {
      headers: {
        'Authorization': `Token ${DADATA_TOKEN}`
      }
    }).pipe(
      map(res => {
        return Array.from(new Set(res.suggestions.map(suggestion => {
          return suggestion.data.city
        })));
      })
    )
  }
}

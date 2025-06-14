import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '@tt/data-access';

@Injectable({
  providedIn: 'root'
})

export class NameValidator implements AsyncValidator {
  http = inject(HttpClient)

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http.get<Profile[]>('/yt-course/account/test_accounts')
      .pipe(
        delay(1000),
        map((users) => {
          const inputValue = control.value;
          const names = users.map(u => u.firstName);
          const isValid = names.some(name => name === inputValue);
          return isValid
            ? null
            : {
              nameValid: {
                message: `Имя должно быть одним из: ${names.join(', ')}`
              }
            };
        }),

      );
  }

}

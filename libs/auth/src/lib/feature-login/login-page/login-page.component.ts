import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@tt/data-access';
import { TtInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit{
  AuthService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl<string | null>('PieForce', Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(val => {
      console.log(val);
    })
  }

  onSubmit(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);
      //@ts-ignore
      this.AuthService.login(this.form.value).subscribe((val) => {
        this.router.navigate(['']);
        console.log(val);
      });
    }
  }
}

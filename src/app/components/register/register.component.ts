import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: SupabaseService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [
        Validators.minLength(7),
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    this.loading = true;
    this.auth
      .signUp(this.registerForm.value.email, this.registerForm.value.password)
      .then((res) => {
        console.log(res.data.user);
        this.router.navigate(['/login'])
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}

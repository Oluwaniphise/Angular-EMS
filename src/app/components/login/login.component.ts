import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false
  loginForm!: FormGroup
  constructor(private fb: FormBuilder, private activatedRoute:ActivatedRoute, private router: Router, private auth: SupabaseService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]) ,
      password: this.fb.control('', [Validators.minLength(7), Validators.required])
    })
  }

  onSubmit() {
    this.loading = true;
    this.auth.signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then(async (res) => {
        if(res?.data?.user?.role === 'authenticated'){
          this.auth.saveSessiontoLocalStorage(res.data.session?.access_token)
          this.auth.isLoginSubject.next(true)
          this.router.navigate(['/dashboard'])
    
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });
  }
 
}

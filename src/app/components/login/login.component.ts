import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  emailControl!: FormControl;
  passwordControl!: FormControl;
  constructor(private fb: FormBuilder, private supabase: SupabaseService, private activatedRoute:ActivatedRoute, private router: Router, private auth: SupabaseService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]] ,
      password: ['',  [Validators.minLength(7), Validators.required]]
    })

    this.emailControl = this.loginForm.get('email') as FormControl;
    this.passwordControl = this.loginForm.get('password') as FormControl;
  }


  onSubmit() {
    this.loading = true;
    this.auth.signIn(this.loginForm.value.email, this.loginForm.value.password)
      .then( async (res) => {
        console.log(res.data)
        if(res?.data?.user?.role === 'authenticated'){
          localStorage.setItem('supabaseUser', JSON.stringify(res.data.user)) 
          this.auth.saveSessiontoLocalStorage(res.data.session?.access_token);
          this.auth.isLoginSubject.next(true);
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

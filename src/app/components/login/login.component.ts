import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirecodeErrorService } from 'src/app/services/firecode-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  token:string | undefined;

  constructor(
    private fb : FormBuilder,
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private router: Router,
    private firebaseError: FirecodeErrorService) { 

      this.loginUsuario=this.fb.group({
        email:['' , Validators.required],
        password:['', Validators.required]
      })
    }

  ngOnInit(): void {
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password).then((user)=>{

      
     
      if (user.user?.emailVerified) {
       

        this.router.navigate(['']);
        
      }else{
        this.router.navigate(['/verificar-correo']);
      }

      
    }).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    });

  }

}

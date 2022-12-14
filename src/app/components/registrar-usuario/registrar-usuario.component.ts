import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder,  Validators} from '@angular/forms'
import {  AngularFireAuth} from '@angular/fire/auth'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirecodeErrorService } from 'src/app/services/firecode-error.service';
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  registrarUsuario : FormGroup;
  loading : boolean=false;

  constructor(
    private fb : FormBuilder,
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private router: Router,
    private firebaseError: FirecodeErrorService ) {

    this.registrarUsuario= this.fb.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
      repetirPassword: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password= this.registrarUsuario.value.password;
    const repetirPassword= this.registrarUsuario.value.repetirPassword;

    if (password != repetirPassword) {

      this.toastr.error('las contraseñas ingresadas no cohiciden ', 'error');

      return;
      
    }
    this.loading=true;

    this.afAuth.createUserWithEmailAndPassword(email, password).then((user=>
      {this.verificarCorreo();
        this.loading=false;

      })).catch((error)=>{
        this.loading=false;
        console.log(error);
        this.toastr.error(this.firebaseError.codeError(error.code), 'error')
      });
  
  }

verificarCorreo(){
  this.afAuth.currentUser.then(user=> user?.sendEmailVerification())
                          .then(()=>{
                            this.toastr.info(
                              'Le enviamos un correo electronico para confirmar el email, resvise el spam ',
                              'Verificacion de correo'
                            )
                            this.router.navigate(['/login'])
                          });

}

}

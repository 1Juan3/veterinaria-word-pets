import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirecodeErrorService } from 'src/app/services/firecode-error.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarUsuario : FormGroup;

  

  constructor(
    private fb : FormBuilder,
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private router: Router,
    private firebaseError: FirecodeErrorService
  ) { 
    this.recuperarUsuario= this.fb.group({

      correo:['', Validators.required]

    })
  }

  ngOnInit(): void {
  }

  recuperar(){
    const email = this.recuperarUsuario.value.correo;

    this.afAuth.sendPasswordResetEmail(email).then(()=>{

      this.toastr.info('Le Enviamos un correo para Restablecer su contraseña ','Resetear Contraseña')

      this.router.navigate(['/login'])
    }).catch((error)=>{
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');

    })
  }

}

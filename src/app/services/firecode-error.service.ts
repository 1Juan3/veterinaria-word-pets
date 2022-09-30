import { Injectable } from '@angular/core';
import { FirebaseCodeMenuError } from '../utils/firebase.code-error';

@Injectable({
  providedIn: 'root'
})
export class FirecodeErrorService {

  constructor() {
  }
  codeError( code: string){
    switch (code) {
      case FirebaseCodeMenuError.EmailAlreadyInUse:
        return 'el usuario ya existe';
      case FirebaseCodeMenuError.WeakPassword:
        return 'la contraseña es muy devil';
      case FirebaseCodeMenuError.InvalidEmail:
        return 'correo invalido o contraseña invalida';
      case FirebaseCodeMenuError.UserNotFound:
        return 'el correo no se encuentra en la base de datos ';
      case FirebaseCodeMenuError.WrongPassworde:
        return 'contraseña invalida';
      case FirebaseCodeMenuError.networkRequestFailed:
        return 'Conectate a una red de internet';
      case FirebaseCodeMenuError.wrongpassword:
        return 'Contraseña o correo invalido';
        default: 
        return 'error desconocido';

        

    }

  }
}

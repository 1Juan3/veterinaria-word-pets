import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PaqueteService } from 'src/app/services/paquetes.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-paquete',
  templateUrl: './list-paquete.component.html',
  styleUrls: ['./list-paquete.component.css']
})
export class ListPaqueteComponent implements OnInit {
  dataUser:any;
  paquetes: any[] = [];

  constructor(private _paqueteService: PaqueteService,
              private toastr: ToastrService,
              private afAuth: AngularFireAuth,
              private router: Router
              ) {
  }

  ngOnInit(): void {
 
    this.getPaquetes()
  }

  getPaquetes() {
    this._paqueteService.getPaquetes().subscribe(data => {
      this.paquetes = [];
      data.forEach((element: any) => {
        this.paquetes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.paquetes);
    });
  }

  eliminarPaquete(id: string) {
    this._paqueteService.eliminarPaquete(id).then(() => {
      console.log('paquete eliminado con exito');
      this.toastr.error('El paquete fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

  logOut(){

    this.afAuth.signOut().then(()=> this.router.navigate(['/login']));
    

  }

}
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {  PaqueteService} from '../../services/paquetes.service'

@Component({
  selector: 'app-card-servicio',
  templateUrl: './card-servicio.component.html',
  styleUrls: ['./card-servicio.component.css']
})
export class CardServicioComponent implements OnInit {
 paquetes : any[]=[]
  constructor(
    private _paqueteService : PaqueteService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

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
  logOut(){

    this.afAuth.signOut().then(()=> this.router.navigate(['/']));
    

  }

}

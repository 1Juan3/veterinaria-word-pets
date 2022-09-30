import { Component, OnInit , } from '@angular/core';
import {ProductoService } from "../../services/product.service";

import {AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],

})
export class CardsComponent implements OnInit {

  productos: any[] = [];

  constructor( private _productService:ProductoService ,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos() {
    this._productService.getProductos().subscribe(data => {
      this.productos = [];
      data.forEach((element: any) => {
        this.productos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.productos);
    });
  }
  logOut(){

    this.afAuth.signOut().then(()=> this.router.navigate(['/']));
    

  }

}

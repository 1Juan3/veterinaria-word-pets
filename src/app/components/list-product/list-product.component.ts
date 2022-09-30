
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/services/product.service';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  dataUser:any;
  productos: any[] = [];

  constructor(private _productService: ProductoService,
              private toastr: ToastrService,
              private afAuth: AngularFireAuth,
              private router: Router
              ) {
  }

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

  eliminarProducto(id: string) {
    this._productService.eliminarProducto(id).then(() => {
      console.log('empelado eliminado con exito');
      this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!', {
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


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';




@Component({
  selector: 'app-crear-product',
  templateUrl: './crear-product.component.html',
  styleUrls: ['./crear-product.component.css']
})
export class CrearProductComponent implements OnInit {



  dataUser:any;
  createProducto: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Producto';

  constructor(private fb: FormBuilder,
    private _productoService: ProductoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth) {
    this.createProducto = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      valor: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      cantidad : ['', Validators.required]

    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {

    this.esEditar();
  }

  agregarEditarProductos() {
    this.submitted = true;

    if (this.createProducto.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarProducto();
    } else {
      this.editarProducto(this.id);
    }

  }

  agregarProducto() {
    const producto: any = {
      nombre: this.createProducto.value.nombre,
      categoria: this.createProducto.value.categoria,
      valor: this.createProducto.value.valor,
      descripcion: this.createProducto.value.descripcion,
      imagen:this.createProducto.value.imagen,
      cantidad: this.createProducto.value.cantidad,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._productoService.agregarProducto(producto).then(() => {
      this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/listarproductos'])
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarProducto(id: string) {

    const producto: any = {
      nombre: this.createProducto.value.nombre,
      categoria: this.createProducto.value.categoria,
      valor: this.createProducto.value.valor,
      descripcion: this.createProducto.value.descripcion, 
      imagen:this.createProducto.value.imagen,     
      cantidad:this.createProducto.value.cantidad, 
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._productoService.actualizarProducto(id, producto).then(() => {
      this.loading = false;
      this.toastr.info('El Producto fue modificado con exito', 'Producto modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/listarproductos']);
    })
  }


  esEditar() {
    
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this.loading = true;
      this._productoService.getProducto(this.id).subscribe(data => {
        this.loading = false;
        this.createProducto.setValue({
          nombre: data.payload.data()['nombre'],
          categoria: data.payload.data()['categoria'],
          valor: data.payload.data()['valor'],
          descripcion: data.payload.data()['descripcion'],
          imagen:data.payload.data()['imagen'],
          cantidad: data.payload.data()['cantidad'],
        })
      })
    }
  }

 


    

    

  }



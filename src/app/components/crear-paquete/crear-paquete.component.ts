import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaqueteService } from 'src/app/services/paquetes.service';

@Component({
  selector: 'app-crear-paquete',
  templateUrl: './crear-paquete.component.html',
  styleUrls: ['./crear-paquete.component.css']
})
export class CrearPaqueteComponent implements OnInit {

  dataUser:any;

  createPaquete: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Paquete';

  constructor(private fb: FormBuilder,
    private _paqueteService: PaqueteService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createPaquete = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarPaquetes() {
    this.submitted = true;

    if (this.createPaquete.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarPaquete();
    } else {
      this.editarPaquete(this.id);
    }

  }

  agregarPaquete() {
    const empleado: any = {
      nombre: this.createPaquete.value.nombre,
      categoria: this.createPaquete.value.categoria,
      descripcion: this.createPaquete.value.descripcion,
      imagen: this.createPaquete.value.imagen,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._paqueteService.agregarPaquete(empleado).then(() => {
      this.toastr.success('El paquete fue registrado con exito!', 'Paquete Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/listarpaquetes'])
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarPaquete(id: string) {

    const paquete: any = {
      nombre: this.createPaquete.value.nombre,
      categoria: this.createPaquete.value.categoria,
      descripcion: this.createPaquete.value.descripcion, 
      imagen: this.createPaquete.value.imagen,     
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._paqueteService.actualizarPaquete(id, paquete).then(() => {
      this.loading = false;
      this.toastr.info('El Paquete fue modificado con exito', 'Paquete modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/listarpaquete']);
    })
  }


  esEditar() {
    
    if (this.id !== null) {
      this.titulo = 'Editar paquete';
      this.loading = true;
      this._paqueteService.getPaquete(this.id).subscribe(data => {
        this.loading = false;
        this.createPaquete.setValue({
          nombre: data.payload.data()['nombre'],
          categoria: data.payload.data()['categoria'],
          descripcion: data.payload.data()['descripcion'],
          imagen: data.payload.data()['imagen'],

        })
      })
    }
  }

}
import { ConfirmacionCorreoComponent } from './components/confirmacion-correo/confirmacion-correo.component';
import { CardServicioComponent } from './components/card-servicio/card-servicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListPaqueteComponent } from './components/list-paquete/list-paquete.component';

import { CardsComponent } from './components/cards/cards.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { CrearProductComponent } from './components/crear-product/crear-product.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CrearPaqueteComponent } from './components/crear-paquete/crear-paquete.component';

const routes: Routes = [
  { path:'dashboard', component:DashboardComponent},
  { path: 'registro-usuario', component:RegistrarUsuarioComponent},
  { path: 'verificar-correo', component:ConfirmacionCorreoComponent},
  { path: 'crearProducto', component:CrearProductComponent},
  { path: 'editProducto/:id', component: CrearProductComponent },
  { path: 'listarproductos', component:ListProductComponent},
  { path: 'producto', component:CardsComponent},
  { path: 'paquetes', component:CardServicioComponent},
  { path: 'crearpaquetes', component:CrearPaqueteComponent},
  { path: 'editPaquete/:id', component:CrearPaqueteComponent}, 
  { path: 'listarpaquete', component: ListPaqueteComponent},
  { path: 'login', component:LoginComponent},
  { path: 'recuperar-password', component:RecuperarPasswordComponent },
  { path: 'list-empleados', component: ListEmpleadosComponent },
  { path: 'create-empleado', component: CreateEmpleadoComponent },
  { path: 'editEmpleado/:id', component: CreateEmpleadoComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

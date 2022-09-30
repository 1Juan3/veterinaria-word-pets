
import { PaqueteService } from './services/paquetes.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Moudulos
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';


import { AngularFirestoreModule,  } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// Componente
import { AppComponent } from './app.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { ConfirmacionCorreoComponent } from './components/confirmacion-correo/confirmacion-correo.component';
import { CrearProductComponent } from './components/crear-product/crear-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ProductoService } from './services/product.service';
import { CardsComponent } from './components/cards/cards.component';
import { CrearPaqueteComponent } from './components/crear-paquete/crear-paquete.component';
import { ListPaqueteComponent } from './components/list-paquete/list-paquete.component';
import { CardServicioComponent } from './components/card-servicio/card-servicio.component';


@NgModule({
  declarations: [
    ListEmpleadosComponent,
    CreateEmpleadoComponent,
    NavbarComponent,
    RegistrarUsuarioComponent,
    AppComponent,
    LoginComponent,
    RecuperarPasswordComponent,
    ConfirmacionCorreoComponent,
    CrearProductComponent,
    ListProductComponent,
    CardsComponent,
    CrearPaqueteComponent,
    ListPaqueteComponent,
    CardServicioComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
  
  ],
  providers: [EmpleadoService, ProductoService, PaqueteService],
  bootstrap: [AppComponent],

  exports:[RouterModule]
})
export class AppModule { }

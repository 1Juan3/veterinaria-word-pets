import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor(private firestore: AngularFirestore) { }

  agregarPaquete(paquete: any): Promise<any> {
    return this.firestore.collection('paquetes').add(paquete);
  }

  getPaquetes(): Observable<any> {
    return this.firestore.collection('paquetes', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  eliminarPaquete(id: string): Promise<any> {
    return this.firestore.collection('paquetes').doc(id).delete();
  }

  getPaquete(id: string): Observable<any> {
    return this.firestore.collection('paquetes').doc(id).snapshotChanges();
  }

  actualizarPaquete(id: string, data:any): Promise<any> {
    return this.firestore.collection('paquetes').doc(id).update(data);
  }

}

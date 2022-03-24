import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from './components/productos/productos.component';
import { UserComponent } from './components/user/user.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [  
  {
    path: '',
    redirectTo:'/',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'ventas',
    component: VentasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

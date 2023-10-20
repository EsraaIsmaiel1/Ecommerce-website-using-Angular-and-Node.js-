import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './service/auth.guard';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AddProductComponent } from './components/products/admin/add-product/add-product.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'product',component: ProductsComponent },
  {path: 'about',component: AboutComponent },
  {path:'product/:id',component:ProductDetailsComponent},
  {path: 'auth/register',component:RegisterComponent},
  {path: 'auth/login',component:LoginComponent},
  {path: 'product/:id/edit',component: AddProductComponent ,canActivate: [authGuard]},
  {path:'404',component: NotFoundComponent},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

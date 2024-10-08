import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
const routes: Routes = [{ path: 'login', component: LoginComponent }];
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, ForgetPasswordComponent],
})
export class AuthModule {}

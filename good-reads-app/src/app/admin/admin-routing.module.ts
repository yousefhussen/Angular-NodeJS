import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';

const routes: Routes = [{ path: 'categories', component: CategoryListComponent }];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

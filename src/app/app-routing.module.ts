import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowpageComponent } from './components/showpage/showpage.component';
import { EditorComponent } from './components/editor/editor.component';
import {RouteErrorComponent} from "./components/route-error/route-error.component";

const routes: Routes = [
  {path:'', component: ShowpageComponent},
  {path:'editor', component: EditorComponent},
  { path: '**', component: RouteErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

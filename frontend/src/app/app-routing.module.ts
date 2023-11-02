import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  //{ path: 'user/:id', component: UserComponent }
  { path: "", component: HomeComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "chat", component: ChatComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/* En el component.ts
import { ActivatedRoute } from '@angular/router';

// ...

constructor(private route: ActivatedRoute) {
  this.route.params.subscribe(params => {
    console.log(params.id);
  });
}
*/
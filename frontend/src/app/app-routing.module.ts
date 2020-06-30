import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { MainModule } from "./components/main/main.module";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => AuthModule,
  },
  {
    path: "main",
    loadChildren: () => MainModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

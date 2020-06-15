import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component'
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path:'',
    component: AuthComponent,
    children: [
      {
        path: 'signup',
        component: SignUpComponent
      },
      {
        path: 'signin',
        component: SignInComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule { }

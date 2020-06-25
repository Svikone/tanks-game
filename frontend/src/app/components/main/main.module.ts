import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpecificationComponent } from './specification/specification.component';


const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {
        path: '',
        component: SpecificationComponent
      },
      {
        path: 'game',
        component: GameComponent
      }
    ]
  },
];
@NgModule({
  declarations: [
    GameComponent, 
    MainComponent,
    SpecificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }

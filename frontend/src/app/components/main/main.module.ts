import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LobbyComponent } from "./lobby/lobby.component";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "../main/main.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SpecificationComponent } from "./specification/specification.component";
import { GameComponent } from "./game/game.component";
import { MessageService } from "./services/message.service";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: SpecificationComponent,
      },
      {
        path: "lobby",
        component: LobbyComponent,
      },
      {
        path: "game",
        component: GameComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    LobbyComponent,
    MainComponent,
    SpecificationComponent,
    GameComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  providers: [MessageService],
})
export class MainModule {}

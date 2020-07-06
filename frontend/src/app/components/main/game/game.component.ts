import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketService } from "../../../sevices/socket.service";
import { Subscription } from "rxjs";
import { MessageService } from "../services/message.service";
import { IStartGame } from "../../../core/interfaces/resStartGame.interfaces";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  message;
  // subscription: Subscription;

  constructor(
    private socket: SocketService,
    private messageService: MessageService
  ) {
    this.message = {};
    this.messageService.selectedCount$.subscribe((astronauts: IStartGame) => {
      this.message = astronauts;
    });
  }

  ngOnInit() {
    this.message.token = localStorage.getItem("token");
    console.log(this.message);
    this.sendGame();
    this.responseSocketGame();
  }

  sendGame() {
    this.socket.emit("Game", this.message).subscribe(
      (data) => {
        console.log("Success", data);
      },
      (error) => {
        console.log("Error", error);
      },
      () => {
        console.log("complete");
      }
    );
  }

  responseSocketGame() {
    this.socket.on("Game").subscribe((data) => {
      console.log("Success", data);
    });
  }

  shot(shot) {
    this.socket.emit("Shot", (this.message.shot = shot)).subscribe(
      (data) => {
        console.log("Success", data);
      },
      (error) => {
        console.log("Error", error);
      },
      () => {
        console.log("complete");
      }
    );
  }
}

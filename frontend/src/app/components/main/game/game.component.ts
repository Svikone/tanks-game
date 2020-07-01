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
  message: any;
  subscription: Subscription;
  msgList = [];

  constructor(
    private socket: SocketService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.subscription = this.messageService
      .getMessage()
      .subscribe((message) => {
        if (message) {
          this.message = message;
        }
        // this.msgList.push(message);
        console.log(message);
      });
    console.log(this.message);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}

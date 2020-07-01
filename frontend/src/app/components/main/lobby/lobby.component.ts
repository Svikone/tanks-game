import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../sevices/http.service";
import { EApiUrls } from "../../../core/enums/api-urls.enums";
import { SocketService } from "../../../sevices/socket.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { MessageService } from "../services/message.service";
import { IStartGame } from "../../../core/interfaces/resStartGame.interfaces";

@Component({
  selector: "app-game",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"],
})
export class LobbyComponent implements OnInit {
  public show: Boolean = true;
  public game = {
    name: "q",
    tanks: {
      position: [],
      shot: [],
    },
  };

  constructor(
    private http: HttpService,
    private socket: SocketService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.responseSocketStartGame();
  }

  createTanks(position) {
    const coord = this.game.tanks.position;
    const tanks = coord.findIndex((t) => t.coord === position);
    tanks != -1 ? coord.splice(tanks, 1) : coord.push({ coord: position });
  }

  findTank(index) {
    return this.game.tanks.position.some((t) => t.coord === index);
  }

  sendTanks() {
    this.show = !this.show;
    this.socket.emit("startGame", this.game).subscribe(
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

  responseSocketStartGame() {
    this.socket.on("startGame").subscribe((data: IStartGame) => {
      console.log("Success", data);
      if (data) {
        this.messageService.sendMessage(data);
        this.show = !this.show;
        this.router.navigate(["main/game"]);
      }
    });
  }
}

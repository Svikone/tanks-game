import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../../sevices/http.service";
import { EApiUrls } from "../../../core/enums/api-urls.enums";
import { SocketService } from "../../../sevices/socket.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  public game = {
    name: "q",
    tanks: {
      position: [],
      shot: [],
    },
  };

  constructor(private http: HttpService, private socket: SocketService) {}

  ngOnInit() {}

  createTanks(position) {
    const coord = this.game.tanks.position;
    const tanks = coord.findIndex((t) => t.coord === position);
    if (tanks != -1) {
      coord.splice(tanks, 1);
    } else {
      coord.push({ coord: position });
    }
  }

  findTank(index) {
    return this.game.tanks.position.some((t) => t.coord === index);
  }

  sendTanks() {
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

  test() {
    // this.socket.on('startGame').subscribe((data) => {
    //   console.log("Success", data);
    // });

    this.socket.on("my startGame", (data: string) => {
      console.log(data);
    });
  }
}

import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import * as io from "socket.io-client";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket: any;

  constructor() {
    this.socket = io(environment.apiUrl);
    this.socket.on("connect", () => this.connected());
    this.socket.on("disconnect", () => this.disconnected());
    this.socket.on("error", (error: string) => {
      console.log(`ERROR: "${error}" (${environment.apiUrl})`);
    });
  }

  connect() {
    this.socket.connect();
  }
  disconnect() {
    this.socket.disconnect();
  }

  emit(chanel: string, message: any) {
    return new Observable<any>((observer) => {
      this.socket.emit(chanel, message, function (data) {
        if (data.success) {
          // Успех
          observer.next(data.msg);
        } else {
          // Что-то пошло не так
          observer.error(data.msg);
        }
        observer.complete();
      });
    });
  }

  on(event_name) {
    console.log(`listen to ${event_name}:`);
    return new Observable<any>((observer) => {
      this.socket.off(event_name);
      this.socket.on(event_name, (data) => {
        observer.next(data);
      });
    });
  }
  private connected() {
    console.log("Connected");
  }
  private disconnected() {
    console.log("Disconnected");
  }
}

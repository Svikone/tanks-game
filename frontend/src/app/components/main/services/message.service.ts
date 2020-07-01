import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IStartGame } from "../../../core/interfaces/resStartGame.interfaces";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: IStartGame) {
    console.log(message);
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

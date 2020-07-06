import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { IStartGame } from "../../../core/interfaces/resStartGame.interfaces";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private activeTabIndex = new BehaviorSubject<any>(null);
  public activeTabIndexs = new BehaviorSubject<any>(null);
  activeTab$ = this.activeTabIndex.asObservable();
  selectedCount$ = this.activeTabIndexs.asObservable();
  constructor() {}
  fnActiveTabIs(astronaut: IStartGame) {
    this.activeTabIndex.next(astronaut);
  }
  fnSelected(astronauts: IStartGame) {
    this.activeTabIndexs.next(astronauts);
  }
}

import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Subject} from "rxjs";
import {Observable} from "rxjs";

@Injectable()
export class EventsService {
  private listeners: {};
  private eventsSubject: Subject<any>;
  private events: Observable<any>;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Rx.Subject();

    this.events = Rx.Observable.from(this.eventsSubject);

    this.events.subscribe(
      ({name, args}) => {
        if (this.listeners[name]) {
          for (let listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  off(name) {
    if (this.listeners[name]) {
      delete this.listeners[name];
    }
  }

  broadcast(name, ...args) {
    this.eventsSubject.next({
      name,
      args
    });
  }
}

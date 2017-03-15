var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
export let EventsService = class EventsService {
    constructor() {
        this.listeners = {};
        this.eventsSubject = new Rx.Subject();
        this.events = Rx.Observable.from(this.eventsSubject);
        this.events.subscribe(({ name, args }) => {
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
};
EventsService = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], EventsService);
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/services/events/events.service.js.map
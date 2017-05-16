import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss']
})
export class MyScheduleComponent implements OnInit {

  public events: any = []
  headerConfig: any;

  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Mi Calendario',
      link: '/client/my-schedule',
      active: true
    }
  ];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    };
  }

  loadEvents(event) {
    let start = event.view.start
    let end = event.view.end
    console.log(start, end);
    this.apiService.all('client/user/events?start=' + start.format('YYYY-MM-DD') + '&end=' + end.format('YYYY-MM-DD')).subscribe((response) => {
      this.events = response.data
    })
  }

}

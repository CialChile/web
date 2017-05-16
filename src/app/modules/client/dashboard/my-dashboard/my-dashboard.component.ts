import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent} from "primeng/components/common/api";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {ACTIVITIESTOEXECUTECOLUMNS} from "./activitiesToExecuteColumns";
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../services/api.service";
import {UserService} from "../../../auth/services/user.service";

@Component({
  selector: 'app-my-dashboard',
  templateUrl: 'my-dashboard.component.html',
  styleUrls: ['my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {
  public lastActivitiesToExecuteLoadEvent: LazyLoadEvent;
  public activitiesToExecuteColumns = ACTIVITIESTOEXECUTECOLUMNS;
  activitiesToExecute;
  public totalRecords: number;
  public totalSupervisedRecords: number;
  supervisedActivities;
  hasSupervisedActivities: boolean = true;
  activitiesSummary: any;
  activitiesCount: any;
  noSummaryGraphData: boolean = false;
  summary: any;

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager, private userService: UserService) {
  }

  ngOnInit() {
    this.apiService.all('client/user/activities-summary-graph').subscribe((data) => {
      this.activitiesSummary = data;
      this.noSummaryGraphData = !data.labels.length;
    });

    this.apiService.all('client/user/activities-summary-count').subscribe((data) => {
      this.activitiesCount = data;
    });

    this.userService.getUser().subscribe((user) => {
      this.summary = user;
    })
  }

  reloadActivitiesToExecuteTable(event: LazyLoadEvent) {
    this.lastActivitiesToExecuteLoadEvent = event;
    this.datatableService.getData(event, this.activitiesToExecuteColumns, 'client/user/activities-to-execute', 'activitySchedule.activity,status', '')
      .toPromise().then((response) => {
      this.activitiesToExecute = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  reloadSupervisedActivitiesTable(event: LazyLoadEvent) {
    this.lastActivitiesToExecuteLoadEvent = event;
    this.datatableService.getData(event, this.activitiesToExecuteColumns, 'client/user/supervised-activities', 'activitySchedule.activity,status', '')
      .toPromise().then((response) => {
      this.supervisedActivities = response.data;
      this.totalSupervisedRecords = response.recordsFiltered;
      this.hasSupervisedActivities = !!response.recordsTotal;
    })
  }

  executeSchedule(schedule) {

  }

  closeSchedule(schedule) {

  }

}

import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent} from "primeng/components/common/api";
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {UserService} from "../../../auth/services/user.service";
import {ACTIVITIESTOEXECUTECOLUMNS} from "../../dashboard/my-dashboard/activitiesToExecuteColumns";

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {

  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Mis Actividades',
      link: '/client/my-activities',
      active: true
    }
  ];
  public lastActivitiesToExecuteLoadEvent: LazyLoadEvent;
  public activitiesToExecute: any;
  public totalRecords: number;
  public activitiesToExecuteColumns = ACTIVITIESTOEXECUTECOLUMNS;
  public supervisedActivities: any;
  public totalSupervisedRecords: any;
  public hasSupervisedActivities: boolean = true;
  public hasExpiredActivities: boolean = true;
  public expiredActivities: any;
  public totalExpiredRecords: any;

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager, private userService: UserService) {
  }

  ngOnInit() {
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

  reloadExpiredActivitiesTable(event: LazyLoadEvent) {
    this.lastActivitiesToExecuteLoadEvent = event;
    this.datatableService.getData(event, this.activitiesToExecuteColumns, 'client/user/expired-activities', 'activitySchedule.activity,status', '')
      .toPromise().then((response) => {
      this.expiredActivities = response.data;
      this.totalExpiredRecords = response.recordsFiltered;
      this.hasExpiredActivities = !!response.recordsTotal;
    })
  }

  executeSchedule(schedule) {

  }

  closeSchedule(schedule) {

  }

}

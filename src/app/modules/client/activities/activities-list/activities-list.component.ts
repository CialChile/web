import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../types/table/data-table-column.type";
import {ACTIVITIESCOLUMNS} from "./activitiesColumns";
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
import {ACTIVITYSCHEDULESCOLUMNS} from "./activitySchedulesColumns";

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public activities: any;
  public tableView: boolean = true;
  public lastLoadEvent: LazyLoadEvent;
  public columns: DataTableColumn[] = ACTIVITIESCOLUMNS;
  public scheduleColumns: DataTableColumn[] = ACTIVITYSCHEDULESCOLUMNS;

  public breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Actividades',
      link: '/client/activities',
      active: true
    },
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {

  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/activities/datatable', 'programType,template,schedules.asset', this.globalSearch)
      .toPromise().then((response) => {
      this.activities = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }


  create() {
    this.router.navigate(['/client/activities/create']);

  }

  edit(activity) {
    this.router.navigate(['/client/activities/' + activity.id]);

  }

  remove(activity) {
    this.toastr.warning('Falta implementar');
    /*
     this.apiService.destroy('client/activities', activity.id).subscribe((response) => {
     this.toastr.success('Actividad Eliminada con Éxito');
     this.reloadTable(this.lastLoadEvent);
     },
     (error) => {
     this.toastr.error(error);
     })
     */
  }

  schedule(activity) {
    this.router.navigate(['/client/activities/' + activity.id + '/schedules/create']);

  }

  editSchedule(schedule) {
    this.router.navigate(['/client/activities/' + schedule.activity_id + '/schedules/' + schedule.id]);
  }

  history(schedule) {

  }

  removeSchedule(schedule) {
    this.toastr.warning('Falta implementar');
    /*
     this.apiService.destroy('client/activities/' + schedule.activity_id + '/schedules', schedule.id).subscribe((response) => {
     this.toastr.success('Programación Eliminada con Éxito');
     this.reloadTable(this.lastLoadEvent);
     },
     (error) => {
     this.toastr.error(error);
     })
     */
  }

}

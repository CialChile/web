import {Component, OnInit} from '@angular/core';
import {STATUSCOLUMNS} from "./statusColumns";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit {

  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public statuses: any;
  public tableView: boolean = true;
  public statusesColumns = STATUSCOLUMNS;
  columnOptions: SelectItem[];
  public lastLoadEvent: LazyLoadEvent;
  public columns: DataTableColumn[] = [];
  public STATUS_TYPES = [
    {value: 0, label: 'Activo'},
    {value: 1, label: 'Documento'},
    {value: 2, label: 'Certificación'},
  ];

  public breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Configuración',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Status',
      link: '/client/configuration/status',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.statusesColumns.length; i++) {
      this.columns.push(this.statusesColumns[i]);
      this.columnOptions.push({label: this.statusesColumns[i].name, value: this.statusesColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.statusesColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.statusesColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.statusesColumns[i]);
      }
    }
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/config/status/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.statuses = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  getStatusTypeLabel(statusType) {
    return this.STATUS_TYPES[statusType].label;
  };

  create() {
    this.router.navigate(['/client/configuration/status/create']);

  }

  edit(status) {
    this.router.navigate(['/client/configuration/status/' + status.id]);

  }

  remove(status) {
    this.apiService.destroy('client/config/status', status.id).subscribe((response) => {
        this.toastr.success('Status Eliminado con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }
}

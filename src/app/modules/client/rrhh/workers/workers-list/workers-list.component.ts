import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";

@Component({
  selector: 'app-workers-list',
  templateUrl: 'workers-list.component.html',
  styleUrls: ['workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  private totalRecords: number;
  private pageLength: number = 10;
  private globalSearch: string;
  private workers: any;
  columnOptions: SelectItem[];
  private lastLoadEvent: LazyLoadEvent;
  private columns: DataTableColumn[] = [
    {
      name: 'Nombre',
      data: 'first_name',
      sort: true,
      filter: true,
    }, {
      name: 'Apellido',
      data: 'last_name',
      sort: true,
      filter: true
    }, {
      name: 'Rut/Pasaporte',
      data: 'rut_passport',
      sort: true,
      filter: true
    }, {
      name: 'Cargo',
      data: 'position',
      sort: true,
      filter: true
    }
  ];
  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'RRHH',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Trabajadores',
      link: '/client/rrhh/workers',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.columns.length; i++) {
      this.columnOptions.push({label: this.columns[i].name, value: this.columns[i]});
    }

  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/worker/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.workers = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  create() {
    this.router.navigate(['/client/rrhh/workers/create']);

  }

  edit(worker) {
    this.router.navigate(['/client/rrhh/workers/' + worker.id]);

  }

  remove(worker) {
    this.apiService.destroy('client/worker', worker.id).subscribe((response) => {
        this.toastr.success('Trabajador Eliminado con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }

}

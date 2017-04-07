import {Component, OnInit} from '@angular/core';
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss']
})
export class AdminUsersListComponent implements OnInit {
  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public users: any;
  columnOptions: SelectItem[];
  public lastLoadEvent: LazyLoadEvent;
  public columns: DataTableColumn[] = [];
  public userColumns: DataTableColumn[] = [
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
      name: 'Correo Electrónico',
      data: 'email',
      sort: true,
      filter: true
    }
  ];
  breadcrumbs = [
    {
      title: 'Home',
      link: '/admin/dashboard',
      active: false
    },
    {
      title: 'Seguridad',
      link: '/admin/dashboard',
      active: false
    },
    {
      title: 'Usuarios',
      link: '/admin/security/users',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager,) {

  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.userColumns.length; i++) {
      if (i < 4) {
        this.columns.push(this.userColumns[i]);
      }
      this.columnOptions.push({label: this.userColumns[i].name, value: this.userColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'admin/users/datatable', this.globalSearch)
      .toPromise().then((response) => {
      this.users = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.userColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.userColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.userColumns[i]);
      }
    }
  }

  create() {
    this.router.navigate(['/admin/security/users/create']);
  }

  edit(user) {
    this.router.navigate(['/admin/security/users/' + user.id]);

  }

  remove(user) {
    this.apiService.destroy('admin/users', user.id).subscribe((response) => {
      this.toastr.success('Usuario Eliminado con Exito');
      this.reloadTable(this.lastLoadEvent);
    })
  }

  ngOnDestroy() {
  }

}

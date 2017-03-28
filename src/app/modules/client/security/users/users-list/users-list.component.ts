import {Component, OnInit} from '@angular/core';
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  private totalRecords: number;
  private pageLength: number = 10;
  private globalSearch: string;
  private users: any;
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
      name: 'Correo Electrónico',
      data: 'email',
      sort: true,
      filter: true
    }, {
      name: 'Rol',
      data: 'role.name',
      sort: false,
      filter: false
    }
  ];
  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Seguridad',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Usuarios',
      link: '/client/security/users',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
               private router: Router, private toastr: ToastsManager,) {

  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.columns.length; i++) {
      this.columnOptions.push({label: this.columns[i].name, value: this.columns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/secure-users/datatable', 'role', this.globalSearch)
      .toPromise().then((response) => {
      this.users = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  create() {
    this.router.navigate(['/client/security/users/create']);
  }

  edit(user) {
    this.router.navigate(['/client/security/users/' + user.id]);

  }

  remove(user) {
    this.apiService.destroy('client/secure-users', user.id).subscribe((response) => {
      this.toastr.success('Usuario Eliminado con Exito');
      this.reloadTable(this.lastLoadEvent);
    })
  }

  ngOnDestroy() {
  }

}

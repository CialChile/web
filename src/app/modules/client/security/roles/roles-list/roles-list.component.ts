import {Component, OnInit} from '@angular/core';
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {LazyLoadEvent, SelectItem} from "primeng/components/common/api";
@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  private totalRecords: number;
  private pageLength: number = 10;
  private globalSearch: string;
  private roles: any;
  columnOptions: SelectItem[];
  private lastLoadEvent: LazyLoadEvent;

  private columns: DataTableColumn[] = [];

  private roleColumns: DataTableColumn[] = [
    {
      name: 'Nombre',
      data: 'name',
      sort: true,
      filter: true,
    }, {
      name: 'Descripción',
      data: 'description',
      sort: true,
      filter: true
    }
  ];
  private breadcrumbs = [
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
      title: 'Roles',
      link: '/client/security/roles',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager,) {

  }


  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.roleColumns.length; i++) {
      if (i < 2) {
        this.columns.push(this.roleColumns[i]);
      }
      this.columnOptions.push({label: this.roleColumns[i].name, value: this.roleColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/roles/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.roles = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.roleColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.roleColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.roleColumns[i]);
      }
    }
  }

  create() {
    this.router.navigate(['/client/security/roles/create']);
  }

  edit(role) {
    this.router.navigate(['/client/security/roles/' + role.id]);

  }

  remove(role) {
    this.apiService.destroy('client/roles', role.id).subscribe((response) => {
      this.toastr.success('Rol Eliminado con Exito');
      this.reloadTable(this.lastLoadEvent);
    })
  }

  ngOnDestroy() {

  }

}

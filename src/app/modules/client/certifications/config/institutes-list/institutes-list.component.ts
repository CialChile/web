import {Component, OnInit} from '@angular/core';
import {INSTITUTESCOLUMNS} from "./institutesColumns";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-institutes-list',
  templateUrl: './institutes-list.component.html',
  styleUrls: ['./institutes-list.component.scss']
})
export class InstitutesListComponent implements OnInit {
  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public institutes: any;
  public institutesColumns = INSTITUTESCOLUMNS;
  columnOptions: SelectItem[];
  public lastLoadEvent: LazyLoadEvent;
  public columns: DataTableColumn[] = [];
  public breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Certificaciones',
      link: '/client/certifications/list',
      active: false
    },
    {
      title: 'Institutos',
      link: '/client/certifications/config/institutes',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.institutesColumns.length; i++) {
      if (i < 4) {
        this.columns.push(this.institutesColumns[i]);
      }
      this.columnOptions.push({label: this.institutesColumns[i].name, value: this.institutesColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/certifications/config/institutes/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.institutes = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.institutesColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.institutesColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.institutesColumns[i]);
      }
    }
  }

  create() {
    this.router.navigate(['/client/certifications/config/institutes/create']);

  }

  edit(institute) {
    this.router.navigate(['/client/certifications/config/institutes/' + institute.id]);

  }

  remove(institute) {
    this.apiService.destroy('client/certifications/config/institutes', institute.id).subscribe((response) => {
        this.toastr.success('Instituto eliminado con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }


}

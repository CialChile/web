import {Component, OnInit} from '@angular/core';
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-program-types-list',
  templateUrl: './program-types-list.component.html',
  styleUrls: ['./program-types-list.component.scss']
})
export class ProgramTypesListComponent implements OnInit {

  public totalRecords: number;
  public globalSearch: string;
  public programTypes: any;
  public pageLength: number = 10;
  columnOptions: SelectItem[];
  public lastLoadEvent: LazyLoadEvent;
  public columns: DataTableColumn[] = [];
  public programTypesColumns: DataTableColumn[] = [
    {
      name: 'Nombre',
      data: 'name',
      sort: true,
      filter: true,
    }, <DataTableColumn> {
      name: '¿Es inspección o Mantenimiento?',
      data: 'is_inspection',
      sort: true,
      filter: true,
      format: (data) => {
        return data.is_inspection ? 'Si' : 'No'
      }
    }, {
      name: 'Creado El',
      data: 'created_at',
      sort: true,
      filter: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {

  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.programTypesColumns.length; i++) {
      if (i < 4) {
        this.columns.push(this.programTypesColumns[i]);
      }
      this.columnOptions.push({label: this.programTypesColumns[i].name, value: this.programTypesColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'admin/activities/program-types/datatable','', this.globalSearch)
      .toPromise().then((response) => {
      this.programTypes = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.programTypesColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.programTypesColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.programTypesColumns[i]);
      }
    }
  }

  create() {
    this.router.navigate(['/admin/console/activities/program-types/create']);

  }

  edit(programType) {
    this.router.navigate(['/admin/console/activities/program-types/' + programType.id]);

  }

  remove(programType) {

  }
}

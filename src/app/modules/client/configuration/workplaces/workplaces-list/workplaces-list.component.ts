import { Component, OnInit } from '@angular/core';
import {WORKPLACECOLUMNS} from "./workplacesColumns";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-workplaces-list',
  templateUrl: './workplaces-list.component.html',
  styleUrls: ['./workplaces-list.component.scss']
})
export class WorkplacesListComponent implements OnInit {


  private totalRecords: number;
  private pageLength: number = 10;
  private globalSearch: string;
  private workplaces: any;
  private tableView: boolean = true;
  private workplacesColumns = WORKPLACECOLUMNS;
  columnOptions: SelectItem[];
  private lastLoadEvent: LazyLoadEvent;
  private columns: DataTableColumn[] = [];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.workplacesColumns.length; i++) {
      this.columns.push(this.workplacesColumns[i]);
      this.columnOptions.push({label: this.workplacesColumns[i].name, value: this.workplacesColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/assets/config/workplaces/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.workplaces = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.workplacesColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.workplacesColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.workplacesColumns[i]);
      }
    }
  }

  create() {
    this.router.navigate(['/client/configuration/workplaces/create']);

  }

  edit(asset) {
    this.router.navigate(['/client/configuration/workplaces/' + asset.id]);

  }

  remove(asset) {
    this.apiService.destroy('client/assets/config/workplaces', asset.id).subscribe((response) => {
        this.toastr.success('Lugar de Trabajo Eliminado con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }

}

import {Component, OnInit} from '@angular/core';
import {BRANDCOLUMNS} from "./brandsColumns";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  private totalRecords: number;
  private pageLength: number = 10;
  private globalSearch: string;
  private brands: any;
  private tableView: boolean = true;
  private brandsColumns = BRANDCOLUMNS;
  columnOptions: SelectItem[];
  private lastLoadEvent: LazyLoadEvent;
  private columns: DataTableColumn[] = [];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.brandsColumns.length; i++) {
      this.columns.push(this.brandsColumns[i]);
      this.columnOptions.push({label: this.brandsColumns[i].name, value: this.brandsColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/assets/config/brands/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.brands = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.brandsColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.brandsColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.brandsColumns[i]);
      }
    }
  }

  create() {
    this.router.navigate(['/client/configuration/brands/create']);

  }

  edit(asset) {
    this.router.navigate(['/client/configuration/brands/' + asset.id]);

  }

  remove(asset) {
    this.apiService.destroy('client/assets/config/brands', asset.id).subscribe((response) => {
        this.toastr.success('Marca Eliminada con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }

}

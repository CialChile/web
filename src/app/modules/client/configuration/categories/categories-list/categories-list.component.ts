import { Component, OnInit } from '@angular/core';
import {CATEGORIESCOLUMNS} from "./categoriesColumns";
import {LazyLoadEvent, SelectItem} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {


  private totalRecords: number;
  private pageLength: number = 10;
  private globalSearch: string;
  private categories: any;
  private tableView: boolean = true;
  private categoriesColumns = CATEGORIESCOLUMNS;
  columnOptions: SelectItem[];
  private lastLoadEvent: LazyLoadEvent;
  private columns: DataTableColumn[] = [];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    this.columns = this.categoriesColumns;
    for (let i = 0; i < this.categoriesColumns.length; i++) {
      this.columnOptions.push({label: this.categoriesColumns[i].name, value: this.categoriesColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/assets/config/categories/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.categories = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  create() {
    this.router.navigate(['/client/configuration/categories/create']);

  }

  edit(asset) {
    this.router.navigate(['/client/configuration/categories/' + asset.id]);

  }

  remove(asset) {
    this.apiService.destroy('client/assets/config/categories', asset.id).subscribe((response) => {
        this.toastr.success('Categoría Eliminada con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }


}

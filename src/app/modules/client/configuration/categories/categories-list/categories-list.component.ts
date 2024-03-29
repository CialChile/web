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


  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public categories: any;
  public tableView: boolean = true;
  public categoriesColumns = CATEGORIESCOLUMNS;
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
      title: 'Configuración',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Categorías',
      link: '/client/configuration/categories',
      active: true
    }
  ];
  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.categoriesColumns.length; i++) {
      this.columns.push(this.categoriesColumns[i]);
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
  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.categoriesColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.categoriesColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.categoriesColumns[i]);
      }
    }
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

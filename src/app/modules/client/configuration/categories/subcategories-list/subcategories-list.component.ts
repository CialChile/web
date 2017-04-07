import {Component, OnInit} from '@angular/core';
import {SUBCATEGORIESCOLUMNS} from "./subcategoriesColumns";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.scss']
})
export class SubcategoriesListComponent implements OnInit {


  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public subcategories: any;
  public tableView: boolean = true;
  public subcategoriesColumns = SUBCATEGORIESCOLUMNS;
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
      title: 'Subcategorías',
      link: '/client/configuration/categories/subcategories',
      active: false
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.subcategoriesColumns.length; i++) {
      this.columns.push(this.subcategoriesColumns[i]);
      this.columnOptions.push({label: this.subcategoriesColumns[i].name, value: this.subcategoriesColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }


  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/assets/config/categories/null/subcategories/datatable', 'category', this.globalSearch)
      .toPromise().then((response) => {
      this.subcategories = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.subcategoriesColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.subcategoriesColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.subcategoriesColumns[i]);
      }
    }
  }

  create() {
    this.router.navigate(['/client/configuration/categories/subcategories/create']);

  }

  edit(subcategory) {
    this.router.navigate(['/client/configuration/categories/' + subcategory.category.id + '/subcategories/' + subcategory.id]);

  }

  remove(subcategory) {
    this.apiService.destroy('client/assets/config/brands/' + subcategory.category.id + '/brand-models', subcategory.id).subscribe((response) => {
        this.toastr.success('Subcategoría Eliminada con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }

}

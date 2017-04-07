import {Component, OnInit} from '@angular/core';
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {BRANDMODELSCOLUMNS} from "./brandsModelsColumns";

@Component({
  selector: 'app-brand-models-list',
  templateUrl: './brand-models-list.component.html',
  styleUrls: ['./brand-models-list.component.scss']
})
export class BrandModelsListComponent implements OnInit {

  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public brandModels: any;
  public tableView: boolean = true;
  public brandModelsColumns = BRANDMODELSCOLUMNS;
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
      title: 'Modelos',
      link: '/client/configuration/brand-models',
      active: true
    }
  ];
  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.brandModelsColumns.length; i++) {
      this.columns.push(this.brandModelsColumns[i]);
      this.columnOptions.push({label: this.brandModelsColumns[i].name, value: this.brandModelsColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/assets/config/brands/null/brand-models/datatable', 'brand', this.globalSearch)
      .toPromise().then((response) => {
      this.brandModels = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.brandModelsColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.brandModelsColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.brandModelsColumns[i]);
      }
    }
  }

  create() {
    this.router.navigate(['/client/configuration/brands/brand-models/create']);

  }

  edit(brandModel) {
    this.router.navigate(['/client/configuration/brands/' + brandModel.brand.id + '/brand-models/' + brandModel.id]);

  }

  remove(brandModel) {
    this.apiService.destroy('client/assets/config/brands/' + brandModel.brand.id + '/brand-models', brandModel.id).subscribe((response) => {
        this.toastr.success('Modelo Eliminado con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }
}

import {Component, OnInit} from '@angular/core';
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../../services/api.service";
import {ASSETSCOLUMNS} from "./assetsColumns";

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent implements OnInit {
  private totalRecords: number;
  private pageLength: number = 10;
  private globalSearch: string;
  private assets: any;
  private defaultImage: string = 'assets/img/missing/assets/missing.jpg';
  private tableView: boolean = true;
  private assetsColumns = ASSETSCOLUMNS;
  columnOptions: SelectItem[];
  private lastLoadEvent: LazyLoadEvent;
  private columns: DataTableColumn[] = [];
  private assetDefaultCoverImage = {
    source: 'assets/img/missing/assets/missing.jpg',
    thumbnail: 'assets/img/missing/assets/missing.jpg',
    title: 'Imagen por defecto'
  };

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.assetsColumns.length; i++) {
      if (i < 3) {
        this.columns.push(this.assetsColumns[i]);
      }
      this.columnOptions.push({label: this.assetsColumns[i].name, value: this.assetsColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/assets/datatable', 'brand,brandModel,category,subcategory,workplace,status,coverImage', this.globalSearch)
      .toPromise().then((response) => {
      this.assets = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.assetsColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.assetsColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.assetsColumns[i]);
      }
    }
  }

  getData(asset, property) {
    const properties = property.split('.');
    if (properties.length > 1) {
      return this.getData(asset[properties[0]], properties.reduce((previous, actual, index) => {
        if (index != 1) {
          return previous + '.' + actual;
        }
        return actual
      }))
    }

    return asset[property];
  }

  showDetail(asset: any) {
    this.router.navigate(['/client/assets/' + asset.id + '/info']);

  }


  create() {
    this.router.navigate(['/client/assets/create']);

  }

  edit(asset) {
    this.router.navigate(['/client/assets/' + asset.id]);

  }

  remove(asset) {
    this.apiService.destroy('client/assets', asset.id).subscribe((response) => {
        this.toastr.success('Activo Eliminado con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }

}

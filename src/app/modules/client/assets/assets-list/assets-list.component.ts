import {Component, OnInit} from '@angular/core';
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../../services/api.service";

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
  private defaultImage: string = 'assets/img/missing.png';
  private tableView: boolean = true;
  columnOptions: SelectItem[];
  private lastLoadEvent: LazyLoadEvent;
  private columns: DataTableColumn[] = [
    {
      name: 'Nombre',
      data: 'first_name',
      sort: true,
      filter: true,
    }, {
      name: 'Apellido',
      data: 'last_name',
      sort: true,
      filter: true
    }, {
      name: 'Rut/Pasaporte',
      data: 'rut_passport',
      sort: true,
      filter: true
    }, {
      name: 'Cargo',
      data: 'position',
      sort: true,
      filter: true
    }
  ];
  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Activos',
      link: '/client/assets',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.columns.length; i++) {
      this.columnOptions.push({label: this.columns[i].name, value: this.columns[i]});
    }

  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/assets/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.assets = response.data;
      this.totalRecords = response.recordsFiltered;
    })
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

import {Component, OnInit, OnDestroy} from '@angular/core';
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {Router} from "@angular/router";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../types/table/data-table-column.type";
import {ApiService} from "../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'admin-list-companies',
  templateUrl: 'admin-list-companies.component.html',
  styleUrls: ['admin-list-companies.component.scss']
})
export class AdminListCompaniesComponent implements OnInit, OnDestroy {
  private totalRecords: number;
  private globalSearch: string;
  private companies: any;
  private pageLength: number = 10;
  columnOptions: SelectItem[];
  private lastLoadEvent: LazyLoadEvent;
  private columns: DataTableColumn[] = [
    {
      name: 'Nombre',
      data: 'name',
      sort: true,
      filter: true,
    }, {
      name: 'Nombre Comercial',
      data: 'commercial_name',
      sort: true,
      filter: true
    }, {
      name: 'Identificación Fiscal',
      data: 'fiscal_identification',
      sort: true,
      filter: true
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

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'admin/companies/datatable', '', this.globalSearch)
      .toPromise().then((response) => {
      this.companies = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  create() {
    this.router.navigate(['/admin/companies/create']);

  }

  edit(company) {
    this.router.navigate(['/admin/companies/' + company.id]);

  }

  remove(company) {

  }

  toggleActive(event, company) {
    this.apiService.update('admin/companies/toggle-active', company.id, company).toPromise().then((response) => {
      if (company.active) {
        this.toastr.success('La empresa ' + company.name + ' fue activada');
      } else {
        this.toastr.success('La empresa ' + company.name + ' fue desactivada');
      }
    })
  }

  ngOnDestroy() {

  }

}

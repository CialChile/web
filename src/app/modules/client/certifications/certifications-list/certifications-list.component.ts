import {Component, OnInit} from '@angular/core';
import {CERTIFICATIONSCOLUMNS} from "./certificationsColumns";
import {SelectItem, LazyLoadEvent} from "primeng/components/common/api";
import {DataTableColumn} from "../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-certifications-list',
  templateUrl: './certifications-list.component.html',
  styleUrls: ['./certifications-list.component.scss']
})
export class CertificationsListComponent implements OnInit {
  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public certifications: any;
  public certificationsColumns = CERTIFICATIONSCOLUMNS;
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
      title: 'Certificaciones',
      link: '/client/certifications/list',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.columnOptions = [];
    for (let i = 0; i < this.certificationsColumns.length; i++) {
      if (i < 5) {
        this.columns.push(this.certificationsColumns[i]);
      }
      this.columnOptions.push({label: this.certificationsColumns[i].name, value: this.certificationsColumns[i]});
    }
  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/certifications/datatable', 'status,institute,type', this.globalSearch)
      .toPromise().then((response) => {
      this.certifications = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  columnsChange(event) {
    this.columns = [];
    for (let i = 0; i < this.certificationsColumns.length; i++) {
      const columnSelected = event.value.filter((selectedColumn) => {
        return selectedColumn.data == this.certificationsColumns[i].data;
      });
      if (columnSelected.length) {
        this.columns.push(this.certificationsColumns[i]);
      }
    }
  }

  getData(certification, property) {
    const properties = property.split('.');
    if (properties.length > 1) {
      return this.getData(certification[properties[0]], properties.reduce((previous, actual, index) => {
        if (index != 1) {
          return previous + '.' + actual;
        }
        return actual
      }))
    }

    return certification[property];
  }

  showDetail(certification: any) {
    this.router.navigate(['/client/certifications/' + certification.id + '/info']);

  }


  create() {
    this.router.navigate(['/client/certifications/create']);

  }

  edit(certification) {
    this.router.navigate(['/client/certifications/' + certification.id]);

  }

  remove(certification) {
    this.apiService.destroy('client/certifications', certification.id).subscribe((response) => {
        this.toastr.success('Certificación Eliminada con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }

}

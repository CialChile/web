import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent} from "primeng/components/common/api";
import {TEMPLATESCOLUMNS} from "./templatesColumns";
import {DataTableColumn} from "../../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss']
})
export class TemplatesListComponent implements OnInit {

  public totalRecords: number;
  public pageLength: number = 10;
  public globalSearch: string;
  public templates: any;
  public tableView: boolean = true;
  public lastLoadEvent: LazyLoadEvent;
  public columns: DataTableColumn[] = TEMPLATESCOLUMNS;

  public breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Actividades',
      link: '/client/activities',
      active: false
    },
    {
      title: 'Plantillas',
      link: '/client/activities/templates',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {

  }

  searchGlobally() {
    this.lastLoadEvent.globalFilter = this.globalSearch;
    this.reloadTable(this.lastLoadEvent);
  }

  reloadTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    this.datatableService.getData(event, this.columns, 'client/activities/templates/datatable', 'programType', this.globalSearch)
      .toPromise().then((response) => {
      this.templates = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }


  create() {
    this.router.navigate(['/client/activities/templates/create']);

  }

  edit(template) {
    this.router.navigate(['/client/activities/templates/' + template.id]);

  }

  copy(template) {
    this.router.navigate(['/client/activities/templates/' + template.id, {clone: true}]);

  }

  remove(template) {
    this.apiService.destroy('client/activities/templates', template.id).subscribe((response) => {
        this.toastr.success('Plantilla Eliminada con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }

  toggleActive(event, template) {
    this.apiService.update('client/activities/templates', template.id + '/toggle-active', template).toPromise().then((response) => {
      this.toastr.success(response.message);
    })
  }
}

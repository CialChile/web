import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent} from "primeng/components/common/api";
import {TEMPLATESCOLUMNS} from "./templatesColumns";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {DataTableColumn} from "../../../../types/table/data-table-column.type";
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'admin-templates-list',
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
      link: '/admin/console/dashboard',
      active: false
    },
    {
      title: 'Actividades',
      link: '/admin/console/dashboard',
      active: false
    },
    {
      title: 'Plantillas',
      link: '/admin/console/activities/templates',
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
    this.datatableService.getData(event, this.columns, 'admin/activities/templates/datatable', 'programType', this.globalSearch)
      .toPromise().then((response) => {
      this.templates = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }


  create() {
    this.router.navigate(['/admin/console/activities/templates/create']);

  }

  edit(template) {
    this.router.navigate(['/admin/console/activities/templates/' + template.id]);

  }

  remove(template) {
    this.apiService.destroy('admin/activities/templates', template.id).subscribe((response) => {
        this.toastr.success('Plantilla Eliminada con Exito');
        this.reloadTable(this.lastLoadEvent);
      },
      (error) => {
        this.toastr.error(error);
      })
  }
}

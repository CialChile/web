import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {DataTableDirective} from "../../../../../directives/datatable/angular-datatables.directive";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {EventsService} from "../../../../../services/events/events.service";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-workers-list',
  templateUrl: 'workers-list.component.html',
  styleUrls: ['workers-list.component.scss']
})
export class WorkersListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  private datatableEl: DataTableDirective;

  dtOptions: any = {};
  selectedWorker = null;
  selectedRowId: number = null;
  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'RRHH',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Trabajadores',
      link: '/client/rrhh/workers',
      active: true
    }
  ];

  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private eventsService: EventsService, private router: Router,
              private toastr: ToastsManager) {
    this.eventsService.on('menu-toggle', () => {
      console.log('hole');
    })
  }

  ngOnInit() {
    const columns = [{
      title: 'Nombre',
      data: 'first_name'
    }, {
      title: 'Apellido',
      data: 'last_name'
    }, {
      title: 'Rut/Pasaporte',
      data: 'rut_passport'
    }, {
      title: 'Cargo',
      data: 'position'
    }];
    this.dtOptions = this.datatableService.init('client/worker/datatable', columns);
    this.dtOptions.rowCallback = (nRow: any, aData: any) => {
      let self = this;
      if (aData.id == self.selectedRowId) {
        $(nRow).children().addClass('row-selected');
      }
      $('td', nRow).unbind('click');
      $('td', nRow).bind('click', () => {
        let id = aData.id;
        if (id === self.selectedRowId) {
          self.selectedRowId = null;
        } else {
          self.selectedRowId = id;
        }
        if ($('td', nRow).hasClass('row-selected')) {
          $('td', nRow).removeClass('row-selected');
          self.selectedWorker = null;
        }
        else {
          $('td.row-selected').removeClass('row-selected');
          $('td', nRow).addClass('row-selected');
          self.rowClicked(aData);
        }
      });
    }
  }

  rowClicked(data) {
    this.selectedWorker = data;
  }

  create() {
    this.router.navigate(['/client/rrhh/workers/create']);

  }

  edit() {
    this.router.navigate(['/client/rrhh/workers/' + this.selectedWorker.id]);

  }

  remove() {
    this.apiService.destroy('client/worker', this.selectedWorker.id).subscribe((response) => {
        this.toastr.success('Trabajador Eliminado con Exito');
        this.selectedWorker = null;
        this.datatableEl.dtInstance.then((dtInstance) => {
          dtInstance.ajax.reload();
        });
      },
      (error) => {
        this.toastr.error(error);
      })
  }

  ngOnDestroy() {
    this.eventsService.off('menu-toggle');
  }

}

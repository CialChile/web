import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "../../../../../directives/datatable/angular-datatables.directive";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {EventsService} from "../../../../../services/events/events.service";
import {Router} from "@angular/router";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  private datatableEl: DataTableDirective;

  dtOptions: any = {};
  selectedRole = null;
  selectedRowId: number = null;
  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Seguridad',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Roles',
      link: '/client/security/roles',
      active: true
    }
  ];
  constructor(private datatableService: DatatableService, private apiService: ApiService,
              private eventsService: EventsService, private router: Router, private toastr: ToastsManager,) {
    this.eventsService.on('menu-toggle', () => {
      console.log('hole');
    })
  }


  ngOnInit() {
    const columns = [{
      title: 'Nombre',
      data: 'name'
    }, {
      title: 'Descripción',
      data: 'description'
    }];
    this.dtOptions = this.datatableService.init('client/role/datatable', columns);
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
          self.selectedRole = null;
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
    this.selectedRole = data;
  }

  create() {
    this.router.navigate(['/client/security/roles/create']);

  }

  edit() {
    this.router.navigate(['/client/security/roles/' + this.selectedRole.id]);

  }

  remove() {
    this.apiService.destroy('client/role', this.selectedRole.id).subscribe((response) => {
      this.toastr.success('Rol Eliminado con Exito');
      this.selectedRole = null;
      this.datatableEl.dtInstance.then((dtInstance) => {
        dtInstance.ajax.reload();
      });

    })
  }

  ngOnDestroy() {
    this.eventsService.off('menu-toggle');
  }


}

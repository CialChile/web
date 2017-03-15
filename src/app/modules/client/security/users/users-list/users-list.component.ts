import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from "../../../../../directives/datatable/angular-datatables.directive";
import {DatatableService} from "../../../../../services/datatable/datatable.service";
import {ApiService} from "../../../../../services/api.service";
import {EventsService} from "../../../../../services/events/events.service";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  private datatableEl: DataTableDirective;

  dtOptions: any = {};
  selectedUser = null;
  selectedUserId: number = null;
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
      title: 'Usuarios',
      link: '/client/security/users',
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
      data: 'first_name'
    }, {
      title: 'Apellido',
      data: 'last_name'
    }, {
      title: 'Correo Electrónico',
      data: 'email'
    }, {
      title: 'Rol',
      data: 'role.name',
      searchable: false,
      sortable: false
    }];
    this.dtOptions = this.datatableService.init('client/secure-user/datatable', columns, 'role');
    this.dtOptions.rowCallback = (nRow: any, aData: any) => {
      let self = this;
      if (aData.id == self.selectedUserId) {
        $(nRow).children().addClass('row-selected');
      }
      $('td', nRow).unbind('click');
      $('td', nRow).bind('click', () => {
        let id = aData.id;
        if (id === self.selectedUserId) {
          self.selectedUserId = null;
        } else {
          self.selectedUserId = id;
        }
        if ($('td', nRow).hasClass('row-selected')) {
          $('td', nRow).removeClass('row-selected');
          self.selectedUser = null;
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
    this.selectedUser = data;
  }

  create() {
    this.router.navigate(['/client/security/users/create']);

  }

  edit() {
    this.router.navigate(['/client/security/users/' + this.selectedUser.id]);

  }

  remove() {
    this.apiService.destroy('client/secure-user', this.selectedUser.id).subscribe((response) => {
      this.toastr.success('Usuario Eliminado con Exito');
      this.selectedUser = null;
      this.datatableEl.dtInstance.then((dtInstance) => {
        dtInstance.ajax.reload();
      });

    })
  }

  ngOnDestroy() {
    this.eventsService.off('menu-toggle');
  }

}

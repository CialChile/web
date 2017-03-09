import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {DatatableService} from "../../../../services/datatable/datatable.service";
import {EventsService} from "../../../../services/events/events.service";
import {Router} from "@angular/router";
import {DataTableDirective} from "../../../../directives/datatable/angular-datatables.directive";

@Component({
  selector: 'admin-list-companies',
  templateUrl: 'admin-list-companies.component.html',
  styleUrls: ['admin-list-companies.component.scss']
})
export class AdminListCompaniesComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  private datatableEl: DataTableDirective;

  dtOptions: any = {};
  selectedCompany = null;
  selectedRowId: number = null;

  constructor(private datatableService: DatatableService, private eventsService: EventsService, private router: Router) {
    this.eventsService.on('menu-toggle', () => {
      console.log('hole');
    })
  }

  ngOnInit() {
    const columns = [{
      title: 'Nombre',
      data: 'name'
    }, {
      title: 'Nombre Comercial',
      data: 'commercial_name'
    }];
    this.dtOptions = this.datatableService.init('company/datatable', columns);
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
          self.selectedCompany = null;
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
    this.selectedCompany = data;
  }

  create() {
    this.router.navigate(['/admin/companies/create']);

  }

  edit() {
    this.router.navigate(['/admin/companies/' + this.selectedCompany.id]);

  }

  remove() {

  }

  ngOnDestroy() {
    this.eventsService.off('menu-toggle');
  }

}

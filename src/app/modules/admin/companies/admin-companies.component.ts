import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableService} from "../../../services/datatable/datatable.service";
import {EventsService} from "../../../services/events/events.service";
import {DataTableDirective} from "angular-datatables";

@Component({
  selector: 'admin-companies',
  templateUrl: 'admin-companies.component.html',
  styleUrls: ['admin-companies.component.scss']
})
export class AdminCompaniesComponent implements OnInit {
  @ViewChild(DataTableDirective)
  private datatableEl: DataTableDirective;

  dtOptions: any = {};
  selectedCompany = null;
  selectedRowId: number = null;

  constructor(private datatableService: DatatableService, private eventsService: EventsService) {
    this.eventsService.on('menu-toggle', () => {
      this.datatableEl.dtInstance.then(dtInstance => console.log(dtInstance));
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

  }

  edit() {

  }

  remove() {

  }

}

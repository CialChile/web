import {Component, OnInit, Input} from '@angular/core';
import {LazyLoadEvent} from "primeng/components/common/api";
import {ASSETSCOLUMNS} from "../../../assets/assets-list/assetsColumns";
import {DatatableService} from "../../../../../services/datatable/datatable.service";

@Component({
  selector: 'app-manage-activity-assets',
  templateUrl: './manage-activity-assets.component.html',
  styleUrls: ['./manage-activity-assets.component.scss']
})
export class ManageActivityAssetsComponent implements OnInit {

  @Input() activity;
  @Input() assetSearchUrl = 'client/assets/datatable';
  selectedAssets = [];
  addingAssets: boolean = false;
  public totalRecords: number;
  public pageLength: number = 10;
  public assetsGlobalSearch: string = '';
  public assets: any;
  public lastLoadEvent: LazyLoadEvent;
  public columns = [];

  constructor(private datatableService: DatatableService) {
    this.columns = ASSETSCOLUMNS.slice(0, 3);

  }

  ngOnInit() {
  }


  addAsset() {
    this.addingAssets = true;
    this.assets = [];
    this.selectedAssets = [];

  }

  removeAsset(asset) {
    const index = this.activity.assets.indexOf(asset);
    this.activity.assets = [...this.activity.assets.slice(0, index), ...this.activity.assets.slice(index + 1)];

  }

  searchAssetsGlobally($event) {
    this.assetsGlobalSearch = $event.target.value;
    this.lastLoadEvent.globalFilter = this.assetsGlobalSearch;
    this.reloadAssetsTable(this.lastLoadEvent);
  }

  reloadAssetsTable(event: LazyLoadEvent) {
    this.lastLoadEvent = event;
    const exceptAssetsIds = this.activity.assets.length ? this.selectedAssetsIdsParser() : '';
    this.datatableService.getData(event, this.columns, this.assetSearchUrl, 'status', this.assetsGlobalSearch, exceptAssetsIds ? 'except=' + exceptAssetsIds : '')
      .toPromise().then((response) => {
      this.assets = response.data;
      this.totalRecords = response.recordsFiltered;
    })
  }

  addSelectedAssets() {
    this.addingAssets = false;
    this.activity.assets = [...this.activity.assets, ...this.selectedAssets];
  }

  cancelAddAsset() {
    this.addingAssets = false;
  }

  private selectedAssetsIdsParser() {
    if (this.activity.assets.length == 1) {
      return this.activity.assets[0].id;
    }
    return this.activity.assets.reduce((previousAsset, currentAsset, currentIndex) => {
      if (previousAsset.hasOwnProperty('id')) {
        previousAsset = previousAsset.id
      }

      if (currentAsset) {
        return previousAsset + ',' + currentAsset.id;
      }
      return previousAsset;
    });
  }

}

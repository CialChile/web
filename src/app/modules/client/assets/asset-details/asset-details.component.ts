import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  private assetId: number;
  private defaultImage: string = 'assets/img/missing/assets/missing.jpg';
  private defaultWorkerImage: string = 'assets/img/missing/worker/missing.png';
  private asset: any;

  private breadcrumbs = [
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
      title: 'Activos',
      link: '/client/assets',
      active: false
    },
    {
      title: 'Información',
      link: '/client/assets/info',
      active: true
    }
  ];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute,
              private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.assetId = params['id'];
      this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/assets/' + params['id'] + '/info';
      this.apiService.one('client/assets', params['id'], 'category,brand,brandModel,subcategory,workplace,worker,status,images,coverImage').subscribe((asset) => {
        this.asset = asset.data;
      })
    });
  }

  edit() {
    this.router.navigate(['/client/assets/' + this.assetId]);

  }

  remove() {
    this.apiService.destroy('client/assets', this.assetId).subscribe((response) => {
        this.toastr.success('Activo Eliminado con Exito');
        this.router.navigate(['/client/assets/']);
      },
      (error) => {
        this.toastr.error(error);
      })
  }
}

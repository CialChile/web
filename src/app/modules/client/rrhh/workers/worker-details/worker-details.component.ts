import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../../services/api.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-worker-details',
  templateUrl: 'worker-details.component.html',
  styleUrls: ['worker-details.component.scss']
})
export class WorkerDetailsComponent implements OnInit {
  public workerId: number;
  public defaultImage: string = 'assets/img/missing.png';

  public breadcrumbs = [
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
      active: false
    },
    {
      title: 'Información',
      link: '/client/rrhh/workers/info',
      active: true
    }
  ];
  public worker: any;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute,
              private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.workerId = params['id'];
      this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/rrhh/workers/' + params['id'] + '/info';
      this.apiService.one('client/workers', params['id'], 'assets,certifications.documents').subscribe((worker) => {
        this.worker = worker.data;
      })
    });
  }

  edit() {
    this.router.navigate(['/client/rrhh/workers/' + this.workerId]);

  }

  showAsset(asset) {
    this.router.navigate(['/client/assets/' + asset.id]);

  }

  remove() {
    this.apiService.destroy('client/workers', this.workerId).subscribe((response) => {
        this.toastr.success('Trabajador Eliminado con Exito');
        this.router.navigate(['/client/rrhh/workers/']);
      },
      (error) => {
        this.toastr.error(error);
      })
  }
}

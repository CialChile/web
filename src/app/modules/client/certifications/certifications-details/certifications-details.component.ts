import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-certifications-details',
  templateUrl: './certifications-details.component.html',
  styleUrls: ['./certifications-details.component.scss']
})
export class CertificationsDetailsComponent implements OnInit {

  public certificationId: number;
  public certification: any;
  public breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Certificaciones',
      link: '/client/certifications/list',
      active: false
    },
    {
      title: 'Información',
      link: '/client/certifications/info',
      active: true
    }
  ];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute,
              private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.certificationId = params['id'];
      this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/certifications/' + params['id'] + '/info';
      this.apiService.one('client/certifications', params['id'], 'status,institute,type,assets,workers').subscribe((certification) => {
        this.certification = certification.data;
      })
    });
  }

  edit() {
    this.router.navigate(['/client/certifications/' + this.certificationId]);
  }

  showAsset(asset) {
    this.router.navigate(['/client/assets/' + asset.id]);
  }

  showWorker(worker) {
    this.router.navigate(['/client/rrhh/workers/' + worker.id]);
  }

  remove() {
    this.apiService.destroy('client/certifications', this.certificationId).subscribe((response) => {
        this.toastr.success('Certificación Eliminada con Exito');
        this.router.navigate(['/client/certifications/list']);
      },
      (error) => {
        this.toastr.error(error);
      })
  }

}

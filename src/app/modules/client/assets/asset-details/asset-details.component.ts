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
  private mapOptions: google.maps.MapOptions;
  private mapOverlays: google.maps.Marker[];
  private infoWindow: google.maps.InfoWindow;
  private selectedPosition: google.maps.LatLng;
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
    this.infoWindow = new google.maps.InfoWindow();
    this.route.params.subscribe((params) => {
      this.assetId = params['id'];
      this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/assets/' + params['id'] + '/info';
      this.apiService.one('client/assets', params['id'], 'category,brand,brandModel,subcategory,workplace,worker,status,images,coverImage,documents').subscribe((asset) => {
        if (!asset.data.coverImage) {
          asset.data.coverImage = {
            source: 'assets/img/missing/assets/missing.jpg',
            thumbnail: 'assets/img/missing/assets/missing.jpg',
            title: asset.data.name
          }
        }
        this.asset = asset.data;
        this.selectedPosition = new google.maps.LatLng(asset.data.latitude, asset.data.longitude);
        this.mapOptions = {
          center: this.selectedPosition,
          zoom: 8
        };
        this.initOverlays(asset.data.name);
      })
    });
  }

  edit() {
    this.router.navigate(['/client/assets/' + this.assetId]);

  }

  showDocument(document) {
    let reader = new FileReader();

    this.apiService.downloadDocument(this.assetId, document.id, document.mime_type)
      .subscribe(data => {
        let blob: Blob = data.blob();
        reader.readAsDataURL(blob)
      });

    reader.onloadend = function (e) {
      window.open(reader.result);
    }
  }

  initOverlays(name: string) {
    this.mapOverlays = [
      new google.maps.Marker({position: this.selectedPosition, title: name}),
    ];
  }

  handleMapOverlayClick(event) {
    let isMarker = event.overlay.getTitle != undefined;
    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());
    }
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

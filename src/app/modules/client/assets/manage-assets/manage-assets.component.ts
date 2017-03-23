import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-manage-assets',
  templateUrl: './manage-assets.component.html',
  styleUrls: ['./manage-assets.component.scss']
})
export class ManageAssetsComponent implements OnInit {

  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Activos',
      link: '/client/assets',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/assets/create',
      active: true
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}

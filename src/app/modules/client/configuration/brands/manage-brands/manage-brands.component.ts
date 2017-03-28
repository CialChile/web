import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html',
  styleUrls: ['./manage-brands.component.scss']
})
export class ManageBrandsComponent implements OnInit {

  private brandForm: any;
  private saving: boolean = false;
  private brandId: number;
  private loading: boolean = false;
  private title: string = 'Nueva Marca';
  private breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Configuración',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Marcas',
      link: '/client/configuration/brands',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/configuration/brands/create',
      active: true
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.brandForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Marca';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/configuration/brands/' + params['id'];
        this.brandId = params['id'];
        this.loading = true;
        this.apiService.one('client/assets/config/brands', params['id'], '').subscribe((brand) => {
          this.loading = false;
          this.initForm(brand.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(brand) {
    this.brandForm.reset(brand)
  }

  onSubmit() {
    let data = this.brandForm.value;
    this.saving = true;
    if (this.brandId) {
      this.apiService.update('client/assets/config/brands', this.brandId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Marca actualizada con exito');
          this.router.navigate(['/client/configuration/brands'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/assets/config/brands', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Marca creada con exito');
          this.router.navigate(['/client/configuration/brands'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/configuration/brands'])
  }

}

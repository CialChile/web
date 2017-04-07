import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-brand-models',
  templateUrl: './manage-brand-models.component.html',
  styleUrls: ['./manage-brand-models.component.scss']
})
export class ManageBrandModelsComponent implements OnInit {

  public brandModelForm: any;
  public saving: boolean = false;
  public brandModelId: number;
  public loading: boolean = false;
  public title: string = 'Nuevo Modelo';
  public breadcrumbs = [
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
      title: 'Modelos',
      link: '/client/configuration/brand-models',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/configuration/brand-models/create',
      active: true
    }
  ];
  public brandId: any;
  public brands: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.brandModelForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.apiService.all('client/assets/config/brands').subscribe(brands => this.brands = brands.data.map((brand) => {
      return {label: brand.name, value: brand.id}
    }));
    this.route.params.subscribe((params) => {
      if (params['brandModelId']) {
        this.title = 'Editar Modelo';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/configuration/brand-models/' + params['id'];
        this.brandModelId = params['brandModelId'];
        this.brandId = params['id'];
        this.loading = true;
        this.apiService.one('client/assets/config/brands/' + params['id'] + '/brand-models', params['brandModelId'], 'brand').subscribe((brandModel) => {
          this.loading = false;
          brandModel.data.brand = brandModel.data.brand.id;
          this.initForm(brandModel.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(brandModel) {
    this.brandModelForm.reset(brandModel)
  }

  onSubmit() {
    let data = this.brandModelForm.value;
    this.saving = true;
    if (this.brandModelId) {
      this.apiService.update('client/assets/config/brands/' + data.brand + '/brand-models', this.brandModelId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Modelo actualizado con exito');
          this.router.navigate(['/client/configuration/brands/brand-models'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/assets/config/brands/' + data.brand + '/brand-models', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Modelo creado con exito');
          this.router.navigate(['/client/configuration/brands/brand-models'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/configuration/brands/brand-models'])
  }

}

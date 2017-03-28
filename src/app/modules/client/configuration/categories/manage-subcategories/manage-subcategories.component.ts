import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-subcategories',
  templateUrl: './manage-subcategories.component.html',
  styleUrls: ['./manage-subcategories.component.scss']
})
export class ManageSubcategoriesComponent implements OnInit {

  private subcategoryForm: any;
  private saving: boolean = false;
  private subcategoryId: number;
  private loading: boolean = false;
  private title: string = 'Nueva Subcategoría';
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
      title: 'Modelos',
      link: '/client/configuration/categories/subcategories',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/configuration/categories/subcategories/create',
      active: true
    }
  ];
  private categoryId: any;
  private categories: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.subcategoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.apiService.all('client/assets/config/categories').subscribe(categories => this.categories = categories.data.map((category) => {
      return {label: category.name, value: category.id}
    }));
    this.route.params.subscribe((params) => {
      if (params['subcategoryId']) {
        this.title = 'Editar Subcategoría';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/configuration/categories/'+params['id']+'/subcategories/' + params['id'];
        this.subcategoryId = params['subcategoryId'];
        this.categoryId = params['id'];
        this.loading = true;
        this.apiService.one('client/assets/config/categories/' + params['id'] + '/subcategories', params['subcategoryId'], 'category').subscribe((subcategory) => {
          this.loading = false;
          subcategory.data.category = subcategory.data.category.id;
          this.initForm(subcategory.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(subcategory) {
    this.subcategoryForm.reset(subcategory)
  }

  onSubmit() {
    let data = this.subcategoryForm.value;
    this.saving = true;
    if (this.subcategoryId) {
      this.apiService.update('client/assets/config/categories/' + data.category + '/subcategories', this.subcategoryId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Subcategoría actualizada con exito');
          this.router.navigate(['/client/configuration/categories/subcategories'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/assets/config/categories/' + data.category + '/subcategories', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Subcategoría creada con exito');
          this.router.navigate(['/client/configuration/categories/subcategories'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/configuration/categories/subcategories'])
  }

}

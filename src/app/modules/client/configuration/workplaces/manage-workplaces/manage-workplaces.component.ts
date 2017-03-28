import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-workplaces',
  templateUrl: './manage-workplaces.component.html',
  styleUrls: ['./manage-workplaces.component.scss']
})
export class ManageWorkplacesComponent implements OnInit {

  private workplaceForm: any;
  private saving: boolean = false;
  private workplaceId: number;
  private loading: boolean = false;
  private title: string = 'Nuevo Lugar de Trabajo';
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
      title: 'Lugares de Trabajo',
      link: '/client/configuration/workplaces',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/configuration/workplaces/create',
      active: true
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.workplaceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Lugar de Trabajo';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/configuration/workplaces/' + params['id'];
        this.workplaceId = params['id'];
        this.loading = true;
        this.apiService.one('client/assets/config/workplaces', params['id'], '').subscribe((workplace) => {
          this.loading = false;
          this.initForm(workplace.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(workplace) {
    this.workplaceForm.reset(workplace)
  }

  onSubmit() {
    let data = this.workplaceForm.value;
    this.saving = true;
    if (this.workplaceId) {
      this.apiService.update('client/assets/config/workplaces', this.workplaceId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Lugar de trabajo actualizadoq con exito');
          this.router.navigate(['/client/configuration/workplaces'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/assets/config/workplaces', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Lugar de trabajo creado con exito');
          this.router.navigate(['/client/configuration/workplaces'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/configuration/workplaces'])
  }

}

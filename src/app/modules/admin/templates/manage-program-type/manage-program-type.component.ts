import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-program-type',
  templateUrl: './manage-program-type.component.html',
  styleUrls: ['./manage-program-type.component.scss']
})
export class ManageProgramTypeComponent implements OnInit {
  public programTypeForm: any;
  public saving: boolean = false;
  public programTypeId: number;
  public loading: boolean = false;
  public title: string = 'Nuevo Tipo de Programa';
  breadcrumbs = [
    {
      title: 'Home',
      link: '/admin/console/dashboard',
      active: false
    },
    {
      title: 'Actividades',
      link: '/admin/console/dashboard',
      active: false
    },
    {
      title: 'Tipo de Programas',
      link: '/admin/console/activities/program-types',
      active: false
    },
    {
      title: 'Create',
      link: '/admin/console/activities/program-types/create',
      active: false
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.programTypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      is_inspection: [true],
      has_assets: [true],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Tipo de Programa';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/admin/console/activities/program-types/' + params['id'];
        this.programTypeId = params['id'];
        this.loading = true;
        this.apiService.one('admin/activities/program-types', params['id'], '').subscribe((programType) => {

          this.initForm(programType.data);
          this.loading = false;
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(programType) {
    this.programTypeForm.reset(programType)
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    let data = this.programTypeForm.value;
    this.saving = true;
    if (this.programTypeId) {
      this.apiService.update('admin/activities/program-types', this.programTypeId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Tipo de Programa actualizado con éxito');
          this.router.navigate(['/admin/console/activities/program-types'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('admin/activities/program-types', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Tipo de Programa creado con éxito');
          this.router.navigate(['/admin/console/activities/program-types'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/admin/console/activities/program-types'])
  }

}

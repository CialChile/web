import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-manage-status',
  templateUrl: './manage-status.component.html',
  styleUrls: ['./manage-status.component.scss']
})
export class ManageStatusComponent implements OnInit {

  public statusForm: any;
  public saving: boolean = false;
  public statusId: number;
  public loading: boolean = false;
  public title: string = 'Nuevo Status';
  public STATUS_TYPES = [
    {value: 0, label: 'Activo'},
    {value: 1, label: 'Documento'}
  ];

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
      title: 'Status',
      link: '/client/configuration/status',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/configuration/status/create',
      active: true
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.statusForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Status';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/configuration/status/' + params['id'];
        this.statusId = params['id'];
        this.loading = true;
        this.apiService.one('client/config/status', params['id'], '').subscribe((status) => {
          this.loading = false;
          this.initForm(status.data)
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  initForm(status) {
    this.statusForm.reset(status)
  }

  onSubmit() {
    let data = this.statusForm.value;
    this.saving = true;
    if (this.statusId) {
      this.apiService.update('client/config/status', this.statusId, data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Status actualizado con exito');
          this.router.navigate(['/client/configuration/status'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    } else {
      this.apiService.create('client/config/status', data).subscribe((response) => {
          this.saving = false;
          this.toastr.success('Status creado con exito');
          this.router.navigate(['/client/configuration/status'])
        },
        (error) => {
          this.toastr.error(error);
          this.saving = false;
        })
    }
  }

  cancel() {
    this.router.navigate(['/client/configuration/status'])
  }
}

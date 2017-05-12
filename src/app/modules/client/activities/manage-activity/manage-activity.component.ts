import {Component, OnInit} from '@angular/core';
import {DATEPICKERSPANISH} from "../../../../components/forms/date/datepicker.locale";
import {FormBuilder, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {SelectItem} from "primeng/components/common/api";
import {TemplateParser} from "../../../../utilities/templates/parseTemplate";
import {DatatableService} from "../../../../services/datatable/datatable.service";

@Component({
  selector: 'app-manage-activity',
  templateUrl: './manage-activity.component.html',
  styleUrls: ['./manage-activity.component.scss']
})
export class ManageActivityComponent implements OnInit {
  public activityForm: any;
  public saving: boolean = false;
  public activityId: number;
  public loading: boolean = false;
  public title: string = 'Nueva Actividad';
  public initialized = false;

  breadcrumbs = [
    {
      title: 'Home',
      link: '/client/dashboard',
      active: false
    },
    {
      title: 'Actividades',
      link: '/client/activities',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/activities/create',
      active: true
    }
  ];
  public es = DATEPICKERSPANISH;
  templates: SelectItem[] = [];
  programTypes: SelectItem[] = [];
  loadingTemplate: boolean = false;
  canEditEquipment: boolean = false;
  hasSupervisor: boolean = false;
  supervisors = [];
  supervisorValidations;
  activity;
  hasAssets = true;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private datatableService: DatatableService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.activityForm = this.formBuilder.group({
      template_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      program_type_id: [{value: '', disabled: true}],
      equipment: this.formBuilder.group({
        equipmentList: this.formBuilder.array([])
      }),
      procedures: this.formBuilder.group({
        procedureList: this.formBuilder.array([])
      }),
      supervisor: [''],
      observations: this.formBuilder.array([])
    });

    this.activityForm.controls['template_id'].valueChanges.subscribe((value) => {
      if (value) {
        this.loadingTemplate = true;
        this.apiService.one('client/activities/templates', value, 'template,programType').subscribe((template) => {
          this.loadingTemplate = false;
          this.hasAssets = template.data.programType.has_assets;
          this.activityForm.controls['program_type_id'].setValue(template.data.program_type_id);
          let templateData = template.data.template;
          if (templateData.equipment) {
            this.canEditEquipment = templateData.equipment.editable;
          } else {
            this.canEditEquipment = true;
          }
          if (templateData.persons) {
            this.hasSupervisor = templateData.persons.hasSupervisor;
            if (this.hasSupervisor) {
              this.activityForm.controls['supervisor'].setValidators([Validators.required])
              this.supervisorValidations = templateData.persons.supervisor;
            }
          } else {
            this.hasSupervisor = false;
            this.activityForm.controls['supervisor'].setValue('');
          }
          if (this.activityId && !this.initialized) {
            this.initialized = true;
            templateData.general[0].value = this.activity.name;
            templateData.general[1].value = this.activity.description;
            if (templateData.procedures) {
              templateData.procedures.procedureList = this.activity.procedures.proceduresList;
            } else {
              templateData.procedures = {procedureList: this.activity.procedures.proceduresList};
            }

            if (templateData.equipment) {
              templateData.equipment.equipmentList = this.activity.equipment.equipmentList;
            } else {
              templateData.equipment = this.activity.equipment;
            }
          }
          this.activityForm = new TemplateParser(templateData, this.activityForm).parse();
        }, (error) => {
          this.loadingTemplate = false;
        });
      }
    });
  }


  ngOnInit() {

    this.apiService.all('client/activities/templates').subscribe(templates => this.templates = templates.data.map((template) => {
      return {label: template.name, value: template.id}
    }));
    this.apiService.all('client/activities/program-types').subscribe(programTypes => this.programTypes = programTypes.data.map((programType) => {
      return {label: programType.name, value: programType.id}
    }))

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.title = 'Editar Actividad';
        this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/activities/' + params['id'];
        this.activityId = params['id'];
        this.loading = true;
        this.apiService.one('client/activities', params['id'], 'template,equipmentList,proceduresList,supervisor,observations,assets.status').subscribe((activity) => {
          this.loading = false;
          activity.data.procedures = {'proceduresList': activity.data.proceduresList};
          activity.data.equipment = {'equipmentList': activity.data.equipmentList};
          this.activity = activity.data;
          this.initForm(activity.data);
        }, (error) => {
          this.loading = false;
        })
      } else {
        this.activity = {assets: []};
      }
    });
  }

  initForm(activity) {
    if (activity.observations.length) {
      activity.observations.forEach((observation) => {
        this.createObservation(observation.observation)
      })
    }
    this.activityForm.reset(activity)
  }

  get observations(): FormArray {
    return this.activityForm.get('observations') as FormArray
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    let validationError = false;
    let data = this.activityForm.getRawValue();
    data.assets = this.activity.assets;
    if (this.hasSupervisor && !data.supervisor.hasOwnProperty('id')) {
      this.toastr.error('Debe especificar un supervisor valido');
      validationError = true;
    }

    if (this.hasAssets && !data.assets.length) {
      this.toastr.error('Debe añadir uno o más activos antes de continuar');
      validationError = true;
    }

    if (!validationError) {
      if (this.activityId) {
        this.apiService.update('client/activities', this.activityId, data).subscribe((response) => {
          this.toastr.success('Actividad Actualizada con Éxito');
          this.router.navigate(['/client/activities'])

        }, (error) => {
          this.toastr.error(error);
        })
      } else {
        this.apiService.create('client/activities', data).subscribe((response) => {
          this.toastr.success('Actividad Guardada con Éxito');
          this.router.navigate(['/client/activities'])
        }, (error) => {
          this.toastr.error(error);
        })
      }
    }
  }

  searchSupervisor(event) {
    this.apiService.all('client/activities/users/supervisor/search?name=' + event.query + '&template=' + this.activityForm.controls['template_id'].value).subscribe((results) => {
      if (!results.data.length) {
        this.toastr.error('No se encontró ningún usuario que cumpla con las validaciones de supervisor definidas en la plantilla')
      }
      this.supervisors = results.data;
    })
  }

  cancel() {
    this.router.navigate(['/client/activities'])
  }

  removeObservation(index: number) {
    this.observations.removeAt(index);
  }

  createObservation(value = '') {
    let observationFG = this.createObservationFg(value);
    this.observations.push(observationFG);
  }

  createObservationFg(value = '') {
    return this.formBuilder.group({
      observation: [value, Validators.required]
    });
  }

}

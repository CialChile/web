import {Component, OnInit, ViewChild, ElementRef, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {SelectItem} from "primeng/components/common/api";
import {TemplatesTimeHelper} from "../../../../components/templates/helpers/template-time-helper";
import {ValidationService} from "../../../../components/forms/validation/validation.service";
import {ScheduleNaturalLanguageBuilder} from "../../../../utilities/templates/scheduleNaturalLanguageBuilder";
import {window} from "@angular/platform-browser/src/browser/tools/browser";
import {WindowRefService} from "../../../../services/browser/windowRef.service";

@Component({
  selector: 'app-manage-activity-schedule',
  templateUrl: './manage-activity-schedule.component.html',
  styleUrls: ['./manage-activity-schedule.component.scss']
})
export class ManageActivityScheduleComponent implements OnInit {
  public title: string = 'Nueva Programación';
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
      title: 'Programaciones',
      link: '/client/activities',
      active: false
    },
    {
      title: 'Crear',
      link: '/client/activities/create',
      active: true
    }
  ];
  public activityId: any;
  public loading: boolean = true;
  public activity: any;
  public scheduleForm: FormGroup;
  operators: any[] = [];
  operatorValidations;
  estimatedTimeUnits: SelectItem[] = [
    {
      value: {slug: '0', name: 'Horas'},
      label: 'Horas'
    },
    {
      value: {slug: '1', name: 'Dias'},
      label: 'Dias'
    },
    {
      value: {slug: '2', name: 'Semanas'},
      label: 'Semanas'
    },
    {
      value: {slug: '3', name: 'Meses'},
      label: 'Meses'
    }
  ];
  days: any = {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
    sabado: 'Sabado',
    domingo: 'Domingo',
  };
  programTypes: SelectItem[] = [
    {
      value: {slug: 'periodical', name: 'Periódica'},
      label: 'Periódica'
    },
    {
      value: {slug: 'once', name: 'Solo una vez'},
      label: 'Solo una vez'
    }
  ];
  frequencyTypes: SelectItem[] = [
    {
      value: {slug: 'daily', label: 'Diaria'},
      label: 'Diaria'
    },
    {
      value: {slug: 'weekly', label: 'Semanal'},
      label: 'Semanal'
    },
    {
      value: {slug: 'monthly', label: 'Mensual'},
      label: 'Mensual'
    },
  ];
  scheduleData;
  hasAssets = true;
  programNaturaLanguage: string = '';
  public template: any;
  timeValidations: any;
  defaultProgram: any;
  assetSearchUrl: string;
  confirmation: boolean = false;
  scheduleId;
  public assets: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private windowRef: WindowRefService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {

    this.scheduleForm = this.formBuilder.group({
      operator: ['', Validators.required],
      asset: [''],
      schedule: TemplatesTimeHelper.generateProgram()
    });
    this.scheduleForm.valueChanges.subscribe(() => {
      this.programNaturaLanguage = ScheduleNaturalLanguageBuilder.build(
        this.schedule.controls['frequency'].value,
        this.schedule.controls['periodicity'].value,
        this.schedule.controls['days'].value,
        this.schedule.controls['dayOfMonth'].value,
        this.schedule.controls['initHour'].value,
        this.schedule.controls['estimatedTime'].value,
        this.schedule.controls['estimatedTimeUnit'].value.name);
    })
  }

  get schedule(): FormGroup {
    return this.scheduleForm.get('schedule') as FormGroup;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id'] && !params['scheduleId']) {
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/activities/' + params['id'] + '/schedules/create';
        this.scheduleData = {
          assets: []
        }
      }
      this.assetSearchUrl = 'client/activities/' + params['id'] + '/assets';
      if (params['scheduleId']) {
        this.scheduleId = params['scheduleId'];
        this.title = 'Editar Programación'
        this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/activities/' + params['id'] + '/schedules/' + params['scheduleId'];
        this.apiService.one('client/activities/' + params['id'] + '/schedules', params['scheduleId'], 'asset,activity.template.template,activity.programType,operator').subscribe((schedule) => {
          this.loading = false;
          this.scheduleData = schedule.data;
          this.activity = schedule.data.activity;
          this.activityId = this.activity.id;
          this.hasAssets = this.activity.programType.has_assets;
          this.scheduleForm.controls['operator'].setValue(this.scheduleData.operator);
          if (this.hasAssets) {
            this.scheduleForm.controls['asset'].setValue(this.scheduleData.asset);
            this.scheduleForm.controls['asset'].setValidators(Validators.required);
          }
          this.template = this.activity.template.template;
          this.operatorValidations = this.template.persons.operator;
          this.timeValidations = this.template.time.validations;
          if (!this.template.time.editable) {
            this.scheduleForm.controls['schedule'].disable();
          }
          this.defaultProgram = schedule.data.config;
          if (this.defaultProgram) {
            this.defaultProgram.initHour = new Date(this.defaultProgram.initHour);
            this.scheduleForm.controls['schedule'].reset(this.defaultProgram);
          }
        }, (error) => {
          this.loading = false;
        })
      } else {
        this.activityId = params['id'];
        this.apiService.one('client/activities', params['id'], 'template.template,programType').subscribe((activity) => {
          this.loading = false;
          this.activity = activity.data;
          this.hasAssets = this.activity.programType.has_assets;
          this.template = this.activity.template.template;
          this.operatorValidations = this.template.persons.operator;
          this.timeValidations = this.template.time.validations;
          this.defaultProgram = this.template.time.program[0];
          if (this.defaultProgram) {
            this.defaultProgram.initHour = new Date(this.defaultProgram.initHour);
            this.scheduleForm.controls['schedule'].reset(this.defaultProgram);
          }
          if (!this.template.time.editable) {
            this.scheduleForm.controls['schedule'].disable();
          }
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  changeProgramType(event) {
    if (event.value.slug == 'periodical') {
      this.schedule.get('frequency').setValidators([Validators.required]);
      this.schedule.get('periodicity').setValidators(Validators.compose([Validators.required, ValidationService.numberValidator, ValidationService.minNumberValidator]));
    } else {
      this.schedule.get('frequency').setValidators([]);
      this.schedule.get('periodicity').setValidators([]);
      this.schedule.get('dayOfMonth').setValidators([]);
    }
  }

  changeFrequencyType(event) {
    if (event.value.slug == 'monthly') {
      this.schedule.get('dayOfMonth').setValidators(Validators.compose([Validators.required, ValidationService.numberValidator, ValidationService.monthDayValidator]));
    } else {
      this.schedule.get('dayOfMonth').setValidators([]);
    }
  }

  searchOperator(event) {
    this.apiService.all('client/activities/users/operator/search?name=' + event.query + '&template=' + this.activity.template_id).subscribe((results) => {
      if (!results.data.length) {
        this.toastr.error('No se encontró ningún usuario que cumpla con las validaciones de operador definidas en la plantilla')
      }
      this.operators = results.data;
    })
  }

  searchAsset(event) {
    let url = this.assetSearchUrl + '/search?name=' + event.query + '&initialAssetId=' + this.scheduleData.asset.id
    this.apiService.all(url).subscribe((results) => {
      if (!results.data.length) {
        this.toastr.error('No hay activos disponibles para programar')
      }
      this.assets = results.data;
    })
  }

  onSubmit(form, $event: any) {
    $event.preventDefault();
    let validationError = false;
    if (!this.scheduleId && !this.scheduleData.assets.length) {
      validationError = true;
      this.toastr.error('Debe añadir uno o más activos a la programación antes de continuar')
    }
    if (this.timeValidations.length) {
      let validationFail = false;
      this.timeValidations.forEach((valdation) => {
        if (!TemplatesTimeHelper.validateProgram(this.scheduleForm.controls['schedule'].value, valdation)) {
          validationError = true;
          validationFail = true;
        }
      });
      if (validationFail) {
        this.toastr.error('La programación debe cumplir con las validaciones definidas en la plantilla')
      }
    }
    if (!validationError) {
      if (!this.scheduleId) {
        this.confirmation = true;
        this.windowRef.nativeWindow.document.body.scrollTop = 0;
      } else {
        this.saveProgram();
      }
    }
  }

  cancel() {
    this.router.navigate(['/client/activities'])
  }

  get assetsStringList(): string {
    if (!this.scheduleData.assets.length) {
      return '';
    }
    const assetsLength = this.scheduleData.assets.length;
    if (!(assetsLength - 1)) {
      return this.scheduleData.assets[0].name;
    }
    return this.scheduleData.assets.reduce((previous, current, currentIndex) => {
      if (previous.hasOwnProperty('id')) {
        previous = previous.name;
      }

      if (currentIndex == (assetsLength - 1)) {
        return previous + ' y ' + current.name
      }

      return previous + ', ' + current.name
    })
  }

  cancelConfirmation() {
    this.confirmation = false;
  }

  saveProgram() {
    let data = this.scheduleForm.getRawValue();
    if (this.scheduleId) {
      this.apiService.update('client/activities/' + this.activityId + '/schedules', this.scheduleId, data).subscribe((response) => {
        this.toastr.success('Actividad Actualizada con Éxito');
        this.router.navigate(['/client/activities'])

      }, (error) => {
        this.toastr.error(error);
      })
    } else {
      data.assets = this.scheduleData.assets;
      this.apiService.create('client/activities/' + this.activityId + '/schedules', data).subscribe((response) => {
        this.toastr.success('Programación Guardada con Éxito');
        this.router.navigate(['/client/activities'])
      }, (error) => {
        this.toastr.error(error);
      })
    }
  }
}

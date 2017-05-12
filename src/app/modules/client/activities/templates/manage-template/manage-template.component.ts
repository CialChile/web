import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../../../services/api.service";
import {Router, ActivatedRoute} from "@angular/router";
import {TemplateFormBuilder} from "../../../../../components/templates/helpers/template-form-builder";

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html',
  styleUrls: ['./manage-template.component.scss']
})
export class ManageTemplateComponent implements OnInit {

  title: string = 'Nueva Plantilla de Actividad';
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
      title: 'Plantillas',
      link: '/client/activities/templates',
      active: true
    },
    {
      title: 'Crear',
      link: '/client/activities/templates/create',
      active: true
    }
  ];
  public sections: any[] = [
    {
      name: 'general',
      title: 'Datos básicos',
      visible: true,
      required: true,
    },
    {
      name: 'persons',
      title: 'Personas',
      visible: false,
      required: false,
    },
    {
      name: 'equipment',
      title: 'Equipo y materiales',
      visible: false,
      required: false,
    },
    {
      name: 'times',
      title: 'Tiempos',
      visible: true,
      required: true,
    },
    {
      name: 'procedures',
      title: 'Procedimiento',
      visible: false,
      required: false,
    },
    {
      name: 'documents',
      title: 'Documentos',
      visible: false,
      required: false,
    },
    {
      name: 'closure',
      title: 'Cierre',
      visible: true,
      required: true,
    }
  ];

  public templateForm: any;
  public programTypes: any[] = [];
  public templateId: any;
  public loading: boolean;
  public clone: boolean = false;

  constructor(private formBuilder: FormBuilder, public toastr: ToastsManager, private apiService: ApiService,
              private router: Router, private route: ActivatedRoute) {
    this.templateForm = this.formBuilder.group({
      name: ['', Validators.required],
      program_type_id: ['', Validators.required],
      description: [''],
      template: this.formBuilder.group({
        general: this.formBuilder.array([]),
        persons: this.formBuilder.group({
          hasSupervisor: [true],
          supervisor: this.formBuilder.array([]),
          operator: this.formBuilder.array([])
        }),
        equipment: this.formBuilder.group({
          editable: [true],
          equipmentList: this.formBuilder.array([])
        }),
        time: this.formBuilder.group({
          editable: [true],
          program: this.formBuilder.array([]),
          validations: this.formBuilder.array([])
        }),
        procedures: this.formBuilder.group({
          procedureList: this.formBuilder.array([])
        }),
        documents: this.formBuilder.group({
          documentList: this.formBuilder.array([])
        }),
        closure: this.formBuilder.group({
          observations: [true],
          approval: [true]
        }),
      })
    });

    this.templateForm.controls['program_type_id'].valueChanges.subscribe((value) => {
      if (value && value.inspection) {
        this.setPersonsSectionVisibility(true)
      } else {
        this.setPersonsSectionVisibility(false)
      }
    });

  }

  ngOnInit() {
    this.apiService.all('client/activities/program-types').subscribe(programTypes => this.programTypes = programTypes.data.map((programType) => {
      return {label: programType.name, value: {id: programType.id, inspection: programType.is_inspection,}}
    }))

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.clone = params['clone'] == 'true';
        if (!this.clone) {
          this.title = 'Editar Plantilla';
          this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Editar';
          this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/activities/templates/' + params['id'];
        } else {
          this.title = 'Clonar Plantilla';
          this.breadcrumbs[this.breadcrumbs.length - 1].title = 'Clonar';
          this.breadcrumbs[this.breadcrumbs.length - 1].link = '/client/activities/templates/' + params['id'] + ';clone=true';
        }
        this.templateId = params['id'];
        this.loading = true;
        this.apiService.one('client/activities/templates', params['id'], 'programType,template').subscribe((template) => {
          this.initForm(template.data);
        }, (error) => {
          this.loading = false;
        })
      }
    });
  }

  private setPersonsSectionVisibility(isVisible: boolean) {
    this.sections = this.sections.map((section) => {
      if (section.name == 'persons') {
        section.visible = isVisible ? true : section.visible;
        section.required = isVisible;
      }
      return section;
    });
  }

  saveTemplate(event, form) {
    event.preventDefault();
    let validationError = false;
    let data = this.templateForm.getRawValue();
    if (!data.template.time.editable && !data.template.time.program.length) {
      this.toastr.error('Si la programación no puede ser editada en la actividad, entonces debes definir la que sera usada');
      validationError = true;
    }
    if (!validationError) {
      if (!this.sections[1].visible) {
        delete data.template.persons
      }
      if (!this.sections[2].visible) {
        delete data.template.equipment
      } else if (!data.template.equipment.editable && !data.template.equipment.equipmentList.length) {
        delete data.template.equipment
      }
      if (!this.sections[4].visible) {
        delete data.template.procedures
      } else if (!data.template.procedures.procedureList.length) {
        delete data.template.procedures
      }
      if (!this.sections[5].visible) {
        delete data.template.documents
      } else if (!data.template.documents.documentList.length) {
        delete data.template.documents
      }
      if (this.templateId && !this.clone) {
        this.apiService.update('client/activities/templates', this.templateId, data).subscribe((response) => {
          this.toastr.success('Plantilla Actualizada con Éxito');
          this.router.navigate(['/client/activities/templates'])

        }, (error) => {
          this.toastr.error(error);
        })
      } else {
        this.apiService.create('client/activities/templates', data).subscribe((response) => {
          this.toastr.success('Plantilla Guardada con Éxito');
          this.router.navigate(['/client/activities/templates'])
        }, (error) => {
          this.toastr.error(error);
        })
      }
    }
  }

  cancel() {
    this.router.navigate(['/client/activities/templates'])
  }

  private initForm(template) {
    let templateFormBuilder = new TemplateFormBuilder(this.templateForm, template.template);
    this.templateForm = templateFormBuilder.generate();
    this.sections[1].visible = !!template.template.persons;
    this.sections[2].visible = !!template.template.equipment;
    this.sections[4].visible = !!template.template.procedures;
    this.sections[5].visible = !!template.template.documents;
    this.templateForm.reset(template);
    this.templateForm.controls['program_type_id'].setValue({
      id: template.programType.id,
      inspection: template.programType.is_inspection
    })
  }
}

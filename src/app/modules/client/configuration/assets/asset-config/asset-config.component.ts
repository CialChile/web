import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../../services/api.service";
import {ToastsManager} from "ng2-toastr";
import {Router, ActivatedRoute} from "@angular/router";
import {parseMask} from "../../../../../utilities/form/maskParser";

@Component({
  selector: 'app-asset-config',
  templateUrl: './asset-config.component.html',
  styleUrls: ['./asset-config.component.scss']
})
export class AssetConfigComponent implements OnInit {

  // standing data
  public SKU_TYPES = [
    {
      label: 'Libre',
      value: 'libre'
    },
    {
      label: 'Mascara',
      value: 'mask'
    }
  ];

  private configAssetsForm: any;
  private saving: boolean = false;
  private configId: number;
  private loading: boolean = false;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  private title: string = 'Configuración de activos';
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
      title: 'Activos',
      link: '/client/configuration/assets',
      active: true
    }
  ];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService,
              public toastr: ToastsManager, private router: Router, private route: ActivatedRoute) {
    this.configAssetsForm = this.formBuilder.group({
      sku_type: ['', [Validators.required]],
      sku_mask: ['a-99999'],
      sku_mask_test: ['']
    });
  }

  ngOnInit() {
    this.subscribeSkuTypeChange();
    this.loading = true;
    this.apiService.all('client/assets/config').subscribe((config) => {
      this.loading = false;
      if (config) {
        this.initForm(config.data)
      }
    }, (error) => {
      this.loading = false;
    })
  }

  initForm(config) {
    this.configAssetsForm.reset(config)
  }

  subscribeSkuTypeChange() {
    const skutypeChanges$ = this.configAssetsForm.controls.sku_type.valueChanges;
    const skumaskChanges$ = this.configAssetsForm.controls.sku_mask.valueChanges;
    skutypeChanges$.subscribe(skuType => {
      if (skuType === this.SKU_TYPES[1].value) {
        this.configAssetsForm.controls.sku_mask.setValidators(Validators.required);
      }

      if (skuType === this.SKU_TYPES[0].value) {
        this.configAssetsForm.controls.sku_mask.setValidators(null);
        this.configAssetsForm.controls.sku_mask.updateValueAndValidity();

      }
    });

    skumaskChanges$.subscribe((skuMask) => {
      this.mask = parseMask(skuMask);
    })
  }

  onSubmit() {
    let data = this.configAssetsForm.value;
    this.saving = true;
    this.apiService.create('client/assets/config', data).subscribe((response) => {
        this.saving = false;
        this.toastr.success('Configuración actualizada con exito');
      },
      (error) => {
        this.toastr.error(error);
        this.saving = false;
      })
  }
}

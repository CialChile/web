import {Injectable} from '@angular/core';
import {ToastsManager} from "ng2-toastr/ng2-toastr";

@Injectable()
export class ToastrService {

    constructor(public toastr: ToastsManager) {
    }

    showSuccess(header: any, description: any) {
        this.toastr.success(description, header);
    }

    showError(header: any, description?: any) {
        this.toastr.error(description, header);
    }

    showWarning(header: any, description: any) {
        this.toastr.warning(description, header);
    }

    showInfo(header: any, description: any) {
        this.toastr.info(description, header);
    }
}

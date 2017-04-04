import {ToastOptions} from 'ng2-toastr';

export class ToastrDefaultOptions extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  showCloseButton = true;
}

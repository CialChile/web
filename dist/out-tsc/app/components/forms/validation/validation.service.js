var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var config = {
            'required': 'Este campo es requerido',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidRut': 'El Rut es invalido',
            'invalidEmailAddress': 'El formato del Correo Electrónico Invalido',
            'invalidPassword': 'Contraseña invalida. Debe ser de por lo menos 6 caracteres y contener un numero',
            'validateEqual': 'Las contraseñas deben coincidir',
            'minlength': "Minimum length " + validatorValue.requiredLength
        };
        return config[validatorName];
    };
    ValidationService.creditCardValidator = function (control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        }
        else {
            return { 'invalidCreditCard': true };
        }
    };
    ValidationService.rutValidator = function (control) {
        if (control.value) {
            var cleanRut = control.value.match(/[0-9Kk]+/g).join('');
            var cDv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();
            var nRut = parseInt(cleanRut.substr(0, cleanRut.length - 1));
            if (isNaN(nRut)) {
                return {
                    'invalidRut': true
                };
            }
            if (ValidationService.computeRut(nRut).toString().toUpperCase() !== cDv) {
                return {
                    'invalidRut': true
                };
            }
            return null;
        }
    };
    ;
    ValidationService.computeRut = function (cleanRut) {
        var suma = 0;
        var mul = 2;
        if (typeof (cleanRut) !== 'number') {
            return;
        }
        cleanRut = cleanRut.toString();
        for (var i = cleanRut.length - 1; i >= 0; i--) {
            suma = suma + cleanRut.charAt(i) * mul;
            mul = (mul + 1) % 8 || 2;
        }
        switch (suma % 11) {
            case 1:
                return 'k';
            case 0:
                return 0;
            default:
                return 11 - (suma % 11);
        }
    };
    ValidationService.emailValidator = function (control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    ValidationService.passwordValidator = function (control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    };
    ValidationService.invalidConfirmationPassword = function (control) {
        if (control._parent) {
            var newPass = control._parent._value.new_password;
            if (control.value == newPass) {
                return null;
            }
            else {
                return { 'invalidConfirmationPassword': true };
            }
        }
        return null;
    };
    return ValidationService;
}());
export { ValidationService };
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/components/forms/validation/validation.service.js.map
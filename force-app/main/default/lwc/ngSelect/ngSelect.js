/**
 * Created by LookThink
 */

import { LightningElement, api, track } from 'lwc';

const TYPE_GROUPED = 'grouped';
const TYPE_SIMPLE = 'simple';
const CLASS_FORM_ELEMENT = 'slds-form-element';
const CLASS_ERROR = 'slds-has-error';
const MESSAGE_ERROR_REQUIRED = 'This field is required.';

export default class NGSelect extends LightningElement {

    @track classFormElement = CLASS_FORM_ELEMENT;
    @track messageError = "";
    @track hasError = false;
    @track placeholderOption = null;
    @track selectValue = null;
    @track selectValueList = null;

    @api fieldId = "";
    @api fieldName = "";
    @api label = "";
    @api required = false;
    @api readOnly = false;
    @api disabled = false;

	@api
    setCustomValidity(value) {
        this.messageError = value;
    }

    @api
    reportValidity() {

        if(this.required && !this.selectValue) {
            this.messageError = MESSAGE_ERROR_REQUIRED;
        }

        this.hasError = !!(this.messageError);
        if(this.hasError) {
            this.classFormElement = CLASS_FORM_ELEMENT + ' ' + CLASS_ERROR;
        } else {
            this.classFormElement = CLASS_FORM_ELEMENT;
        }

        return !this.hasError;
    }

	// Option list items can come in two flavors: Grouped or Simple
	// Simple :
	// { label: '', value: '', isSelected: true/false, isDisabled: true/false, key: '' }
	// Grouped :
	// { label: '', options: [], isDisabled: true/false, key: '' }
	// 'options' is a list in the same format as in simple
    @track options = [];

    @api
    get selectOptions() {
        return this.options;
    }
    set selectOptions(value) {
        let options = value ? JSON.parse(JSON.stringify(value)) : [];
        if(this.selectValue) {
            this.setSelectedOptions();
        }/* else {
            for(let i = 0; i < options.length; i++) {
                if(options[i].options) {
                    for(let j = 0; j < option.options.length; j++) {
                        if(options[i].options[j].isSelected) {
                            this.selectValue = options[i].options[j].value;
                            break;
                        }
                    }
                } else {
                    if(options[i].isSelected){
                        this.selectValue = options[i].value;
                        break;
                    }
                }
            }
        }*/
        this.options = options;
    }

    @api
    get selectedValue() {
        return this.selectValue;
    }
    set selectedValue(value) {
        this.selectValue = value ? value : '';
        if(this.options) {
            this.setSelectedOptions();
        }
        if(!value) {
            this.placeholder = '';
        }
    }

    @api
    set placeholder(value) {
        if(value != null) {
            this.placeholderOption = {
                label : value,
                value : "",
                isSelected : false
            }
        }
    }
    get placeholder() {
        return (this.placeholderOption) ? this.placeholderOption.label : "";
    }

    @api
    set isError(value) {
        if(!!(value)) {
            this.classFormElement = CLASS_FORM_ELEMENT + ' ' + CLASS_ERROR;
        } else {
            this.classFormElement = CLASS_FORM_ELEMENT;
        }
        this.hasError = !!(value);
    }
    get isError() {
        return this.hasError;
    }

    @api
    set errorMessage(value) {
        if(!value && this.required) {
            value = MESSAGE_ERROR_REQUIRED;
        }
        this.messageError = value;
    }
    get errorMessage() {
        return this.messageError;
    }

    get selectedLabel() {
        let selectedLabel = '',
            options = this.options;
        if(this.options && this.selectValue) {
            for(let i = 0; i < options.length; i++) {
                const option = options[i];
                if(option.value == this.selectValue) {
                    selectedLabel = option.label;
                    break;
                }
            }
        }
        return selectedLabel;
    }

	connectedCallback() {
        let classFormElement = CLASS_FORM_ELEMENT;
        if(!this.fieldId) {
            this.fieldId = "select-" + Math.floor(Math.random() * Math.floor(100));
        }
        classFormElement += ((this.hasError) ? ' ' + CLASS_ERROR : '');
        this.classFormElement = classFormElement;

        if(!this.selectValue && Array.isArray(this.options) && this.options.length > 0) {
            this.placeholder = '';
        }
    }

    setSelectedOptions() {
        let val = JSON.parse(JSON.stringify(this.selectValue));
        this.selectValues = (val) ? val.split(';') : [];   // to array
        this.options.forEach((option) => {
            if(option.options) {
                option.options.forEach((childOption) => {
                    childOption.isSelected = (this.selectValues.indexOf(childOption.value) != -1);
                });
            } else {
                option.isSelected = (this.selectValues.indexOf(option.value) != -1);
            }
        });
    }

    handleChange(event) {
        if(!this.disabled && !this.readOnly) {
            this.selectedValue = event.target.value;
            this.doChangeEvent(event.target.value);
        }
    }

    doChangeEvent(val) {
        const changeEvent = new CustomEvent('change', { detail: { value : val }});
        this.dispatchEvent(changeEvent);
    }

}
/**
 * Created by LookThink
 */

import { LightningElement, api, track } from 'lwc';

const classes = {
	section : "slds-modal",
	header : "slds-modal__header",
	heading : "slds-modal__title slds-hyphenate",
	headless : "slds-modal__header slds-modal__header_empty",
	footer: "slds-modal__footer",
	directional: "slds-modal__footer slds-modal__footer_directional",
	backdrop : "slds-backdrop",
	open : {
		section : "slds-fade-in-open",
		backdrop : "slds-backdrop_open"
	},
	sizes : {
		small : "slds-modal_small",
		medium : "slds-modal_medium",
		large : "slds-modal_large"
	}
}

const ids = {
	content : "modal-content",
	heading : "modal-heading"
}

export default class NGModal extends LightningElement {

	@track contentId = ids.content;
	@track headingId = ids.heading;
	@track sectionClass = classes.section;
	@track headClass = classes.header;
	@track headingClass = classes.heading;
	@track footerClass = classes.footer;
	@track backdropClass = classes.backdrop;

	apiName = "";
	apiSize = "";
	apiHeadless = false;
	apiHeaderClass = "";
	apiDirectional = false;

	@api header = "";
	@api tagLine = "";
	@api footless = false;

	@api
	get name() {
		return this.apiName;
	}
	set name(value) {
		if(value) {
			let nameHyphened = "-" + this.name.replace(/\s/g, "-");
			this.contentId = ids.content + nameHyphened;
			this.headingId = ids.heading + nameHyphened;
			this.apiName = value;
		}
	}

	@api
	get size() {
		return this.apiSize;
	}
	set size(value) {
		if(value) {
			let modalSize = classes.sizes[value],
				sectionClass = classes.section;
			if(modalSize) {
				sectionClass += " " + modalSize;
			}
			if(this.sectionClass && this.sectionClass.indexOf(classes.open.section) > -1) {
				sectionClass += " " + classes.open.section;
			}
			this.sectionClass = sectionClass;
			this.apiSize = value;
		}
	}

	@api
	get headless() {
		return this.apiHeadless;
	}
	set headless(value) {
		if(value) {
			this.headClass = classes.headless;
		} else {
			this.headClass = classes.header;
		}
		this.apiHeadless = value;
	}

	@api
	get headerClass() {
		return this.apiHeaderClass;
	}
	set headerClass(value) {
		if(value) {
			this.headingClass = classes.heading + " " + value;
		} else {
			this.headingClass = classes.heading;
		}
		this.apiHeaderClass = value;
	}

	@api
	get directional() {
		return this.apiDirectional;
	}
	set directional(value) {
		if(value) {
			this.footerClass = classes.directional;
		} else {
			this.footerClass = classes.footer;
		}
		this.apiDirectional = value;
	}

	@api
	show() {
		this.backdropClass += " " + classes.open.backdrop;
		this.sectionClass += " " + classes.open.section;
	}

	@api
	hide() {
		let backdropClass = this.backdropClass.replace(classes.open.backdrop, ""),
			sectionClass = this.sectionClass.replace(classes.open.section, "");
		this.sectionClass = sectionClass.trim();
		this.backdropClass = backdropClass.trim();
	}

	handleClose(event) {
		const closeEvent = new CustomEvent("closemodal");
		this.dispatchEvent(closeEvent);
	}
}
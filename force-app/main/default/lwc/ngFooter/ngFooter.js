import { LightningElement } from "lwc";

export default class ngFooter extends LightningElement {

    flag1 = '/sro/s/sfsites/c/resource/NextgenAssets/NextgenAssets/flag1.png';
    flag2 = '/sro/s/sfsites/c/resource/NextgenAssets/NextgenAssets/flag2.png';
    viclogo = '/sro/s/sfsites/c/resource/VIC_Logo';
    BACKGROUND_IMAGE = '/sro/s/sfsites/c/resource/NextgenAssets/NextgenAssets/footer_bg.png';

    get backgroundStyle() {
        return `background-image:url(${BACKGROUND_IMAGE})`;
    }
}
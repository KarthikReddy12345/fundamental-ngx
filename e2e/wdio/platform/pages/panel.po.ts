import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class PanelPo extends BaseComponentPo {

    url = '/panel';
    root = '#page-content';

    expandablePanelRoot = '#panel-id';
    expandablePanelBtn = this.expandablePanelRoot + ' button';
    expandablePanelTitle = this.expandablePanelRoot + ' h5';
    expandablePanelContent = this.expandablePanelRoot + ' .fd-panel__content';

    fixedPanelSection = '[ng-reflect-id="panelFixed"]';
    fixedPanelDescription = this.fixedPanelSection + ' + description';

    compactPanelRoot = '#compact-panel-id';
    compactPanelBtn = this.compactPanelRoot + ' button';

    fixedHeightPanelRoot = 'fdp-panel-fixed-height-example #fixed-panel-id';
    fixedHeightPanelContentRegion = this.fixedHeightPanelRoot + ' [role="region"]';
    fixedHeightPanelContent = this.fixedHeightPanelRoot + ' fdp-panel-content';

    actionPanelRoot = '#panel-actions-id';
    actionPanelBtn = this.actionPanelRoot + ' button.fd-ellipsis';


    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.expandablePanelBtn);
    }
}

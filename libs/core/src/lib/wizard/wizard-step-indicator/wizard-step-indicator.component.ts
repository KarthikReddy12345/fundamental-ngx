import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-wizard-step-indicator',
    templateUrl: './wizard-step-indicator.component.html',
    encapsulation: ViewEncapsulation.None
})
export class WizardStepIndicatorComponent {
    /**
     * The icon to use for this step.
     */
    @Input()
    glyph: string;
}
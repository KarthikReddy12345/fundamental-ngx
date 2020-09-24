import { Component } from '@angular/core';
import { StepType } from '../../../../../../../../libs/core/src/lib/wizard/wizard-step/wizard-step.component';

@Component({
    selector: 'fd-wizard-example',
    templateUrl: './wizard-example.component.html'
})
export class WizardExampleComponent {

    step1status: StepType = 'current';
    step2status: StepType = 'upcoming';
    step3status: StepType = 'upcoming';
    step4status: StepType = 'upcoming';

    goToStep(step: number): void {
        switch (step) {
            case 2: {
                this.step1status = 'completed';
                this.step2status = 'current';
                this.step3status = 'upcoming';
                this.step4status = 'upcoming';
                break;
            }
            case 3: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'current';
                this.step4status = 'upcoming';
                break;
            }
            case 4: {
                this.step1status = 'completed';
                this.step2status = 'completed';
                this.step3status = 'completed';
                this.step4status = 'current';
                break;
            }
        }
    }

}

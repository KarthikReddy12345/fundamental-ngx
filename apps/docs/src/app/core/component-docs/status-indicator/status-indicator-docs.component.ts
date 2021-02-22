import { Component, OnInit } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as StatusIndicatorDefaultComponent from '!raw-loader!./example/status-indicator-default.component.html';
import * as StatusIndicatorSizeComponent from '!raw-loader!./example/status-indicator-size.component.html';
import * as StatusIndicatorFillTypeComponent from '!raw-loader!./example/status-indicator-fill-type.component.html';
import * as StatusIndicatorLabelComponent from '!raw-loader!./example/status-indicator-label.component.html';
import * as StatusIndicatorAngledFillingComponent from '!raw-loader!./example/status-indicator-angled-filling.component.html';
import * as StatusIndicatorCircularFillingClockComponent from '!raw-loader!./example/status-indicator-cirular-fill-clockwise.component.html';
import * as StatusIndicatorCircularFillingAntiClockComponent from '!raw-loader!./example/status-indicator-cirular-fill-anti-clockwise.component.html';
import * as StatusIndicatorlinearFillingComponent from '!raw-loader!./example/status-indicator-linear-fill-type.component.html';
@Component({
    selector: 'fd-status-indicator-docs',
    templateUrl: './status-indicator-docs.component.html',
    styleUrls: ['status-indicator-docs.component.scss']
})
export class StatusIndicatorDocsComponent {
    defaultStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorDefaultComponent,
            fileName: 'status-indicator-default'
        }
    ];
    sizeStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorSizeComponent,
            fileName: 'status-indicator-size'
        }
    ];
    fillTypeStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorFillTypeComponent,
            fileName: 'status-indicator-fill-type'
        }
    ];
    labelStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorLabelComponent,
            fileName: 'status-indicator-label'
        }
    ];
    angeledFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorAngledFillingComponent,
            fileName: 'status-indicator-angeled-fillling'
        }
    ];
    circularClockFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorCircularFillingClockComponent,
            fileName: 'status-indicator-cirular-fill-clockwise'
        }
    ];
    circularAntiClockFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorCircularFillingAntiClockComponent,
            fileName: 'status-indicator-cirular-fill-anti-clockwise'
        }
    ];
    linearFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorlinearFillingComponent,
            fileName: 'status-indicator-linear-fill-type'
        }
    ];
}

import { Component } from '@angular/core';

import * as avatarGroupBaseTs from '!raw-loader!./examples/avatar-group-base-example.component.ts';
import * as avatarGroupBaseHtml from '!raw-loader!./examples/avatar-group-base-example.component.html';
import * as avatarGroupIndividualTs from '!raw-loader!./examples/avatar-group-individual-type-example.component.ts';
import * as avatarGroupIndividualHtml from '!raw-loader!./examples/avatar-group-individual-type-example.component.html';
import * as avatarGroupGroupTs from '!raw-loader!./examples/avatar-group-group-type-example.component.ts';
import * as avatarGroupGroupHtml from '!raw-loader!./examples/avatar-group-group-type-example.component.html';
import * as avatarGroupDataServiceTs from '!raw-loader!./examples/avatar-group-data-example.service.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-avatar-group',
    templateUrl: './avatar-group-docs.component.html'
})
export class AvatarGroupDocsComponent {
    baseExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-base-example',
            code: avatarGroupBaseHtml
        },
        {
            language: 'typescript',
            code: avatarGroupBaseTs,
            fileName: 'avatar-group-base-example',
            component: 'AvatarGroupBaseExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-data-example.service.ts',
            code: avatarGroupDataServiceTs,
            fileName: 'avatar-group-data-example',
            component: 'AvatarGroupDataExampleService',
            service: true
        }
    ];

    individualType: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-individual-type-example',
            code: avatarGroupIndividualHtml
        },
        {
            language: 'typescript',
            code: avatarGroupIndividualTs,
            fileName: 'avatar-group-individual-type-example',
            component: 'AvatarGroupIndividualTypeExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-data-example.service.ts',
            code: avatarGroupDataServiceTs,
            fileName: 'avatar-group-data-example',
            component: 'AvatarGroupDataExampleService',
            service: true
        }
    ];

    groupType: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'avatar-group-group-type-example',
            code: avatarGroupGroupHtml
        },
        {
            language: 'typescript',
            code: avatarGroupGroupTs,
            fileName: 'avatar-group-group-type-example',
            component: 'AvatarGroupGroupTypeExampleComponent'
        },
        {
            language: 'typescript',
            name: 'avatar-group-data-example.service.ts',
            code: avatarGroupDataServiceTs,
            fileName: 'avatar-group-data-example',
            component: 'AvatarGroupDataExampleService',
            service: true
        }
    ];


    /*
    kpi: ExampleFile[] = [
        {
            language: 'typescript',
            code: cardKpiExampleTs,
            fileName: 'card-kpi-example',
            component: 'CardKpiExampleComponent'
        },
        {
            language: 'html',
            code: cardKpiExampleHtml,
            fileName: 'card-kpi-example'
        },
        {
            language: 'scss',
            code: cardKpiExampleScss,
            fileName: 'card-kpi-example'
        },
        {
            language: 'typescript',
            name: 'card-kpi-google-charts.service.ts',
            code: googleChartServiceTs,
            fileName: 'card-kpi-google-charts',
            component: 'GoogleChartService',
            service: true
        },
    ];
    */
}

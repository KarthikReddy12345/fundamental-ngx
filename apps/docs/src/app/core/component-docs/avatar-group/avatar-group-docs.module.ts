import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { AvatarGroupModule, AvatarModule, BarModule, PopoverModule, QuickViewModule } from '@fundamental-ngx/core';
import { AvatarGroupDocsComponent } from './avatar-group-docs.component';
import { AvatarGroupHeaderComponent } from './avatar-group-header/avatar-group-header.component';
import { AvatarGroupGroupTypeExampleComponent } from './examples/avatar-group-group-type-example.component';
import { AvatarGroupIndividualTypeExampleComponent } from './examples/avatar-group-individual-type-example.component';
import { AvatarGroupBaseExampleComponent } from './examples/avatar-group-base-example.component';

const routes: Routes = [
    {
        path: '',
        component: AvatarGroupHeaderComponent,
        children: [
            { path: '', component: AvatarGroupDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.avatar } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, AvatarGroupModule, AvatarModule,



        PopoverModule, QuickViewModule, BarModule
    ],
    exports: [RouterModule],
    declarations: [
        AvatarGroupDocsComponent,
        AvatarGroupHeaderComponent,
        AvatarGroupGroupTypeExampleComponent,
        AvatarGroupIndividualTypeExampleComponent,
        AvatarGroupBaseExampleComponent
    ]
})
export class AvatarGroupDocsModule {}

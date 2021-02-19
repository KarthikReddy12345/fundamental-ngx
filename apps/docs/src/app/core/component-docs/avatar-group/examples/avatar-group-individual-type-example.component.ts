import { Component } from '@angular/core';

import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-individual-type-example',
    templateUrl: './avatar-group-individual-type-example.component.html',
    styles: [``]
})
export class AvatarGroupIndividualTypeExampleComponent {
    size1 = 's';
    people = this.avatarGroupDataExampleService.generate();

    constructor(private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService) {}
}

import { Component } from '@angular/core';

import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-group-type-example',
    templateUrl: './avatar-group-group-type-example.component.html',
    styles: [``]
})
export class AvatarGroupGroupTypeExampleComponent {
    size2 = 'l';
    people = this.avatarGroupDataExampleService.generate();

    constructor(private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService) {}
}

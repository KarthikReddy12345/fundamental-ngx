import { Component } from '@angular/core';

import { AvatarGroupDataExampleService } from './avatar-group-data-example.service';

@Component({
    selector: 'fd-avatar-group-base-example',
    templateUrl: './avatar-group-base-example.component.html',
    styles: [``]
})
export class AvatarGroupBaseExampleComponent {
    size1 = 'm';
    size2 = 'xl';
    people = this.avatarGroupDataExampleService.generate(20);

    constructor(private readonly avatarGroupDataExampleService: AvatarGroupDataExampleService) {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from '../avatar/avatar.module';
import { BarModule } from '../bar/bar.module';
import { PopoverModule } from '../popover/popover.module';
import { AvatarGroupComponent } from './avatar-group.component';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupOverflowBodyDirective } from './directives/avatar-group-overflow-body.directive';

@NgModule({
    imports: [CommonModule, AvatarModule, BarModule, PopoverModule],
    exports: [AvatarGroupComponent, AvatarGroupItemDirective, AvatarGroupOverflowBodyDirective],
    declarations: [AvatarGroupComponent, AvatarGroupItemDirective, AvatarGroupOverflowBodyDirective]
})
export class AvatarGroupModule {}

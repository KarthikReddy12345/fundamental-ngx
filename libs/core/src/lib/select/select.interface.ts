import { EventEmitter, InjectionToken } from '@angular/core';
import { OptionComponent } from './option/option.component';
import { OptionStatusChange } from './select.component';
import { MobileMode } from '../utils/interfaces/mobile-control.interface';

export const SELECT_COMPONENT = new InjectionToken<string[]>('SelectInterface');

/**
 * Select Interface to have typing and avoid circular dependency between
 * SelectComponent <==> SelectMobileComponent
 */
export interface SelectInterface extends MobileMode {
    selected: OptionComponent;
    isOpenChange: EventEmitter<boolean>;

    close(): void;

    setSelectedOption({option, controlChange}: OptionStatusChange, forceMobileSelect?: boolean): void;
}

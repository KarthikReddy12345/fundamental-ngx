import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';

import { ColorAccent, getRandomColorAccent, Size } from '../utils/public_api';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';

export type AvatarGroupType = 'group' | 'individual';
export type AvatarGroupOverflowButtonColor = 'neutral' | 'random' | ColorAccent;

let avatarGroupUniqueId = 0;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fd-avatar-group',
    templateUrl: './avatar-group.component.html',
    styleUrls: ['./avatar-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class AvatarGroupComponent implements OnChanges, OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
    /** Id of the Avatar Group. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-avatar-group-${avatarGroupUniqueId++}`;

    /** The size of the Avatar Group. Options include: *xs*, *s*, *m*, *l* and *xl* (default: *s*).*/
    @Input() size: Size = 's';

    /** The type of the Avatar Group. Options include: *group* and *individual* (default: *group*).*/
    @Input() type: AvatarGroupType = 'group';

    /** A number from 1 to 10 representing the background color of the Avatar Group's overflow button. */
    @Input() overflowButtonColor: AvatarGroupOverflowButtonColor = 'neutral';

    /** Aria-label for Avatar Group. */
    @Input()
    ariaLabel: string = null;

    /** @hidden Avatar Group items */
    @ContentChildren(forwardRef(() => AvatarGroupItemDirective), { descendants: true })
    items: QueryList<AvatarGroupItemDirective>;

    /** @hidden */
    @ViewChild('avatarGroupContainer')
    avatarGroupContainer: ElementRef;

    /** @hidden */
    @ViewChild('overflowBody')
    overflowBody: ElementRef;

    /** @hidden */
    @ViewChild('overflowButton')
    overflowButton: ElementRef;

    /** @hidden */
    @ViewChild('insertToIndividual')
    insertToIndividual: ElementRef;

    /** @hidden */
    @ViewChild('insertToGroup')
    insertToGroup: ElementRef;

    /** @hidden */
    overflowVisibility: Observable<boolean> = of(true);

    /** @hidden */
    rootClassNames: Record<string, boolean | undefined | null>;

    /** @hidden */
    moreButtonClassNames: Record<string, boolean | undefined | null>;

    /** @hidden */
    get isIndividualType(): boolean {
        return this.type === 'individual';
    }

    /** @hidden */
    get isGroupType(): boolean {
        return this.type === 'group';
    }

    /** @hidden */
    private get _avatarGroupWidth(): number {
        return (this.avatarGroupContainer?.nativeElement as HTMLElement)?.offsetWidth;
    }

    /** @hidden */
    private get _avatarGroupItemWidth(): number {
        return (this.items?.first?.elementRef?.nativeElement as HTMLElement)?.offsetWidth;
    }

    /** @hidden */
    private get _avatarGroupItemWithMarginsWidth(): number {
        const elementStyles = getComputedStyle(this.items?.first?.elementRef?.nativeElement);
        return this._avatarGroupItemWidth
            + parseInt(elementStyles.marginLeft, 10)
            + parseInt(elementStyles.marginRight, 10);
    }

    /** @hidden */
    private get _overflowBody(): HTMLElement {
        return this.overflowBody?.nativeElement as HTMLElement;
    }

    /** @hidden */
    private _itemsArray: AvatarGroupItemDirective[] = [];

    /** @hidden */
    private _overflowElements: AvatarGroupItemDirective[] = [];

    /** @hidden */
    private _normalElements: AvatarGroupItemDirective[] = [];

    /** @hidden */
    private _subscription = new Subscription();

    // TODO: remove me
    random = Math.random().toString(36).substring(6);

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef,
                private readonly _cd: ChangeDetectorRef) {}

    /** @hidden */
    ngOnInit(): void {
        const sub = fromEvent(window, 'resize')
            .pipe(debounceTime(25), distinctUntilChanged())
            .subscribe(_ => this._onResize());

        this._subscription.add(sub);
    }

    /** @hidden */
    ngOnChanges(): void {
        this._assignCssClasses();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._itemsArray = this.items?.toArray();
        this._subscription.add(of(true).pipe(delay(5)).subscribe(() => this._collapseItems()));
        this._listenForItemChanges();
    }

    /** @hidden */
    ngAfterViewChecked(): void {

    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /** @hidden */
    private _onResize(): void {
        this._reset();
        this._collapseItems();
    }

    /** @hidden */
    private _reset(): void {
        this.items.forEach(this._removeItemFromDOM.bind(this));
        const items = this.items.map(i => i.elementRef.nativeElement);
        if (this.isGroupType) {
            this.insertToGroup.nativeElement.prepend(...items);
        } else {
            this.insertToIndividual.nativeElement.prepend(...items);
        }

        /*this.items.forEach(x => {
            if (this.isGroupType) {
                // this.avatarGroupRootGroup.nativeElement.insertBefore(x.elementRef.nativeElement, this.overflowButton.nativeElement);
                this.overflowButton.nativeElement.parentNode.insertBefore(x.elementRef.nativeElement, this.overflowButton.nativeElement);
            } else {
                this.avatarGroupRootIndividual.nativeElement.insertBefore(x.elementRef.nativeElement, this.insertBeforeIndividual.nativeElement);
            }
        });*/

        this._overflowElements = [];
        this._normalElements = [];

        this._changeOverflowVisibleState(false);
    }

    /** @hidden */
    private _collapseItems(): void {
        const allItemsCounter = this._itemsArray?.length || 0;
        const items = [...this._itemsArray];

        let contentWidth = 0;
        let idx = 0;

        while (idx <= allItemsCounter) {
            idx++;

            if (contentWidth + this._avatarGroupItemWithMarginsWidth >= this._avatarGroupWidth) {
                // -2 because the last element in the loop not fit to width
                // and the element before last will be replaced by the overflow button
                this._normalElements = items.splice(0, idx - 2);
                this._overflowElements = items;
                break;
            }

            contentWidth += this._avatarGroupItemWithMarginsWidth;
        }

        if (this.isGroupType) {
            this._addGroupItemsToOverflow(idx - 2);
        }

        if (this.isIndividualType) {
            this._addIndividualItemsToOverflow();
        }

        // const itemsToAddToOverflow = this.isGroupType ? this._itemsArray : this._overflowElements;
        // this._addItemToOverflow(itemsToAddToOverflow, idx - 2);
        this._changeOverflowVisibleState(this._overflowElements.length > 0);

        this._cd.markForCheck();
    }

    /** @hidden */
    private _addGroupItemsToOverflow(cutFrom = 0): void {
        this.items.forEach((item, i) => {
            const itemToOverflow = cutFrom > i ? item.elementRef.nativeElement.cloneNode(true) : item.elementRef.nativeElement;
            this._overflowBody.appendChild(itemToOverflow);
        });
    }

    /** @hidden */
    private _addIndividualItemsToOverflow(): void {
        // const items = this._overflowElements.map(i => i.elementRef.nativeElement);
        // this._overflowBody.append(...items);
        this._overflowElements.forEach(item => {
            this._overflowBody.appendChild(item.elementRef.nativeElement);
        });

        console.log('_overflowBody', this._overflowBody);
    }

    /** @hidden */
    /*private _addItemToOverflow(items: AvatarGroupItemDirective[], cutFrom = 0): void {
        if (this.isGroupType) {
            items.forEach((item, i) => {
                const itemToOverflow = cutFrom > i ? item.elementRef.nativeElement.cloneNode(true) : item.elementRef.nativeElement;
                this._overflowBody.appendChild(itemToOverflow);
            });
            return;
        }

        console.log('_addItemToOverflow');
        this._overflowBody.prepend(...items.map(i => i.elementRef.nativeElement.cloneNode(true)))
        // items.forEach(item => this._overflowBody.appendChild(item.elementRef.nativeElement));
    }*/

    /** @hidden */
    private _removeItemFromDOM(item: AvatarGroupItemDirective): void {
        if (item.elementRef.nativeElement?.parentNode) {
            item.elementRef.nativeElement?.parentNode.removeChild(item.elementRef.nativeElement);
        }
    }

    /** @hidden */
    private _listenForItemChanges(): void {
        this._subscription.add(this.items.changes.subscribe(() => this._onResize()));
    }

    /** @hidden */
    private _changeOverflowVisibleState(visible: boolean): void {
        this.overflowVisibility = of(visible).pipe(delay(1));
    }

    /** @hidden */
    private _assignCssClasses(): void {
        this.rootClassNames = {
            'fd-avatar-group': true,
            [`fd-avatar-group--${this.type}-type`]: true,
            [`fd-avatar-group--${this.size}`]: true
        };

        this.moreButtonClassNames = {
            'fd-button': true,
            [`${this._getMoreButtonColorCssClass()}`]: true,
            'fd-avatar-group__more-button': true,
            [`fd-avatar-group__more-button--${this.size}`]: true,
        };
    }

    /** @hidden */
    private _getMoreButtonColorCssClass(): string {
        if (this.overflowButtonColor === 'random') {
            return `fd-avatar-group__more-button--accent-color-${getRandomColorAccent()}`;
        }

        if (!Number.isNaN(parseInt(this.overflowButtonColor as string, 10))) {
            return `fd-avatar-group__more-button--accent-color-${this.overflowButtonColor}`;
        }

        return `fd-button--standard`;
    }
}

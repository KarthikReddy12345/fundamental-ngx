import {
    Component,
    OnInit,
    Input,
    ElementRef,
    OnChanges,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';

export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type StatusIndicatorColor = 'negative' | 'critical' | 'positive';
export type LablePosition = 'left' | 'right' | 'top' | 'bottom';
export type FillingType = 'radial' | 'angled' | 'linearup' | 'lineardown' | 'linearleft';
export type FillingDirection = 'clock' | 'anticlock';

@Component({
    selector: 'fd-status-indicator',
    templateUrl: './status-indicator.component.html',
    styleUrls: ['./status-indicator.component.scss'],
    host: {
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-roledescription]': 'ariaRoledescription',
        '[attr.focusable]': 'focusable',
        '[attr.title]': 'title',
        '[attr.role]': 'role',
        '[attr.aria-valuetext]': 'ariaValuetext'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusIndicatorComponent implements OnChanges, OnInit, AfterViewInit {
    /**
     * value id defines the id of the object.
     */
    @Input()
    id: string;

    /**
     * defines the size of the status indicator.
     * Can be one of the following: 'sm' | 'md' | 'lg' | 'xl'
     * Default size is Medium(md).
     */
    @Input()
    size: Size = 'md';

    /**
     * The status represented by the Status Indicator.
     * Can be one of the following: 'negative' | 'critical' | 'informative'
     * For default Object Status omit this property
     */
    @Input()
    status: StatusIndicatorColor;

    /** Define the text content of the Status indicator*/
    @Input()
    statusLabel: string;

    /**
     * positioning of the status indicator.
     */
    @Input()
    viewBox: string;

    /**
     * boolean value to define requirement of the label.
     */
    @Input()
    hasLabel: boolean;

    /**
     * boolean value to be marked as a clickable
     */
    @Input()
    clickable: boolean;

    /** Aria label for the Status Indicator. */
    @Input()
    ariaLabel: string = null;

    /** Aria roleDescription for the Status Indicator. */
    @Input()
    ariaRoledescription: string = null;

    /** Aria Focusable for the Status Indicator. */
    @Input()
    focusable: boolean;

    /** Aria Role for the Status Indicator. */
    @Input()
    role: string = null;

    /** Aria ValueText for the Status Indicator. */
    @Input()
    ariaValuetext: string = null;

    /** Aria Title for the Status Indicator. */
    @Input()
    title: string = null;

    /** defines the label position the value can be 'left' | 'right' | 'top' | 'bottom' */
    @Input()
    labelPosition: LablePosition;

    @Input()
    path: string[];

    /**
     * Offset value to be filled under the give percentatge value.
     */
    @Input()
    fillPercentage: number;

    /**
     * value to define fill direction
     */
    @Input()
    fillDirection: FillingDirection = 'clock';

    get FillDirection(): FillingDirection {
        return this.fillDirection;
    }

    set FillDirection(direction: FillingDirection) {
        this.fillDirection = direction;
    }

    @ViewChild('maskTemplate')
    maskTemplate: TemplateRef<any>;

    /**
     * FillingType to represent the fill pattern of the component
     */
    @Input()
    fillingType: FillingType = 'lineardown';

    /** represent the degree of angle to project the filling of the component */
    @Input()
    angle: number;

    /** @hidden */
    fillCalculator: number;
    /** @hidden */
    binaryString: string;
    /** @hidden */
    x1: string;
    /** @hidden */
    y1: string;
    /** @hidden */
    x2: string;
    /** @hidden */
    y2: string;

    @Input()
    pointsArray: any[] = [];

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private cd: ChangeDetectorRef) {}
    ngAfterViewInit(): void {
        this.angleCalculation();
        this.cd.detectChanges();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.calculateFilling();
    }

    /** @hidden */
    ngOnInit(): void {}

    /** @hidden */
    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }
    calculateFilling(): number {
        this.fillCalculator = (this.fillPercentage * this.path.length) / 100;
        return this.fillCalculator;
    }

    angleCalculation(): void {
        let sPointsAttributeValue = [];
        let polygonPoints: any[];
        if (this.fillingType === 'angled') {
            this.binaryString = this.convertAngleToBinary(this.angle);
            this.assignBinaryValue(this.binaryString);
        } else if (this.fillingType === 'radial') {
            const tempPercent = this.fillCalculator % 1;
            const fillNumber = Number(tempPercent.toFixed(2));

            const element = this._elementRef.nativeElement.querySelectorAll('svg');

            for (let i = 1; i < element.length; i++) {
                sPointsAttributeValue = this._getPolygonPointsForCircularFilling(
                    fillNumber * 100,
                    element[i].getBBox()
                );
                polygonPoints = sPointsAttributeValue.reduce((acc, item) => {
                    return acc + item.x + ',' + item.y + ' ';
                }, '');
                this.pointsArray.push(polygonPoints);
            }
        } else if (this.fillingType === 'linearup') {
            this.binaryString = this.convertAngleToBinary(90);
            this.assignBinaryValue(this.binaryString);
        } else if (this.fillingType === 'linearleft') {
            this.binaryString = this.convertAngleToBinary(180);
            this.assignBinaryValue(this.binaryString);
        } else if (this.fillingType === 'lineardown') {
            this.binaryString = this.convertAngleToBinary(270);
            this.assignBinaryValue(this.binaryString);
        }
    }

    convertAngleToBinary(angle: number): string {
        if (angle > 0 && angle <= 45) {
            return '1,0,0,1';
        } else if (angle >= 45 && angle < 90) {
            return '0,0,0,1';
        } else if (angle >= 90 && angle < 135) {
            return '0,0,0,1';
        } else if (angle >= 135 && angle < 180) {
            return '0,0,1,1';
        } else if (angle >= 180 && angle < 225) {
            return '0,0,1,0';
        } else if (angle >= 225 && angle < 270) {
            return '0,1,1,0';
        } else if (angle >= 270 && angle < 315) {
            return '0,1,0,0';
        } else if (angle >= 315 && angle < 360) {
            return '1,1,0,0';
        } else if (angle === 0 || angle === 360) {
            return '1,0,0,0';
        } else {
            return 'invalid';
        }
    }
    assignBinaryValue(binaryString: string): void {
        let binaryValue = [];
        binaryValue = binaryString.split(',');
        this.x1 = binaryValue[0];
        this.y1 = binaryValue[1];
        this.x2 = binaryValue[2];
        this.y2 = binaryValue[3];
    }

    _createPoint(iX, iY): any {
        return { x: iX, y: iY };
    }

    _getPolygonPointsForCircularFilling(iValue, _oBoundingBoxSvg): any {
        const that = this;
        const iAngle = 3.6 * iValue;
        const oBox = _oBoundingBoxSvg;
        const aPoints = [];
        let iXDifferenceFromBoundaryCentre, iYDifferenceFromBoundaryCentre, oPolygonPoint;

        // starts at 12, the algorithm computes the coordination for clockwise direction only
        // counter clockwise direction is managed by symmetry
        const oStartPoint = this._createPoint(oBox.x + oBox.width / 2, oBox.y);
        const oCentrePoint = this._createPoint(oBox.x + oBox.width / 2, oBox.y + oBox.height / 2);

        // Reflects x coordinate by centre point for Counter Clockwise type
        function adjustIfCounterClockwise(oPoint): any {
            const oResult = Object.assign({}, oPoint);

            if (that.fillDirection === 'anticlock') {
                const iXDistanceFromCentre = oPoint.x - oCentrePoint.x;
                oResult.x = oCentrePoint.x - iXDistanceFromCentre;
            }

            return oResult;
        }

        // Boundary centre is given by angle distance from the beginning (0°). The returned difference is related
        // to x or y coordinate depending on boundary centre angle (e.g. 0° -> x, 90° -> y, 180° -> x  270° -> y).
        // Boundary length is length of the corresponding side of bounding box (width for x, height for y).
        function computeDifferenceFromBoundaryCentre(inAngle, iBoundaryCentreAngle, iBoundaryLength): any {
            const tan = Math.tan(((iBoundaryCentreAngle - inAngle) * Math.PI) / 180);

            return (tan * iBoundaryLength) / 2;
        }

        aPoints.push(oStartPoint);

        if (0 < iAngle && iAngle < 45) {
            iXDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(iAngle, 0, oBox.height);
            oPolygonPoint = this._createPoint(oStartPoint.x - iXDifferenceFromBoundaryCentre, oStartPoint.y);
            aPoints.push(adjustIfCounterClockwise(oPolygonPoint));
        }

        if (45 <= iAngle) {
            aPoints.push(adjustIfCounterClockwise(this._createPoint(oBox.x + oBox.width, oBox.y)));
        }

        if (45 < iAngle && iAngle < 135) {
            iYDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(iAngle, 90, oBox.width);
            oPolygonPoint = this._createPoint(
                oBox.x + oBox.width,
                oBox.y + oBox.height / 2 - iYDifferenceFromBoundaryCentre
            );
            aPoints.push(adjustIfCounterClockwise(oPolygonPoint));
        }

        if (135 <= iAngle) {
            aPoints.push(adjustIfCounterClockwise(this._createPoint(oBox.x + oBox.width, oBox.y + oBox.height)));
        }

        if (135 < iAngle && iAngle < 225) {
            iXDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(iAngle, 180, oBox.height);
            oPolygonPoint = this._createPoint(
                oBox.x + oBox.width / 2 + iXDifferenceFromBoundaryCentre,
                oBox.y + oBox.height
            );
            aPoints.push(adjustIfCounterClockwise(oPolygonPoint));
        }

        if (225 <= iAngle) {
            aPoints.push(adjustIfCounterClockwise(this._createPoint(oBox.x, oBox.y + oBox.height)));
        }

        if (225 < iAngle && iAngle < 315) {
            iYDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(iAngle, 270, oBox.width);
            oPolygonPoint = this._createPoint(oBox.x, oBox.y + oBox.height / 2 + iYDifferenceFromBoundaryCentre);
            aPoints.push(adjustIfCounterClockwise(oPolygonPoint));
        }

        if (315 <= iAngle) {
            aPoints.push(adjustIfCounterClockwise(this._createPoint(oBox.x, oBox.y)));
        }

        if (315 < iAngle && iAngle <= 360) {
            iXDifferenceFromBoundaryCentre = computeDifferenceFromBoundaryCentre(iAngle, 360, oBox.height);
            oPolygonPoint = this._createPoint(oBox.x + oBox.width / 2 - iXDifferenceFromBoundaryCentre, oBox.y);
            aPoints.push(adjustIfCounterClockwise(oPolygonPoint));
        }

        aPoints.push(oCentrePoint);

        return aPoints;
    }
}

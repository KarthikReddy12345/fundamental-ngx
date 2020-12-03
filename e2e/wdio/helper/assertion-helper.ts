import { clickByMouseMove, getValueOfAttribute, hoverMouse } from './helper';
import checkboxGPData from '../platform/fixtures/appData/checkbox-page-contents';
import { webDriver } from '../driver/wdio';

export function checkRtlOrientation(element: string, index: number): void {
    expect(webDriver.getAttributeByName(element, 'dir', index)).toBe('rtl');
    expect(webDriver.getCSSPropertyByName(element, 'direction', index).value).toBe('rtl');
}

export function checkLtrOrientation(element: string, index: number): void {
    expect(webDriver.getAttributeByName(element, 'dir', index)).toBe('ltr');
    expect(webDriver.getCSSPropertyByName(element, 'direction', index).value).toBe('ltr');
}

export function checkIfDisabled(element, attribute: string, value: string): void {
    expect(webDriver.getAttributeByName(element, attribute)).toBe(value);
}

export async function getMapAttributes(array): Promise<string> {
    return await array.map(async element =>
        await getValueOfAttribute(await element, 'aria-checked'));
}

export async function checkMarkingCheckbox(checkboxArray): Promise<void> {
    const beforeClicking = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickByMouseMove(element);
    }
    const afterClickingOnce = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickByMouseMove(element);
    }
    const afterClickingTwice = await getMapAttributes(checkboxArray);

    expect(Promise.all(beforeClicking)).not.toEqual(Promise.all(afterClickingOnce));
    expect(Promise.all(afterClickingTwice)).toEqual(Promise.all(beforeClicking));
}

export async function checkTristateCheckboxMarking(checkboxArray): Promise<void> {
    const beforeClicking = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickByMouseMove(element);
    }
    const afterClickingOnce = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickByMouseMove(element);
    }
    const afterClickingTwice = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickByMouseMove(element);
    }
    const afterThirdClick = await getMapAttributes(checkboxArray);

    expect(Promise.all(afterClickingOnce)).not.toEqual(Promise.all(beforeClicking));
    expect(Promise.all(afterClickingTwice)).not.toEqual(Promise.all(afterClickingOnce));
    expect(Promise.all(afterThirdClick)).not.toEqual(Promise.all(afterClickingTwice));
    expect(Promise.all(afterThirdClick)).toEqual(Promise.all(beforeClicking));
}

export async function checkTriStateTwoStateCheckboxMarking(checkboxArray): Promise<void> {
    const firstState = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickByMouseMove(element);
    }
    const secondState = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickByMouseMove(element);
    }
    const thirdState = await getMapAttributes(checkboxArray);
    for (const element of checkboxArray) {
        await clickByMouseMove(element);
    }
    const fourthState = await getMapAttributes(checkboxArray);

    expect(Promise.all(secondState)).not.toEqual(Promise.all(firstState));
    expect(Promise.all(thirdState)).not.toEqual(Promise.all(firstState));
    expect(Promise.all(fourthState)).not.toEqual(Promise.all(firstState));
    expect(Promise.all(fourthState)).toEqual(Promise.all(secondState));
}


export function checkHoverState(element): void {
    const checkboxHover = hoverMouse(element).then( () => {
        return element.getCssValue('border-color');
    });
    expect(checkboxHover).toContain(checkboxGPData.checkboxHoverState);
}


export function checkFocusState(element): any {
    const checkboxFocus = clickByMouseMove(element).then( () => {
        return element.getCssValue('outline-style');
    });
    expect(checkboxFocus).toContain(checkboxGPData.checkboxFocusStyle);
}

export async function checkErrorHoverState(element): Promise<void> {
    await (await getValueOfAttribute(element, 'aria-checked'));
    await clickByMouseMove(element);

    const checkboxHover = await hoverMouse(await element).then(() => {
        return element.getCssValue('border-color');
    });
    expect(checkboxHover).toContain(checkboxGPData.checkboxErrorState);
}

export async function checkErrorTooltip(element, tooltipElement): Promise<string> {
    await hoverMouse(element);
    return getValueOfAttribute(await tooltipElement, 'innerHTML'); // todo: Anton, please take a look.
}

export async function checkLabels(array, expectation): Promise<void> {
    const labels = await array.map(async element => {
        return await element.getText();
    });
    expect(Promise.all(labels)).toEqual(expectation);
}

export async function checkBorderColor(array, expectedColor): Promise<void> {
    await array.forEach(async element => {
        await expect(await element.getCssValue('border-color')).toEqual(expectedColor);
    });
}

export async function checkOutputLabel(array, label, selections): Promise<void> {
    await array.forEach(async element => {
        await expect(element.getText()).toEqual(label + selections);
    });
}


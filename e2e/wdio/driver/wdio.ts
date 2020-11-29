export class Wdio {

    get defaultWaitTime(): number {
        return browser.options.waitforTimeout;
    }

    get currentPlatformName(): string {
        return browser.capabilities.platformName;
    }

    open(path: string = ''): void {
        browser.url(path);
    }

    goBack(): void {
        browser.back();
    }

    refreshPage(): void {
        browser.refresh();
    }

    click(selector: string, waitTime: number = this.defaultWaitTime, index: number = 0): void {
        // $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].click();
    }

    doubleClick(selector: string, waitTime: number = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].doubleClick();
    }

    // Clear value before set new
    setValue(selector: string, value: string, waitTime = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        $$(selector)[index].setValue(value);
    };

    // add value to existing one
    addValue(selector: string, value: string, waitTime = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        $$(selector)[index].addValue(value);
    };

    getValue(selector: string, waitTime = this.defaultWaitTime, index: number = 0): string {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].getValue();
    };

    getText(selector: string, waitTime = this.defaultWaitTime, index: number = 0): string {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].getText();
    }

    waitForDisplayed(selector: string, waitTime = this.defaultWaitTime, index: number = 0): boolean {
        return $$(selector)[index].waitForDisplayed({ timeout: waitTime });
    };

    isEnabled(selector: string, waitTime = this.defaultWaitTime, index: number = 0): boolean {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        return $$(selector)[index].isEnabled();
    };

    // Waits to be empty if text is not passed
    waitTextToBePresentInValue(selector: string, text: string = '', waitTime = this.defaultWaitTime, index: number = 0): boolean {
        return $$(selector)[index].waitUntil(function(): boolean {
            return this.getValue() === text;
        }, { timeout: waitTime, timeoutMsg: `${text} is not present in element ${selector}` });

    };

    // Sends to the active element
    sendKeys(keys: string | string[]): void {
        browser.keys(keys);
    };

    getAttributeByName(selector: string, attrName: string, index: number = 0): string {
        return $$(selector)[index].getAttribute(attrName);
    }

    // Returns object (assertions needs to be adapted)
    getCSSPropertyByName(selector: string, propertyName: string, index: number = 0 ): { value: string } {
        return $$(selector)[index].getCSSProperty(propertyName);
    }

    mouseHoverElement(selector: string, waitTime = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForExist({ timeout: waitTime });
        $$(selector)[index].moveTo();

    }

    clearValue(selector: string, waitTime = this.defaultWaitTime, index: number = 0): void {
        $$(selector)[index].waitForDisplayed({ timeout: waitTime });
        $$(selector)[index].clearValue();
    }

    getElementSize(selector: string, prop?: 'width' | 'height', index: number = 0): number | WebdriverIO.SizeReturn {
        return prop ? $$(selector)[index].getSize() : $$(selector)[index].getSize(prop);

    }

    executeScript(callback): string {
        return browser.execute(callback());
    }

    getElementArrayLength(selector: string): number {
        return $$(selector).length;
    }

    waitElementToBePresentInDOM (selector: string, waitTime = this.defaultWaitTime,  index: number = 0): boolean {
        return  $$(selector)[index].waitForExist({ timeout: waitTime });
    }

    scrollIntoView(selector: string, waitTime = this.defaultWaitTime,  index: number = 0): void {
        $$(selector)[index].scrollIntoView();
    }

    isElementClickeble(selector: string, waitTime = this.defaultWaitTime,  index: number = 0): boolean {
       return  $$(selector)[index].isClickable();
    }
}

export const webDriver = new Wdio();
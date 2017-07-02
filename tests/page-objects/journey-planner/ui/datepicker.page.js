'use strict';

const DATE_BUTTON = '.rp-DateButton';
const DATEPICKER_CONTAINER = '[ng-model="datepickerCtrl.date"]';
const DATEPICKER_MONTH = `${DATEPICKER_CONTAINER} .uib-title`;
const DATEPICKER_MONTH_FORWARD = `${DATEPICKER_CONTAINER} .uib-right`;
const DATEPICKER_DAY_SELECTOR = `${DATEPICKER_CONTAINER} td`;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = function datePicker() {
    return {
        setDate: setDate
    };

    /**
     * Set the date with the datepicker
     * @param {string} date The date that needs to be set, format {01 June}
     */
    function setDate(date) {
        let day, month;
        [day, month] = date.split(' ');

        $(DATE_BUTTON).click();
        _setMonth(month);
        return _setDay(day);
    }

    /**
     * Set the month in the datepicker, format is {June}
     * @param {string} month The month that needs to be selected
     * @private
     */
    function _setMonth(month) {
        let clickAmount, selectedMonth;

        if (MONTHS.indexOf(month) === -1) {
            console.warn(`\nWARNING: 'datepicker.setDate()' failed. ${month} is not a valid value, it should be [${MONTHS.join(',')}] \n`);
        }

        return $(DATEPICKER_MONTH).getText()
            .then((monthYear) => {
                [selectedMonth] = monthYear.split(' ');

                const selectedMonthIndex = MONTHS.indexOf(selectedMonth);
                const newMonthIndex = MONTHS.indexOf(month);
                let clicksPromises = [];

                if (newMonthIndex === selectedMonthIndex) {
                    clickAmount = 0;
                } else if (newMonthIndex > selectedMonthIndex) {
                    clickAmount = newMonthIndex - selectedMonthIndex;
                } else {
                    clickAmount = 12 - (selectedMonthIndex - newMonthIndex);
                }

                for (let i = 0; i < clickAmount; i++) {
                    clicksPromises.push($(DATEPICKER_MONTH_FORWARD).click());
                }

                return Promise.all(clicksPromises);
            })
    }

    /**
     * Set the day in the datepicker
     * @param {string} day The day that needs to be selected, format is {01}
     * @private
     */
    function _setDay(day) {
        if (!/\d{2}/.test(day)) {
            console.warn(`\nWARNING: 'datepicker.setDate()' failed. ${day} is not a valid value, it should be '01' | '12' \n`);
        }

        return element.all(by.cssContainingText(DATEPICKER_DAY_SELECTOR, day)).last().click();
    }
}();
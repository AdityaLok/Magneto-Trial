const MESSAGES = require('../constants/messages');
const TIMEOUTS = require('../constants/timeouts');

class DashboardPage {
    get pageHeading() { return $('h1.page-title span'); }
    get signOutLink() { return $('=Sign Out'); }
    get welcomeMenu() { return $('.customer-welcome'); }

    async getHeadingText() {
        await this.pageHeading.waitUntil(async function () {
            return await this.isDisplayed();
        }, {
            timeout: TIMEOUTS.wait.dashboardTitleVisible,
            timeoutMsg: MESSAGES.timeouts.successMsgMissing
        });

        return await this.pageHeading.getText();
    }

    async logout() {
        await this.welcomeMenu.waitUntil(async function () {
            return await this.isDisplayed();
        }, {
            timeout: TIMEOUTS.wait.welcomeMessage,
            timeoutMsg: MESSAGES.timeouts.welcomeNotVisible
        });

        await this.welcomeMenu.click();

        await this.signOutLink.waitUntil(async function () {
            return await this.isClickable();
        }, {
            timeout: TIMEOUTS.medium,
            timeoutMsg: MESSAGES.timeouts.signOutNotClickable
        });

        await this.signOutLink.click();
    }
}

module.exports = new DashboardPage();
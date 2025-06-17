class DashboardPage {
    get pageHeading() { return $('h1.page-title span'); }
    get signOutLink() { return $('=Sign Out');}
    get welcomeMenu() { return $('.customer-welcome');}


    async getHeadingText() {
        await this.pageHeading.waitForDisplayed();
        return await this.pageHeading.getText();
    }

     async logout() {
        await this.welcomeMenu.waitForClickable({ timeout: 5000 });
        await this.welcomeMenu.click();

        await this.signOutLink.waitForClickable({ timeout: 5000 });
        await this.signOutLink.click();
    }
}

module.exports = new DashboardPage();
describe('Magento Website', () => {
    it('should load the homepage and verify title', async () => {
        await browser.url('/');
        console.log("Maximizing window");
        await browser.maximizeWindow();
        const title = await browser.getTitle();
        expect(title).toContain('Home Page');
    });
});
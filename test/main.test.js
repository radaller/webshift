describe('Tech Blog', () => {
    beforeAll(async () => {
        // Emitted when the DOM is parsed and ready (without waiting for resources)
        page.once('domcontentloaded', () => console.info('✅ DOM is ready'));

        // Emitted when the page is fully loaded
        page.once('load', () => console.info('✅ Page is loaded'));

        // Emitted when the page produces a request
        page.on('request', request => console.info(`👉 Request: ${request.url()}`));

        // Emitted when a request, which is produced by the page, fails
        page.on('requestfailed', request => console.info(`❌ Failed request: ${request.url()}`));

        // Emitted when a request, which is produced by the page, finishes successfully
        page.on('requestfinished', request => console.info(`👉 Finished request: ${request.url()}`));

        // Emitted when a response is received
        page.on('response', response => console.info(`👉 Response: ${response.url()}`));
        console.info("test ???????????");

        await page.goto('http://localhost:3040/header/');
    });

    it('should contain title "title"', async () => {
        await expect(page.title()).resolves.toMatch('title');
    });
});
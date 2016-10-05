/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have valid URLS', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have valid names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should have the menu hidden by default', function () {
            var body = document.getElementsByTagName("body")[0];
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */


        it('should hide/show menu when menu icon is clicked', function () {
            var body = document.getElementsByTagName("body")[0];
            var beforeClick = body.classList.contains('menu-hidden');
            var menuIcon = document.getElementsByClassName('menu-icon-link')[0];
            // Simulate click event
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            // Reset the menu to normal state
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should have a .entry element within the .feed container', function (done) {
            var container = document.getElementsByClassName('feed')[0];
            var entries = document.getElementsByClassName('entry');
            var containsEntryClass = false;
            for (var i = 0; i < entries.length; i++) {
                if ($.contains(container, entries[i])) {
                    containsEntryClass = true;
                    break;
                }
            }
            expect(containsEntryClass).toBe(true);
            done();
        });
    });



    /* TODO: Write a new test suite named "New Feed Selection"*/

    describe('New Feed Selection', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });


        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('should change content when loaded', function (done) {
            // See if the article entries differ after loading a new feed
            var feedEntries = $('.entry').clone();
            loadFeed(1, function (feedEntries) {
                var feedEntriesAfter = $('.entry').clone();
                expect(feedEntries).not.toBe(feedEntriesAfter);
                done();
            }(feedEntries));
        });
    });

}());
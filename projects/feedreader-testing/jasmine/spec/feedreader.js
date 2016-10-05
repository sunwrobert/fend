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

        it('have valid URLS', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('have valid names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })
    });

    describe('The menu', function () {
        var body;
        beforeAll(function () {
            body = document.getElementsByTagName("body")[0];
        });

        it('should have the menu hidden by default', function () {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        it('should hide/show menu when menu icon is clicked', function () {
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


    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('should have a .entry element within the .feed container', function () {
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
        });
    });

    describe('New Feed Selection', function () {

        var before;
        var after;
        beforeEach(function (done) {
            loadFeed(0, function () {
                before = $('.entry').clone();
                loadFeed(1, function () {
                    after = $('.entry').clone();
                    done();
                })
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('should change content when loaded', function () {
            console.log(before, after);
            // See if the article entries differ after loading a new feed
            var equal = true;
            for (var i = 0; i < before.length; i++) {
                console.log(before[i].innerText, after[i].innerText);
                if (before[i].innerText !== after[i].innerText) {
                    equal = false;
                    break;
                }
            }
            expect(equal).toBe(false);
        });
    });

}());
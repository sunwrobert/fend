# Website Optimization

## Set up

1. Check out the repository
2. `cd` to it
3. Open index.html in the browser

## Optimizations Made

### HTML (pizza.html)

1. Minimized HTML.
2. Put styles inside HTML as opposed to linking.
3. Compressed images and used HTML5 srcset to use appropriate images based on size.
4. Put styles on the bottom of body.

### JavaScript (js/main.js)

1. Replaced generic `document.querySelector` with corresponding `document.getElementById` or `document.getElementsByClassName`
2. Removed redundant `document.getElementById` or `document.getElementsByClassName` in for loops and placed them outside if they were constant.
3. Removed modulo operations inside for loops and instead created an array that held the indices `0 - i`.
4. Moved layout changes to the outside of for loops to stop Forced Synchronous Layout.
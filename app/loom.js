<SCRIPT>
    var pedalCount = 6;	// Only one pedal is active at a time
    var harnessCount = 8;	// Each warp thread is tied to a harness
    var colorsCount = 8;	// A thread can have one of these colors
    var colorsSize = 15;	// color bar pixels
    var colorsMargin = 5;	// gap pixels below color bar
    var threadSize = 10;	// thread pixels
    var threadMargin = 7;	// gap pixels around weave
    var tieUp = [7, 14, 28, 56, 49, 35];	// tieUp[pedal] = ior of (1 << h) where h ∈ harnesses tied to pedal
    var harness = [	// harness[j] ∈ [0,harnessCount)
    2, 1, 0, 1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    1, 2, 3, 2, 1, 0, 5,
    4, 3, 2, 1, 0, 5,
    4, 3, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 5,
    4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 5, 4, 3];
    var pedals = [	// pedals[i] ∈ [0,pedalCount)
    3, 2, 1, 0, 1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 3, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 5, 0,
    1, 2, 3, 4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 1, 0, 5,
    0,
    1, 2, 3, 4, 5, 0,
    5,
    4, 3, 2, 3, 4, 0,
    1, 2, 3, 4, 3, 2, 1];
    var warp = [	// warp[i] ∈ [0,colorsCount)
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
    var weft = [	// weft[j] ∈ [0,colorsCount)
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
    // var screenWidth = 1200, screenHeight = 1600;
    var svg, svgBox; //, svgNS = "https://www.w3.org/2000/svg";
    var colorsR, tieUpR, harnessR, pedalsR, warpR, weftR, weaveR; // SVG groups' rectangles

    function drawTieUp () {
    let r = 0;
    for (let j = 0; j < harnessCount; j++) {
    for (let i = 0; i < pedalCount; i++) {
    let color = (tieUp[i] & (1 << j)
    ? "black"
    : "white");
    tieUpR[r++].setAttribute("fill", color);}}}

    function drawHarness (n) {
    // Optional N limits redraw to only Nth warp thread.
    let iLo = 0;
    let iHi = harness.length;
    if (n !== undefined) {
    iLo = n;
    iHi = iLo + 1;}
    let w = harness.length;
    for (let j = 0; j < harnessCount; j++) {
    for (let i = iLo; i < iHi; i++) {
    let color = (harness[i] == j
    ? "black"
    : "white");
    harnessR[i + w * j].setAttribute("fill", color);}}}

    function drawPedals (n) {
    // Optional N limits redraw to only ~Nth weft thread.
    let jLo = 0;
    let jHi = pedals.length;
    if (n !== undefined) {
    jLo = ~n;
    jHi = jLo + 1;}
    let r = pedalCount * jLo;
    for (let j = jLo; j < jHi; j++) {
    for (let i = 0; i < pedalCount; i++) {
    let color = (pedals[j] == i
    ? "black"
    : "white");
    pedalsR[r++].setAttribute("fill", color);}}}

    function drawWarp () {
    for (let i = 0; i < harness.length; i++) {
    let choice = warp[i];
    let color = colorsR[choice].style.fill;
    warpR[i].setAttribute("fill", color);}}

    function drawWeft () {
    for (let j = 0; j < pedals.length; j++) {
    let choice = weft[j];
    let color = colorsR[choice].style.fill;
    weftR[j].setAttribute("fill", color);}}

    function drawWeave (n) {
    // Optional N limits redraw to a single thread,
    // N ≥ 0 for Nth warp (vertical) thread,
    // N < 0 for ~Nth weft (horizontal) thread.
    let iLo = 0;
    let iHi = harness.length;
    let jLo = 0;
    let jHi = pedals.length;
    if (n !== undefined) {
    if (n < 0) {
    jLo = ~n;
    jHi = jLo + 1;}
    else {
    iLo = n;
    iHi = iLo + 1;}}
    let w = harness.length;
    for (let j = jLo; j < jHi; j++) {
    let p = pedals[j];
    let t = tieUp[p];
    for (let i = iLo; i < iHi; i++) {
    let h = harness[i];
    let isWarp = t & (1 << h);
    let color = (isWarp
    ? warpR[i].getAttribute("fill")
    : weftR[j].getAttribute("fill"));
    weaveR[i + w * j].setAttribute("fill", color);}}}

    function initGroup (id) {
    // Array of svg rectangles belonging to the given group, augmented by
    // count w and DOM coordinates x0, y0, dx, dy for mouse events.
    // id	svg group id
    // w	width of the array in rectangles
    // x0	horizontal center of first rectangle
    // y0	vertical center of first rectangle
    // dx	±Δx between horizontally consecutive rectangles
    // dy	±Δy between vertically consecutive rectangles
    //	event.x ≈ x0 + dx * i
    //	event.y ≈ y0 + dy * j
    //	rectangle = rectangleArray[i + w * j]
    let group = svg.getElementById(id);
    let rectangleArray = group.children;
    let gBox = group.getBoundingClientRect();
    let r0Box = rectangleArray[0].getBoundingClientRect();
    let sx = (r0Box.x == gBox.x
    ? 1
    : -1);
    let sy = (r0Box.y == gBox.y
    ? 1
    : -1);
    rectangleArray.w = gBox.width / r0Box.width;
    rectangleArray.x0 = r0Box.x + r0Box.width / 2;
    rectangleArray.y0 = r0Box.y + r0Box.height / 2;
    rectangleArray.dx = r0Box.width * sx;
    rectangleArray.dy = r0Box.height * sy;
    return rectangleArray;}

    function getIJ (rectangleArray, event) {
    // box.xy get more negative (i.e., northwest) the more you scroll
    // event.xy apparently do the same, as this code works
    let box = svg.getBoundingClientRect();
    let scrollX = box.x - svgBox.x;
    let scrollY = box.y - svgBox.y;
    let x = event.x - scrollX;
    let y = event.y - scrollY;
    let i = Math.round((x - rectangleArray.x0) / rectangleArray.dx);
    let j = Math.round((y - rectangleArray.y0) / rectangleArray.dy);
    // let r = rectangleArray[i + rectangleArray.w * j];
    return [i, j];}

    window.onload = init;

    function init () {
    svg = document.querySelector("svg");
    svgBox = svg.getBoundingClientRect();
    let suspendID = svg.suspendRedraw(1000);
    colorsR = initGroup("colors");
    tieUpR = initGroup("tieUp");
    harnessR = initGroup("harness");
    pedalsR = initGroup("pedals");
    warpR = initGroup("warp");
    weftR = initGroup("weft");
    weaveR = initGroup("weave");
    drawTieUp();
    drawHarness();
    drawPedals();
    drawWarp();
    drawWeft();
    drawWeave();
    svg.unsuspendRedraw(suspendID);}

    var currentColor = 0; // index into colorsR, initially the first (leftmost) color

    function colorsZ (evt) {
    let [i,] = getIJ(colorsR, evt);
    if (i < colorsCount) {
    currentColor = i;}
    else {
    alert("No new thread colors yet.");}}

    function warpZ (evt) {
    let [i,] = getIJ(warpR, evt);
    warpR[i].setAttribute("fill", colorsR[currentColor].style.fill);
    drawWeave(i);}

    function weftZ (evt) {
    let [, j] = getIJ(weftR, evt);
    weftR[j].setAttribute("fill", colorsR[currentColor].style.fill);
    drawWeave(~j);}

    function pedalsZ (evt) {
    let [i, j] = getIJ(pedalsR, evt);
    pedals[j] = i;
    drawPedals(~j);
    drawWeave(~j);}

    function harnessZ (evt) {
    // alert("Please leave the harness as is but feel free to change the colors and pedals.");
    let [i, j] = getIJ(harnessR, evt);
    harness[i] = j;
    drawHarness(i);
    drawWeave(i);}

    function tieUpZ (evt) {
    // alert("Please leave the tie up as is but feel free to change the colors and pedals.");
    let [i, j] = getIJ(tieUpR, evt);
    tieUp[i] ^= 1 << j;
    drawTieUp();
    for (let p = 0; p < pedals.length; p++) {
    if (pedals[p] == i) {
    drawWeave(~p);}}}

    function weaveZ (evt) {
    // alert("Click on right pedal area, top color bar, upper warp bar or right weft bar.");
    alert("Click on top color bar, top warp bar, top harness area, top right tie up area, right pedal area or right weft bar.")}

</SCRIPT>
// JavaScript Document
//HTML5 Ad Template JS from DoubleClick by Google

var collapsedPanel;
var expandedPanel;
var expandBtn;
var exitBtn;
var closeBtn;

// ======================================For Getting Cookie==========================================

getThisCookie = function(){
    var useCookie = false;
    
    if (Enabler.getParameter("useCookie")) {
        useCookie = (Enabler.getParameter("useCookie") == "true")? true : false;  
    }
    
    if (useCookie===false) {
        var adstate = "expanded";
        serveBillboard(adstate); 
    } 

    else {
        getBilllboardState = setInterval (checkCookie, 1000);
    }
};


checkCookie = function(){
    var adstate = getFlashState();

    if(adstate!="null") { 
        serveBillboard(adstate); 
        clearInterval(getBilllboardState);
    }
};


serveBillboard = function(adstate)
{
    switch (adstate)
    {

        case "expanded" :
            // Enters Expand Function
            Enabler.counter("Billboard State on Page Load: Secondary Load (Expanded)");
            console.log("Billboard State on Page Load: Secondary Load (Expanded)");
            onExpandHandler();
            break;
        case "collapsed" :
            // Enters Collapse Function
            Enabler.counter("Billboard State on Page Load: Collapsed");
            console.log("Billboard State on Page Load: Collapsed");
            break;
        default :
            // Enters Default Function
            Enabler.counter("Billboard State on Page Load: First Load (Expanded)");
            console.log("Billboard State on Page Load: First Load (Expanded)");
            onExpandHandler();
            break;
    }
};

// =============================================================================================

dcrmInit = function(){
    Enabler.setExpandingPixelOffsets(
    0, // left offset of expanded ad
    0, // top offset of expanded ad
    970, // expanded width of ad
    250); // expanded height of ad


    // Set Expansion to Auto-Expand
    Enabler.setStartExpanded(true);
    
    collapsedPanel = document.getElementById('collapsed');
    expandedPanel = document.getElementById('expanded');
    expandBtn = document.getElementById('expand_btn');
    exitBtn = document.getElementById('exit_btn');
    closeBtn = document.getElementById('close_btn');
    container = document.getElementById('container');
    
    // Added Listeners
    addListeners();

    // Getting Cookie from Billboard JS
    getThisCookie();
};


addListeners = function (){
    expandBtn.addEventListener('click', onExpandHandler, false);
    exitBtn.addEventListener('click', onExitHandler, false);
    closeBtn.addEventListener('click', onManualClose, false);

    // Expand Event Listeners
    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START,
    function() {
        
        Enabler.startTimer('expanded_panel');
    

        container.classList.add('is-open');
        collapsedPanel.style.display = "none";
        expandedPanel.style.display = "block";

        Enabler.finishExpand();
    });

    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_FINISH,
    function() {
        // Record Cookies for Expand from Billboard JS
        handleExpand();
    });


    // Collapse Event Listeners
    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START,
    function() {
            
        /////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////

        Enabler.stopTimer('expanded_panel');

        container.classList.remove('is-open');
        expandedPanel.style.display = "none";
        collapsedPanel.style.display = "block";
        
        Enabler.finishCollapse();
        });

        Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_FINISH,
        function() {
        // Record Cookies for Collapse from Billboard JS
        handleCollapse();
        });


};


onExpandHandler = function(e){

    Enabler.requestExpand();
};

onExitHandler = function(e){
    //Enabler.exit('HTML5_Background_Clickthrough');
    closeAd();
};

onCloseHandler = function(e){

    closeAd();
};

onManualClose = function(e) {
    Enabler.reportManualClose();
    Enabler.counter('Manual_Close');
    closeAd();
};

closeAd = function(){
    Enabler.requestCollapse();
};


window.onload = function() {
  /* Initialize Enabler */
  if (Enabler.isInitialized()) {
    dcrmInit();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, dcrmInit);
  }
};


/////////////////////////////////////////////////////////////////////////////////////////


// function containerExit(e) {
//   Enabler.exit('Container Exit');
//   onCloseHandler();
// }

function bookNowExit(e) {
  Enabler.exit('Book Now Exit');
  onCloseHandler();
}

//document.getElementById('ad-unit').addEventListener('click', containerExit, false);


/////////////////////////////////////////////////////////////////////////////////////////


  

function updateClock() {
    var dt = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;
    var dateElems = document.getElementsByClassName('date-time');
    for (i=0; i < dateElems.length; i++) {
      dateElems[i].innerHTML=dt;
    } 

    // call this function again in 10ms
    setTimeout(updateClock, 10);
}

function switchPage(evt, pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("page");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("navlink");

    document.getElementById(pageName).style.display = "block";

    updateClock();
}

function getPageFromQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  var page = urlParams.get('page');

  if (page === null) {
    return 'About';
  }
  else if (page.toLowerCase() === 'projects') {
    return 'Projects';
  }
  else if (page.toLowerCase() === 'artwork') {
    return 'Artwork';
  }
  else if (page.toLowerCase() === 'contact') {
    return 'Contact';
  }
  else {
    return 'About';
  }
  
}

var pageName = getPageFromQueryParams();
switchPage(document.getElementById(pageName.toLowerCase()+'page'), pageName);

function updateClock(page) {
    var dt = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;
    var dateElems = document.getElementsByClassName('date-time');
    for (i=0; i < dateElems.length; i++) {
      dateElems[i].innerHTML=dt;
    } 

    // call this function again in 10ms
    if (page === currentPage) {
      setTimeout(updateClock, 10, page);
    }
}

function switchPage(evt, pageName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("page");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("navlink");

    document.getElementById(pageName).style.display = "block";
    currentPage = pageName;

    params = new URLSearchParams(location.search);
    params.set('page', pageName);
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);

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

var currentPage = getPageFromQueryParams();
switchPage(document.getElementById(currentPage.toLowerCase()+'page'), currentPage);

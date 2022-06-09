function updateClock(page) {
    var dt = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) ;
    var dateElems = document.getElementsByClassName('date-time');
    for (i=0; i < dateElems.length; i++) {
      dateElems[i].innerHTML=dt;
    } 
}

function switchPage(evt, pageName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("page");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    document.getElementById(pageName).style.display = "block";
    currentPage = pageName;

    params = new URLSearchParams(location.search);
    params.set('page', pageName);
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);

    //setFavicon(pageName);

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

function viewportStylingChange(x) {
  var linkContainer = document.getElementsByClassName('links')[0];
  var linkParent = linkContainer.parentNode;

  if (x.matches) { // If is mobile

    if (linkParent.className === 'linkParentMobile') {
      return;
    }

    var newLinkParent = document.getElementsByClassName('linkParentMobile')[0];
    newLinkParent.appendChild(linkContainer);
    linkContainer.style.justifyContent = 'center';
    linkContainer.style.position = 'absolute';
    linkContainer.style.bottom = '0px';

    newLinkParent.style.height = '60px';
    newLinkParent.style.borderTop = '1px solid white';

  } else {
    if (linkParent.className === 'linkParentDesktop') {
      return;
    }

    var newLinkParent = document.getElementsByClassName('linkParentDesktop')[0];
    newLinkParent.appendChild(linkContainer);
    linkContainer.style.justifyContent = 'flex-end';
    linkContainer.style.position = 'static';
    linkContainer.style.bottom = '';
    linkContainer.style.marginTop = '-15px';

    linkParent.style.height = '0px';
    linkParent.style.borderTop = '0px solid black';
  }
}

function setFavicon(pageName) {
  var link = document.querySelector("link[rel~='icon']");

  var pageContainer = document.getElementById(pageName);
  var pageImage = pageContainer.querySelector('.pageimage');
  link.href = pageImage.src;
}

// When the user clicks the button, open the modal 
function openModal(evt, modalId, title, picture, meatId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";

  if (title) {
    modal.querySelector('.modal-content')
          .querySelector('.modal-header')
          .querySelector('.modal-header-text').innerHTML = title;
  }

  if (picture) {
    currentModalImage = modal.querySelector('.modal-content')
          // .querySelector('.modal-body')
          .querySelector('.modal-img');
    currentModalImage.src = picture;
    currentModalImage.style.display = 'initial';
  }

  if (meatId) {
    currentModalMeat = document.getElementById(meatId);
    currentModalMeat.style.display = "block";
  }
  
  document.body.style.overflow = 'hidden';

  currentModal = modal;
}

// When the user clicks on <span> (x), close the modal
function closeModal(evt) {
  if (currentModal) {
    currentModal.style.display = "none";
    currentModal = null;
  }

  if (currentModalMeat) {
    currentModalMeat.style.display = "none";
    currentModalMeat = null;
  }

  document.body.style.overflow = 'scroll';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (currentModal !== null && event.target == currentModal) {
    currentModal.style.display = "none";
    currentModal = null;
    document.body.style.overflow = 'scroll';

    if (currentModalMeat !== null) {
      currentModalMeat.style.display = "none";
      currentModalMeat = null;
    }
  }
}

var currentModal = null;
var currentModalImage = null;
var currentModalMeat = null;
var currentPage = getPageFromQueryParams();
switchPage(document.getElementById(currentPage.toLowerCase()+'page'), currentPage);

var x = window.matchMedia("(max-width: 545px)")
viewportStylingChange(x) // Call listener function at run time
x.addListener(viewportStylingChange) // Attach listener function on state changes
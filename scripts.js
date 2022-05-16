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

    if (pageName == "Artwork") {
      let slideIndex = 1;
      showSlides(slideIndex);
    }

    updateClock();
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

switchPage(document.getElementById('aboutpage'), 'About');
let slideIndex = 1;
showSlides(slideIndex);
    
updateClock();
let winWidth = 1024;
if (window.innerWidth)
  winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
  winWidth = document.body.clientWidth;
const size = window.innerWidth/100;
document.querySelector('html').style.fontSize = `${size}px`

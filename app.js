mdc.autoInit();

am4core.ready(function() {
  loadChart()
  
  loadData()
  Object.keys(connections).forEach(function(k, i) {
      
      for (let i = 0; i < connections[k].length; i++) {
          p0 = citiesL[connections[k][i][0]]
          p1 = citiesL[connections[k][i][1]]
          if (p1 == undefined || p0 == undefined) {
              console.log("Can't make " + connections[k][i][0] + " to " + connections[k][i][1])
              continue
          }
          addLine(p0, p1, k)
      }
  
  });
  
  
  console.log($("#toggleDarkMode"))
  
  if (localStorage.darkMode == "true") {
      $("#toggleDarkMode")[0].checked = true
  } else {
      $("#toggleDarkMode")[0].checked = false
  
  }
  
  toggleDarkMode($("#toggleDarkMode")[0])
  
  })

let panelOpen = false;
let panel = document.getElementById('panel');
gsap.to(".panel", {
  x: -300,
  duration: 1
});
function panelToggle() {
  if (panelOpen) {
    panelOpen = false;
    gsap.to(".panel", {
      x: -300,
      duration: 0.25
    });
    setTimeout(function() {
      panel.style.display = "none";
    }, 250)
  } else {
    panelOpen = true;
    panel.style.display = "block";
    gsap.to(".panel", {
      x: 0, 
      duration: 0.5
    });
  }
};
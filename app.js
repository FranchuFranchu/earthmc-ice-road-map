mdc.autoInit();

function darkModeCheck() {
  if (localStorage.darkMode === "true") {
    dark();
  } else {
    light();
  }
}

am4core.ready(function () {
  loadChart()

  darkModeCheck()

  loadData()
  Object.keys(connections).forEach(function (k, i) {

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
})


let panelOpen = false;
let panel = document.getElementById('panel');
/*gsap.to(".panel", {
  x: -300,
  duration: 1
});*/
function panelToggle() {
  if (panelOpen) {
    panelOpen = false;
    /*
    gsap.to(".panel", {
      x: -600,
      duration: 0.35
    });
    setTimeout(function () {
      panel.style.display = "none";
    }, 350)*/
  } else {
    panelOpen = true;
    panel.style.display = "block";
    /*
    gsap.to(".panel", {
      x: 0,
      duration: 0.5
    });
    */
  }
};
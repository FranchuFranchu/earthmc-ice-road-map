function loadChart() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    MAP_SCALE = 3 / 550 
    // Create map instance
    chart = am4core.create("chartdiv", am4maps.MapChart);
    loadGeodata()

    chart.projection = new am4maps.projections.Projection();
    chart.homeZoomLevel = 2.5;
    chart.homeGeoPoint = {
        latitude: 0,
        longitude: 0
    };

    // Create map polygon series
    polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
    polygonSeries.mapPolygons.template.nonScalingStroke = true;
    polygonSeries.exclude = [];

    // Add line bullets
    cities = chart.series.push(new am4maps.MapImageSeries());
    cities.mapImages.template.nonScaling = true;

    city = cities.mapImages.template.createChild(am4core.Circle);
    city.radius = 6;
    city.fill = chart.colors.getIndex(0).brighten(-0.2);
    city.strokeWidth = 2;
    city.stroke = am4core.color("#fff");
    console.log(am4geodata_worldLow["features"][28])
    console.log(chart.geodata["features"][28])



    chart.zoomControl = new am4maps.ZoomControl();

    chart.events.on("hit", addroad_pick_pos)

}

let darkModeBtn = document.getElementById('dark');
function light() {
    darkModeBtn.innerHTML = "nights_stay";
    polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
    polygonSeries.mapPolygons.each(e => e.fill = chart.colors.getIndex(0).lighten(0.5));
    $("body").removeClass("dark-mode");
    $("a").removeClass("dark-mode");
    $(".panel").removeClass("dark-mode");
}

function dark() {
    darkModeBtn.innerHTML = "brightness_5";
    polygonSeries.mapPolygons.template.fill = am4core.color("#000000");
    polygonSeries.mapPolygons.each(e => e.fill = am4core.color("#000000"));
    $("body").addClass("dark-mode");
    $("a").addClass("dark-mode");
    $(".panel").addClass("dark-mode");
}

function toggleDarkMode() {
    if (localStorage.darkMode === "true") {
        light()
        localStorage.darkMode = false;
    } else {
        dark()
        localStorage.darkMode = true;
    }
}
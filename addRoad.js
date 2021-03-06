
REQUEST_ARGS = {debug_test: true}

function addroad_add_checkpoint(e) {
    var id = $("#addroad-form .addroad-end").length
    REQUEST_ARGS[`p${id}s`] = `${$("#addroad-checkpoint-start").val()}`
    REQUEST_ARGS[`p${id}e`] = `${$("#addroad-checkpoint-end").val()}`
    REQUEST_ARGS[`p${id}m`] = `${$("#addroad-checkpoint-type").val()}`
    var checkpoint_str = `
       <li class="addroad-connection addroad-item-p${id}" my-id="${id}">
        From: <span class="addroad-start">${$("#addroad-checkpoint-start").val()}</span>
        <br/>
        To: <span class="addroad-end">${$("#addroad-checkpoint-end").val()}</span>
        <br/>
        Type: <span class="addroad-type">${$("#addroad-checkpoint-type").val()}</span>
        <br/>
        <input type="hidden" name="p${id}s" class="" value="${$("#addroad-checkpoint-start").val()}"></input>
        <input type="hidden" name="p${id}e" class="" value="${$("#addroad-checkpoint-end").val()}"></input>
        <input type="hidden" name="p${id}m" class="" value="${$("#addroad-checkpoint-type").val()}"></input>
        <button type="button" onclick="addroad_remove(${id})" class="addroad-item-p${id}">X</button>
       </li>
    `       
    // Injection is not dangerous, after all anyone can just send crafted HTTP requests to the server instead
    // so the server needs protection, not the client
    $("#addroad-checkpoints")[0].innerHTML += checkpoint_str

    addroad_update()
    let i = $(`.addroad-item-p${id}`)[0]
    var i1 = $(i).find(".addroad-start").text()
    var i2 = $(i).find(".addroad-end").text()

    let idx = addLine(citiesL[i1], citiesL[i2], $(i).find(".addroad-type").text()) 
    console.log(idx)
    lineSeries[$(i).find(".addroad-type").text()].mapLines.getIndex(idx).form_id = Number(i.getAttribute("my-id"))
    lineSeries[$(i).find(".addroad-type").text()].mapLines.getIndex(idx).from_form = true

    return true;

}

function addroad_update() {
    var prev = null
    $(".addroad-connection").each(function(idx, i){
        var i1 = $(i).find(".addroad-start").text()
        var i2 = $(i).find(".addroad-end").text()
        console.log(i, i1, i2)

        city_names = [i1,i2]

        for (let j = 0; j < city_names.length; j++) {
            let s = city_names[j]
            let res = RegExp(/__pos\(([\d-]+), *([\d-]+)\)/gm).exec(s)
            if (res) {
                citiesL[s] =addCity({"x":Number(res[1]),"y":Number(res[2])}, s)
            } else {
                if (citiesLAll[s] !== undefined) {
                    citiesL[s] = addCity({x: citiesLAll[s].x, y: citiesLAll[s].y}, citiesLAll[s].name)
                }    
            }
        }


    })
}

function addroad_remove(id) {
    let type = $(`input[name=p${id}m]`).val()
    $(`.addroad-item-p${id}`).remove()
    let to_remove = null
    lineSeries[type].mapLines.each(function(e, idx) {
        if (e.form_id == id) {
            to_remove = idx
        } else if (e.form_id > id) {
            e.form_id = e.form_id - 1
        }
    })
    if (to_remove !== null) {
        lineSeries[type].mapLines.removeIndex(to_remove)
    }
    addroad_update()
}

function addroad_pick(id) {
    window.current_picking_id = id
    window.pick_button_time = (new Date()).getTime()
}

function addroad_set_str(id, val) {
    $(id).val(val)
}

function addroad_pick_pos(ev) {
    setTimeout(function(){
        if ((window.current_picking_id !== null) && (((new Date()).getTime() - window.pick_button_time)) > 300) {
            alert("Only picking cities is supported. You can set the position manually by writing __pos(x,y) (on overworld coordinates)") 
            addroad_set_str(window.current_picking_id, "__pos(2000,1000)")
            window.current_picking_id = null

        }

    },100);
    

}

function addroad_pick_city(ev) {
    if (window.current_picking_id !== null) {
        addroad_set_str(window.current_picking_id, ev.target.tooltipText)
        window.current_picking_id = null
    }
    addroad_update()
}

function addroad_submit() {
    console.log(REQUEST_ARGS)
    let formData = new FormData($("#addroad-form")[0])
    fetch('https://emcice.pythonanywhere.com/addroad', {
        method: 'POST',
        body: formData
    })
    .then(data => data.text()
    .then(text => alert(text)
    ))
}
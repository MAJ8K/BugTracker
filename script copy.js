/* if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration=>{
        console.log("SW Registered");
        console.log(registration);
    }).catch(err => {
        console.log("SW Registration Failed!");
        console.log(err);
    });
}else{
    console.log("serviceWorker not in navigatior")
 } */
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// use format authentication tokens & get json-Table from db
const logtemp = document.getElementById('logtemp');
const logcont = document.getElementsByClassName('logcontain')[0];
const addModal = document.getElementById('addModal');
const overlay = document.getElementById('overlay');
const jwt = location.href.split('#')[1];
const token = jwt.split(/=|&/)[3];
console.debug(jwt.split(/=|&/));

let jtable = undefined;
if (jwt != undefined){

    fetch('https://f11dub94fg.execute-api.us-east-1.amazonaws.com/Production/',{
        headers:{
            'Authorization':token,
        }
    })
    .then(item => {
        return item.text();
    })
    .then(format_site)
    .catch(console.error);
}

function format_site(data) {
    jtable = JSON.parse(data);
    for (const log of jtable) {
        color = log[2];
        const elem = logtemp.cloneNode(true);
        elem.style.display = 'grid';
        elem.children[0].innerText = log[0];
        elem.children[1].innerText = log[1];
        if (log[2].length == 4)
            color = '#' + log[2][1] + log[2][1] + log[2][2] + log[2][2] + log[2][3] + log[2][3];
        elem.children[2].value = color;
        elem.children[3].innerText = log[3];
        logcont.appendChild(elem);
    }
}

function buttonID(id) {
    overlay.classList.remove('off');
    switch (id.alt) {
        case 'add':
            addModal.classList.remove('off');
            break;
        case 'filter':break;
        case 'sort':break;
        case 'save':
            savedata();
            overlay.classList.add('off');
            break;
    }
}

function addlog(data) {
    const elem = logtemp.cloneNode(true);
    elem.style.display = 'grid';
    elem.children[0].innerText = data[0].value;
    elem.children[1].innerText = data[1].value;
    elem.children[2].value = data[2].value;
    elem.children[3].innerText = data[3].value;
    logcont.appendChild(elem);
    addModal.classList.add('off');
    overlay.classList.add('off');

    jtable.push([data[0].value,data[1].value,data[2].value,data[3].value])
}

function savedata() {
    fetch('https://f11dub94fg.execute-api.us-east-1.amazonaws.com/Production/',{
        method:'PUT',
        body:JSON.stringify(jtable),
        headers:{
            'Authorization':token,
        }
    })
}
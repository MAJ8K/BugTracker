const r = document.querySelector(':root');
const menubtns = document.getElementsByClassName('nav-link');
const mainsect = document.getElementsByTagName('main')[0];
const templog = document.getElementById('logTemplate');
const jwt = location.href.split('#')[1];
const token = jwt.split(/=|&/)[3];
var addModal = {
	title: document.getElementById('title'),
	color: document.getElementById('col'),
	comment: document.getElementById('comment'),
};
var proModal = {
	pColor: document.getElementById('p-col'),
	sColor: document.getElementById('s-col'),
};
var sortModal = {
	type: document.getElementById('stype'),
	AZ: document.getElementById('azalgo'),
	ZA: document.getElementById('zaalgo'),
	FIND: document.getElementById('falgo'),
	FINDITEM: document.getElementById('fitem'),
};

//////////// utility Functions \\\\\\\\\\\\\\
function newLog(){
	mainsect.appendChild(templog.content.cloneNode(true));
	return mainsect.lastElementChild;
}
/////////// BackendFunctionality ///////////

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
	.then(populate_site)
	.catch(console.error);
}

function populate_site(data) {
	jtable = JSON.parse(data);
	for (const i in jtable) {
		var log = jtable[i];
		if (log[0] == log[1] == log[2] == log[3]) continue;
		const elem = newLog();
		var titleArea = elem.children[0].children[0].children[0];
		var colorArea = elem.children[0].children[0].children[1];
		var commArea = elem.children[1];
		titleArea.innerText = log[0];
		// tagArea.innerText = log[1];
		var color = log[2];
		if (log[2].length == 4)
			color = '#' + log[2][1] + log[2][1] + log[2][2] + log[2][2] + log[2][3] + log[2][3];
		colorArea.style.backgroundColor = color;
		commArea.innerText = log[3];
		elem.children[2].children[1].value = i;
	}
}

function savedata() {
	fetch('https://f11dub94fg.execute-api.us-east-1.amazonaws.com/Production/',{
		method:'PUT',
		body:JSON.stringify(jtable),
		headers:{
			'Authorization':token,
		}
	});
}

/////////// FrontendFunctionality ///////////

for (const btn of menubtns) {
	btn.addEventListener('click',e => {
		for (const i of menubtns) {
			i.classList.remove('active');
		}
		btn.classList.add('active');
	});
}

function addLog() {
	var clon = newLog();
	var titleArea = clon.children[0].children[0].children[0];
	var colorArea = clon.children[0].children[0].children[1];
	var commArea = clon.children[1];
	titleArea.innerText = addModal.title.value;
	colorArea.style.backgroundColor = addModal.color.value;
	commArea.innerText = addModal.comment.value;

	jtable.push([titleArea.innerText,'',addModal.color.value,commArea.innerText]);
	savedata();
}
function clearAdd(){
	addModal.color.value = '#000';
	addModal.title.value = '';
	addModal.comment.value = '';
}

function applyProfile(){
	r.style.setProperty('--col-primary',proModal.pColor.value);
	r.style.setProperty('--col-secondary',proModal.sColor.value);
}
function revertProfile(){
	var rs = getComputedStyle(r);
	proModal.pColor.value = rs.getPropertyValue('--col-primary');
	proModal.sColor.value = rs.getPropertyValue('--col-secondary');
}

function sortLogs(){
	console.log('There is no sort function');

}
function revertSort() {
	sortModal.AZ.checked = false;
	sortModal.ZA.checked = false;
	sortModal.FIND.checked = false;
	sortModal.FINDITEM.value = '';
}

function trashlog(id) {
	let log = id.parentElement.parentElement;
	log.remove();
	jtable[id.value] = ['','','',''];
	console.log(jtable[id.value]);
	savedata();
}
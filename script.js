var r = document.querySelector(':root');
var menubtns = document.getElementsByClassName('nav-link');
var mainsect = document.getElementsByTagName('main')[0];
var templog = document.getElementById('logTemplate');
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

for (const btn of menubtns) {
	btn.addEventListener('click',e => {
		for (const i of menubtns) {
			i.classList.remove('active');
		}
		btn.classList.add('active');
	});
}

function addLog() {
	var clon = templog.content.cloneNode(true);
	mainsect.appendChild(clon);
	clon = mainsect.lastElementChild;
	var titleArea = clon.children[0].children[0].children[0];
	var colorArea = clon.children[0].children[0].children[1];
	titleArea.innerText = addModal.title.value;
	colorArea.style.backgroundColor = addModal.color.value;
	clon.children[1].innerText = addModal.comment.value;
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
	console.log('here');

}
function revertSort() {
	sortModal.AZ.checked = false;
	sortModal.ZA.checked = false;
	sortModal.FIND.checked = false;
	sortModal.FINDITEM.value = '';
}
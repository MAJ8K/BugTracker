var menubtns = document.getElementsByClassName('nav-link');

for (const btn of menubtns) {
	btn.addEventListener('click',e => {
		for (const i of menubtns) {
			i.classList.remove('active');
		}
		btn.classList.add('active');
	});
}
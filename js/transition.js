window.onload = () => {
	const transition_el = document.querySelector('.transition');
	const anchors = document.querySelectorAll('a, p');
	
	setTimeout(() => {
		transition_el.classList.remove('is-active');
	}, 500);
	
	for (let i=0; i<anchors.length; i++){
		const anchor = anchors[i];
		anchor.addEventListener('click', e =>{
			e.preventDefault();
			let target=e.target.href;
			console.log(e);
			console.log(e.target);
			console.log(e.target.href);
			console.log(anchor);
			console.log("yoo");
			console.log(target);
			transition_el.classList.add('is-active');
			setTimeout(() =>{
				window.location.href=target;
		},500);
		});
	}
}

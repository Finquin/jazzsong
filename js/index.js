
const domTvGlassFooter = document.querySelector('.tv-glass-footer')
const domAddCoverFront = document.querySelector('.tv-glass-header--col2')
const domAddGuitarPlayer = document.querySelector('.tv-glass-main--guitarplayer')
const domAddAlbum = document.querySelector('.tv-glass-main--album')



const data = jazzguitaristas

// ************************************
//             Extraer datos
// ************************************

// [x]
// ===========================
// Extraemos todo los albunes
// ===========================
const extractAllAlbum = (data) => {
	return data
		.flatMap(guitarrista =>
			guitarrista.discography.map(album => album.album)
		);
}

// [x]
// ===========================
// Extraemos todo los ids
// ===========================
const extractId = (data) => {
	return data
		.flatMap(guitarrista =>
			guitarrista.discography.map(discography => discography.id)
		);
}

// [x]
// ===========================
// Extraer data por el id
// ===========================
const extracDataId = (albumIdToFind) => {

	albumData = data
		.flatMap(guitarrista =>
			guitarrista.discography.map(discography => ({ guitarrista: guitarrista.name, discography, favorite: false }))
		)
		.find(data => data.discography.id === albumIdToFind)
	return albumData
};

// ************************************
//        Agregamos  datos al dom
// ************************************

// [x]
// ==================================================
// Insertamos en el Html guitarrista album
// ==================================================
const addGuitarPlayer = (dataId) => {
	const spanHtml = `<span class="guitarPlayer">${dataId.guitarrista}</span>`
	domAddGuitarPlayer.innerHTML = spanHtml
}

// [x]
// ==================================================
// Insertamos en el Html album
// ==================================================
const addAlbum = (dataId) => {
	const spanHtml = `<span class = "album">${dataId.discography.album}</span> `
	domAddAlbum.innerHTML = spanHtml
}

// [x]
// =================================
// Insertamos en el Html img discos
// =================================
const albumFrontCoverHtml = (data) => {
	const albumNames = extractAllAlbum(data)

	const ids = extractId(data)

	albumNames.forEach((albumName, index) => {

		const img = document.createElement('img')
		img.id = `${ids[index]}`;

		img.src = `../img/covers/front/${albumName.toLowerCase().replaceAll(" ", ".")}_front.png`;
		img.alt = `${albumName}`;

		img.className = "cover-mini-front	cover-mini-front--gray";
		domTvGlassFooter.appendChild(img);

	});

	btnImg();

}

// [x]
// ====================================
// Insertar Cover Front seleccionado
// ====================================
const addCoverFrontSelect = (dataId) => {
	const img = `<img class="album-front-select" src="./img/covers/front/${dataId.discography.album.split(" ").join(".").toLowerCase()}_front.png" alt="tapa frontal del disco${dataId.discography.album}"></img>`
	domAddCoverFront.innerHTML = img
}

// [ ]
// ====================================
// Control de la animamacion del disco
// ====================================
const actionPlayDisc = (event) => {
	const albumIdToFind = `${event.target.id}`
	const domCoverMiniFront = document.querySelectorAll('.cover-mini-front')

	const coverImgFrontHtml = document.querySelector(`#${albumIdToFind}`)
	// gameDisaHtlm.setAttribute("id", "rotating-disc");
	// gameDiscHtlm.classList.remove("move-disc-close");
	domCoverMiniFront.forEach(e => e.classList.add("img-gray"))
	coverImgFrontHtml.classList.remove("img-gray");
	// gameDiscHtlm.classList.add("move-disc-open");
	// playDisc = "start";

	const dataId = extracDataId(albumIdToFind)
	console.log('==> dataId', dataId)
	// addCoverBackSelect(dataId)
	addCoverFrontSelect(dataId)
	// // addCoverInsideSelect(dataId)
	// songListHtm(dataId)
	addGuitarPlayer(dataId)
	addAlbum(dataId)

}


//**************/
// CLICKS
//*************/


// ==================================================
// Activar click img
// ==================================================
const btnImg = () => {
	const domCoverMiniFront = document.querySelectorAll('.cover-mini-front')
	console.log('==> domCoverMiniFront', domCoverMiniFront)
	domCoverMiniFront.forEach((button) => {
		button.addEventListener('click', (event) => actionPlayDisc(event))
	})
}



albumFrontCoverHtml(data)

console.log('==> extractAllAlbum', extractAllAlbum(data))
console.log('==> extractId', extractId(data))

const domTvGlassFooter = document.querySelector(".tv-glass-footer");
const domAddCoverFront = document.querySelector(".tv-glass-header--col2");
const domAddGuitarPlayer = document.querySelector(".tv-glass-main--guitarplayer");
const domAddAlbum = document.querySelector(".tv-glass-main--album");
const domAddSongFavorite = document.querySelector(".tv-glass-main--favorite");
const domAddSongs = document.querySelector(".tv-glass-header--col1");

const btnDeleteAllFavorite = document.querySelector(".delete");

const favorite = JSON.parse(localStorage.getItem("favorite")) || [];

const svgData = "data:image/svg+xml;utf8,";
const svgSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30	30' fill='none'><path  fill='black' d='";

const svgImgDelete = "M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16'";
const svgImgHeart = "M22.45,6a5.47,5.47,0,0,1,3.91,1.64,5.7,5.7,0,0,1,0,8L16,26.13,5.64,15.64a5.7,5.7,0,0,1,0-8,5.48,5.48,0,0,1,7.82,0L16,10.24l2.53-2.58A5.44,5.44,0,0,1,22.45,6m0-2a7.47,7.47,0,0,0-5.34,2.24L16,7.36,14.89,6.24a7.49,7.49,0,0,0-10.68,0,7.72,7.72,0,0,0,0,10.82L16,29,27.79,17.06a7.72,7.72,0,0,0,0-10.82A7.49,7.49,0,0,0,22.45,4Z'";

// const pp = `<svg width="25px" height="25px" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path
// d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
// stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
// </svg>`;

// const base64String = btoa(pp);

// const dataUrl = `data:image/svg+xml;base64,${base64String}`;
// const dataUrls = `data:image/svg+xml;base64,${pp}`;

// eslint-disable-next-line no-undef
const data = jazzguitaristas;
const messagesTostify = ["Agregado", "Eliminado"];
// eslint-disable-next-line quotes
const avatarTostify = [`${svgData}${svgSvg}${svgImgHeart}></path></svg>`, `${svgData}${svgSvg}${svgImgDelete}fill='none' stroke='#000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' ></path></svg>`];

// eslint-disable-next-line no-undef
// const data = jazzguitaristas;
// const messagesTostify = ["Agregado", "Eliminado"];
// // eslint-disable-next-line quotes
// const avatarTostify = [`${svgData}${svgSvg}<path  d="${svgImgHeart}" stroke="black" fill="black"/></svg>`, `${svgData}${svgSvg}<path  d="${svgImgDelete}" stroke="black" fill="black"/></svg>`];

const optionsToastify = {
	text: "",
	duration: 112000,
	avatar: "",
	selector: "toastify",
	newWindow: true,
	className: "toastify-style",
	gravity: "bottom",
	position: "right",
	stopOnFocus: true,
	callback: function () {
		// eslint-disable-next-line no-undef
		Toastify.reposition();
	},

};

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
};

// [x]
// ===========================
// Extraemos todo los ids
// ===========================
const extractId = (data) => {
	return data
		.flatMap(guitarrista =>
			guitarrista.discography.map(discography => discography.id)
		);
};

// [x]
// ===========================
// Extraer data por el id
// ===========================
const extracDataId = (albumIdToFind) => {

	const albumData = data
		.flatMap(guitarrista =>
			guitarrista.discography.map(discography => ({ guitarrista: guitarrista.name, discography, favorite: false }))
		)
		.find(data => data.discography.id === albumIdToFind);
	return albumData;
};

// ************************************
//        Agregamos  datos al dom
// ************************************

// [x]
// ==================================================
// Insertamos en el Html guitarrista album
// ==================================================
const addGuitarPlayer = (dataId) => {
	const spanHtml = `<span class="guitarPlayer">${dataId.guitarrista}</span>`;
	domAddGuitarPlayer.innerHTML = spanHtml;
};

// [x]
// ==================================================
// Insertamos en el Html album
// ==================================================
const addAlbum = (dataId) => {
	const spanHtml = `<span class = "album">${dataId.discography.album}</span> `;
	domAddAlbum.innerHTML = spanHtml;
};

// [x]
// =================================
// Insertamos en el Html img discos
// =================================
const albumFrontCoverHtml = (data) => {
	const albumNames = extractAllAlbum(data);

	const ids = extractId(data);

	albumNames.forEach((albumName, index) => {

		const img = document.createElement("img");
		img.id = `${ids[index]}`;

		img.src = `../img/covers/front/${albumName.toLowerCase().replaceAll(" ", ".")}_front.png`;
		img.alt = `${albumName}`;

		img.className = "cover-mini-front	cover-mini-front--gray";
		domTvGlassFooter.appendChild(img);

	});

	btnImg();

};

// [x]
// ====================================
// Insertar Cover Front seleccionado
// ====================================
const addCoverFrontSelect = (dataId) => {
	const img = `<img class="album-front-select" src="./img/covers/front/${dataId.discography.album.split(" ").join(".").toLowerCase()}_front.png" alt="tapa frontal del disco${dataId.discography.album}"></img>`;
	domAddCoverFront.innerHTML = img;
};

// [x]
// ==================================================
// Insertar Favoritos
// ==================================================
const addfavorite = () => {
	domAddSongFavorite.innerHTML = favorite.map(item => `<span class="favorite">${item.title}</span>`).join("");
};

[];
// ==================================================
// Insertamos en el Html los temas
// ==================================================
const addListSong = (dataId) => {
	const spanHtml = [];

	dataId.discography.songs.forEach((song, index) => {
		const isFavorite = favorite.some(e => e.title === song.title && e.favorite);

		spanHtml.push(`<div class="song-ctn song"><span>0${index}.</span><span class="">${song.title}</span>
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25"><path  class="icon-favorite ${isFavorite ? "icon-favorite--active" : ""}"  song="${song.title}" d="M12,22C9.63,20.17,1,13.12,1,7.31C1,4.38,3.47,2,6.5,2c1.9,0,3.64,0.93,4.65,2.48L12,5.78l0.85-1.3 C13.86,2.93,15.6,2,17.5,2C20.53,2,23,4.38,23,7.31C23,13.15,14.38,20.18,12,22z" ></path></svg></div>`);
	});

	domAddSongs.innerHTML = spanHtml.join("");

	favoriteBtn();
};

// [ ]
// ====================================
// Control de la animamacion del disco
// ====================================
const actionPlayDisc = (event) => {
	const albumIdToFind = `${event.target.id}`;
	const domCoverMiniFront = document.querySelectorAll(".cover-mini-front");

	const coverImgFrontHtml = document.querySelector(`#${albumIdToFind}`);
	// gameDisaHtlm.setAttribute("id", "rotating-disc");
	// gameDiscHtlm.classList.remove("move-disc-close");
	domCoverMiniFront.forEach(e => e.classList.add("img-gray"));
	coverImgFrontHtml.classList.remove("img-gray");
	// gameDiscHtlm.classList.add("move-disc-open");
	// playDisc = "start";

	const dataId = extracDataId(albumIdToFind);
	console.log("==> dataId", dataId);
	// addCoverBackSelect(dataId)
	addCoverFrontSelect(dataId);
	// // addCoverInsideSelect(dataId)
	addListSong(dataId);
	addGuitarPlayer(dataId);
	addAlbum(dataId);

};

// ==================================================
// Insertamos favoritos
// ==================================================
const addFavoriteEvent = (event) => {
	const songTitle = event.target.attributes.song.value;

	const findExistFavorite = favorite.find((e) => e.title === songTitle);

	if (findExistFavorite) {

		event.target.classList.remove("icon-favorite--active");
		favoriteDelete(songTitle);
		optionsToastify.text = messagesTostify[1];
		optionsToastify.avatar = avatarTostify[1];

	} else {

		optionsToastify.text = messagesTostify[0];
		optionsToastify.avatar = avatarTostify[0];
		event.target.classList.toggle("icon-favorite--active");
		favorite.push({ title: songTitle, favorite: true });

	}

	addfavorite();
	localStorage.setItem("favorite", JSON.stringify(favorite));
	console.log("==> optionsToastify", optionsToastify);

	// eslint-disable-next-line no-undef
	Toastify(optionsToastify).showToast();
	// console.log(Toastify(optionsToastify));
};

//**************/
// CLICKS
//*************/

console.log("==> optionsToastify", optionsToastify);
// ==================================================
// Eliminar Favoritos
// ==================================================
const favoriteDelete = (songTitle) => {
	if (favorite) {
		const indexToDelete = favorite.findIndex(e => e.title === songTitle);

		if (indexToDelete !== -1) {
			return favorite.splice(indexToDelete, 1);
		}
	}
	return false;
};

// ==================================================
// Activar click img
// ==================================================
const btnImg = () => {
	const domCoverMiniFront = document.querySelectorAll(".cover-mini-front");
	console.log("==> domCoverMiniFront", domCoverMiniFront);
	domCoverMiniFront.forEach((button) => {
		button.addEventListener("click", (event) => actionPlayDisc(event));
	});
};

// ==================================================
// Guardar favoritos
// ==================================================
const favoriteBtn = () => {

	const iconFavoriteHtml = document.querySelectorAll(".icon-favorite");

	iconFavoriteHtml.forEach(btn => {
		btn.addEventListener("click", (event) => {
			if (event.target.classList.contains("icon-favorite")) {
				addFavoriteEvent(event);
			}
		});
	});
};

// =================================================
// Delete todos los favoritos
// ================================================= =
const favoriteAllDelete = () => {
	const iconFavoriteHtmlList = document.querySelectorAll(".icon-favorite");

	favorite.length = 0;
	localStorage.clear();
	domAddSongFavorite.innerHTML = "";

	iconFavoriteHtmlList.forEach(iconFavoriteHtml => {
		iconFavoriteHtml.classList.remove("icon-favorite--active");
	});

};

albumFrontCoverHtml(data);
addfavorite();

// eslint-disable-next-line no-undef
btnDeleteAllFavorite.addEventListener("click", () => favoriteAllDelete());

console.log("==> extractAllAlbum", extractAllAlbum(data));
console.log("==> extractId", extractId(data));

// <path class="icon-favorite icon-favorite--active" song="Blue Bossa" d="M12,22C9.63,20.17,1,13.12,1,7.31C1,4.38,3.47,2,6.5,2c1.9,0,3.64,0.93,4.65,2.48L12,5.78l0.85-1.3 C13.86,2.93,15.6,2,17.5,2C20.53,2,23,4.38,23,7.31C23,13.15,14.38,20.18,12,22z"></path>

// data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='25px' height='25px' viewBox='0 0 1024 1024' fill='none'><path  stroke='black' fill='black' d='M12,22C9.63,20.17,1,13.12,1,7.31C1,4.38,3.47,2,6.5,2c1.9,0,3.64,0.93,4.65,2.48L12,5.78l0.85-1.3 C13.86,2.93,15.6,2,17.5,2C20.53,2,23,4.38,23,7.31C23,13.15,14.38,20.18,12,22z/></svg>
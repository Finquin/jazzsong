
const domTvGlassFooter = document.querySelector(".tv-glass-footer");
const domAddCoverFront = document.querySelector(".tv-glass-header--col2");
const domAddGuitarPlayer = document.querySelector(".tv-glass-main--guitarplayer");
const domAddAlbum = document.querySelector(".tv-glass-main--album");
const domAddSongFavorite = document.querySelector(".tv-glass-main--favorite");
const domAddSongs = document.querySelector(".tv-glass-header--col1");

const btnDeleteAllFavorite = document.querySelector(".delete");

const favorite = JSON.parse(localStorage.getItem("favorite")) || [];

// eslint-disable-next-line no-undef
const data = jazzguitaristas;
const messagesTostify = ["Agregado a Favoritos", "Eliminado de Favoritos"];
const colorTostify = ["linear-gradient(to right, #00b09b, #96c93d)", "linear-gradient(to right, #981B00, #FF6949)"];

const optionsFavorite = {
	text: "hola",
	duration: 3000,
	selector: "tv-glass-header--col2",
	newWindow: true,
	gravity: "top",
	position: "right",
	stopOnFocus: true,
	callback: function () {
		// eslint-disable-next-line no-undef
		Toastify.reposition();
	},
	close: true,
	style: {
		background: "linear-gradient(to right, #00b09b, #96c93d)",
	}
};

// const options = {
// 	text: "Mensaje personalizado",
// 	selector: "divv",
// 	duration: 3000,
// };

// Toastify(options).showToast();

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

	console.log("==> dataId", dataId);

	dataId.discography.songs.forEach((song, index) => {
		const isFavorite = favorite.some(e => e.title === song.title && e.favorite);

		spanHtml.push(`<div class="song-ctn song"><span>0${index}.</span><span class="">${song.title}</span>
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25"><path  class="icon-favorite ${isFavorite ? "icon-favorite--active" : ""}"  song="${song.title}" d="M12,22C9.63,20.17,1,13.12,1,7.31C1,4.38,3.47,2,6.5,2c1.9,0,3.64,0.93,4.65,2.48L12,5.78l0.85-1.3
		C13.86,2.93,15.6,2,17.5,2C20.53,2,23,4.38,23,7.31C23,13.15,14.38,20.18,12,22z" ></path>
</svg></div>`);
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
		optionsFavorite.text = messagesTostify[1];
		optionsFavorite.style.background = colorTostify[1];

	} else {

		optionsFavorite.text = messagesTostify[0];
		optionsFavorite.style.background = colorTostify[0];
		console.log("==> optionsFavorite", optionsFavorite);
		event.target.classList.toggle("icon-favorite--active");
		favorite.push({ title: songTitle, favorite: true });

	}

	addfavorite();
	localStorage.setItem("favorite", JSON.stringify(favorite));
	console.log("==> optionsFavorite", optionsFavorite);

	// eslint-disable-next-line no-undef
	Toastify(optionsFavorite).showToast();
};

//**************/
// CLICKS
//*************/

console.log("==> optionsFavorite", optionsFavorite);
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


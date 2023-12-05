// TODO:
// [ ] Agregarle luz al boton
//
// eslint-disable-next-line no-undef

const domTvGlassFooter = document.querySelector(".tv-glass-footer");
const domAddCoverFront = document.querySelector(".tv-glass-header--col2");
const domAddGuitarPlayer = document.querySelector(".tv-glass-footer--col1-namePlayer");
const domAddAlbum = document.querySelector(".tv-glass-footer--col1--album");
const domAddSongFavorite = document.querySelector(".tv-glass-main--favorite");
const domAddSongs = document.querySelector(".tv-glass-header--col1");

const btnDeleteAllFavorite = document.querySelector(".delete");
const btnDeleteSvgDelete = document.querySelector(".delete svg path");
const btnStop = document.querySelector("#stop");
const btnPause = document.querySelector("#pause");
const playButton = document.querySelector("#play");

const audio = new Audio();
const favorite = JSON.parse(localStorage.getItem("favorite")) || [];
const dataJson = [];

// [x]
// ===========================
// Accedemos a nuestra db
// ===========================
const getDataGuitarPlayer = () => {
	fetch("../js/data.json")
		.then(response => response.json())
		.then(data => dataJson.push(...data))
		.then(() => albumFrontCoverHtml())
		.catch(error => {
			console.error("Error al extraer json:", error);
		});
};

const svgData = "data:image/svg+xml;base64,";

const createSvgUrl = (svgString) => {
	const base64String = btoa(svgString);
	return `${svgData}${base64String}`;
};

const svgImgDelete = `
  <svg width="25px" height="25px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="hsl(0deg 0% 18%)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
`;

const svgImgHeart = `
  <svg width="25px" height="25px" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.45,6a5.47,5.47,0,0,1,3.91,1.64,5.7,5.7,0,0,1,0,8L16,26.13,5.64,15.64a5.7,5.7,0,0,1,0-8,5.48,5.48,0,0,1,7.82,0L16,10.24l2.53-2.58A5.44,5.44,0,0,1,22.45,6m0-2a7.47,7.47,0,0,0-5.34,2.24L16,7.36,14.89,6.24a7.49,7.49,0,0,0-10.68,0,7.72,7.72,0,0,0,0,10.82L16,29,27.79,17.06a7.72,7.72,0,0,0,0-10.82A7.49,7.49,0,0,0,22.45,4Z" fill="hsl(0deg 0% 18%)"></path>
  </svg>
`;

const dataUrlHeart = createSvgUrl(svgImgHeart);
const dataUrlDelete = createSvgUrl(svgImgDelete);

const messagesTostify = ["Agregado", "Eliminado"];
const avatarTostify = [dataUrlHeart, dataUrlDelete];

const optionsToastify = {
	text: "",
	duration: 800,
	avatar: "",
	selector: "toastify",
	newWindow: true,
	className: "toastify-style",
	gravity: "bottom",
	position: "right",
	stopOnFocus: true,
};

// ************************************
//             Extraer datos
// ************************************

// [x]
// ===========================
// Extraemos todo los albunes
// ===========================
const extractAllAlbum = () => {
	return dataJson
		.flatMap(guitarrista =>
			guitarrista.discography.map(album => album.album)
		);
};

// [x]
// ===========================
// Extraemos todo los ids
// ===========================
const extractId = () => {
	return dataJson.flatMap(guitarrista =>
		guitarrista.discography.map(discography => discography.id)
	);
};

// [x]
// ===========================
// Extraer data por el id
// ===========================
const extracDataId = (albumIdToFind) => {

	const albumData = dataJson
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
	const spanHtml = `<span class="guitarPlayer-list-name">${dataId.guitarrista}</span>`;
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
const albumFrontCoverHtml = () => {
	const albumNames = extractAllAlbum(dataJson);
	console.log("==> dataJson", dataJson);
	const ids = extractId();

	albumNames.forEach((albumName, index) => {

		const img = document.createElement("img");
		img.id = `${ids[index]}`;

		img.src = `../img/covers/front/${albumName.toLowerCase().replaceAll(" ", ".")}_front.png`;
		img.alt = `${albumName}`;

		img.className = "cover-mini-front	cover-mini-front--gray";
		domTvGlassFooter.appendChild(img);

	});

	btnSelectAlbum();
	addfavorite();
};

// [x]
// ====================================
// Insertar Cover Front seleccionado
// ====================================
const addCoverFrontSelect = (dataId) => {
	console.log("==> dataId", dataId);
	const img = `<img class="album-front-select" src="./img/covers/front/${dataId.discography.album.split(" ").join(".").toLowerCase()}_front.png" alt="tapa frontal del disco${dataId.discography.album}"></img>`;
	domAddCoverFront.innerHTML = img;
};

// [x]
// ==================================================
// Insertar Favoritos
// ==================================================
const addfavorite = () => {
	domAddSongFavorite.innerHTML = favorite.map(item =>
		`<span id=${item.id} class="favorite">${item.title}</span>`
	).join("");
	btnListFavorite();
};

// [x];
// ==================================================
// Insertamos en el Html los temas
// ==================================================
const addListSong = (dataId, albumIdToFind, songTrack) => {
	const spanHtml = [];

	dataId.discography.songs.forEach((song, index) => {
		let select = false;
		const isFavorite = favorite.some(e => e.title === song.title && e.favorite);

		if (isFavorite) {
			if (songTrack.title === song.title) {
				select = true;
			} else {
				select = false;
			}
		}

		spanHtml.push(`<div class="song-ctn song ${select ? "favorite-list-select" : ""} "><span>0${index}.</span><span code="${song.code}" class="track" >${song.title}</span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 25 25"><path  id=${albumIdToFind} class="icon-favorite ${isFavorite ? "icon-favorite--active" : ""}"  song="${song.title}" d="M12,22C9.63,20.17,1,13.12,1,7.31C1,4.38,3.47,2,6.5,2c1.9,0,3.64,0.93,4.65,2.48L12,5.78l0.85-1.3 C13.86,2.93,15.6,2,17.5,2C20.53,2,23,4.38,23,7.31C23,13.15,14.38,20.18,12,22z" ></path></svg></div>`);
	});

	domAddSongs.innerHTML = spanHtml.join("");
	btnSaveFavorite();
	addListSongClick();
};

// [ ]
// ====================================
// Control de la animamacion del disco
// ====================================
const actionPlayDisc = (event, selectListFavorite = false) => {

	const songTrack = {};

	if (selectListFavorite) { songTrack.title = event.target.innerHTML; }

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

	// addCoverBackSelect(dataId)
	addCoverFrontSelect(dataId);
	// // addCoverInsideSelect(dataId)
	addListSong(dataId, albumIdToFind, songTrack);
	addGuitarPlayer(dataId);
	addAlbum(dataId);

};

// ==================================================
// Insertamos favoritos
// ==================================================
const addFavoriteEvent = (event) => {

	const songTitle = event.target.attributes.song.value;
	const id = event.target.attributes.id.value;

	const findExistFavorite = favorite.find((e) => e.title === songTitle);

	if (findExistFavorite) {

		event.target.classList.remove("icon-favorite--active");
		fnFavoriteDelete(songTitle);

		optionsToastify.text = messagesTostify[1];
		optionsToastify.avatar = avatarTostify[1];

	} else {

		optionsToastify.text = messagesTostify[0];
		optionsToastify.avatar = avatarTostify[0];
		event.target.classList.toggle("icon-favorite--active");
		favorite.push({ title: songTitle, favorite: true, id });

	}

	addfavorite();
	localStorage.setItem("favorite", JSON.stringify(favorite));

	// eslint-disable-next-line no-undef
	Toastify(optionsToastify).showToast();
	// console.log(Toastify(optionsToastify));
};

//**************/
// CLICKS
//*************/

// ==================================================
// Click track song
// ==================================================
const addListSongClick = () => {
	const domAddTrack = document.querySelectorAll(".track");
	domAddTrack.forEach((button) => {
		button.addEventListener("click", (event) => audioPlayerPlay(event));
	});

};

const audioPlayerPlay = (event) => {

	const code = event.target.attributes.code.value;

	const title = event.target.innerHTML.split(" ").join("_").toLowerCase();
	const audioPath = `../track/${title}.mp3`;
	btnPlay(audioPath, code);
};

// ==================================================
// Eliminar Favoritos
// ==================================================
const fnFavoriteDelete = (songTitle) => {
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
const btnSelectAlbum = () => {
	const domCoverMiniFront = document.querySelectorAll(".cover-mini-front");
	domCoverMiniFront.forEach((button) => {
		button.addEventListener("click", (event) => actionPlayDisc(event));
	});
};

// ==================================================
// Activar click lista Favorite
// ==================================================
const btnListFavorite = () => {
	const domSelectFavorite = document.querySelectorAll(".favorite");
	domSelectFavorite.forEach((button) => {
		button.addEventListener("click", (event) => getFavoriteSelect(event));
	});
};

const getFavoriteSelect = (event) => {

	const selectListFavorite = true;
	actionPlayDisc(event, selectListFavorite);

};

// ==================================================
// Guardar favoritos
// ==================================================
const btnSaveFavorite = () => {

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
	btnDeleteSvgDelete.classList.add("delete--active");
};

// eslint-disable-next-line no-undef
btnDeleteAllFavorite.addEventListener("click", () => favoriteAllDelete());

// =================================================
//  Reproductor
// ================================================= =

playButton.addEventListener("click", () => {

	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}

});

btnStop.addEventListener("click", () => {
	audio.pause();
	audio.currentTime = 0;
});

btnPause.addEventListener("click", () => {
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
});

// =================================================
//  Cargar tema
// ================================================= =

const btnPlay = (audioPath) => {
	if (audio.src !== audioPath) {
		audio.src = audioPath;
	}
};

getDataGuitarPlayer();



const tvGlassFooter = document.querySelector('.tv-glass-footer')


const data = jazzguitaristas

// ===========================
// Extraemos todo los albunes
// ===========================
const extractAllAlbum = (data) => {
	return jazzguitaristas
		.flatMap(guitarrista =>
			guitarrista.discography.map(album => album.album)
		);
}

// ===========================
// Extraemos todo los ids
// ===========================
const extractId = (data) => {
	return data
		.flatMap(guitarrista =>
			guitarrista.discography.map(discography => discography.id)
		);
}

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

		img.className = "cover-mini-album-front cover-mini-album-front--gray";

		tvGlassFooter.appendChild(img);

	});

	btnImg();

}


albumFrontCoverHtml(data)

console.log('==> extractAllAlbum', extractAllAlbum(data))
console.log('==> extractId', extractId(data))
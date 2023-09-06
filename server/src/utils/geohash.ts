// https://gist.github.com/mjaakko/f148be987734fdb9f7f8e71458516571

//Converts a bounding box bounded by minLat and maxLat and minLng and maxLng to a list of geohashes (e.g. ["60;24/19/84", "60;24/19/85"]) used for MQTT topic filters
export function bbox2geohashes(minLat: number, minLng: number, maxLat: number, maxLng: number) {
	const deltaLat = maxLat - minLat;
	const deltaLng = maxLng - minLng;

	const geohashLevel = Math.max(Math.ceil(Math.abs(Math.log10(deltaLat))), Math.ceil(Math.abs(Math.log10(deltaLng))));
	const delta = Math.pow(10, -geohashLevel);

	const geohashes = [];

	let lat = truncate(minLat, geohashLevel);

	while (lat < maxLat) {
		let lng = truncate(minLng, geohashLevel);
		while (lng < maxLng) {
			geohashes.push(calculateGeohash(lat, lng, geohashLevel));
			lng += delta;
		}
		lat += delta;
	}

	return geohashes;
}

function calculateGeohash(lat: number, lng: number, level: number) {
	let geohash = Math.floor(lat) + ";" + Math.floor(lng);

	for (let i = 0; i < level; i++) {
		geohash += "/";
		geohash += lat.toFixed(level + 1).split(".")[1][i];
		geohash += lng.toFixed(level + 1).split(".")[1][i];
	}

	return geohash;
}

function truncate(x: number, n: number) {
	if (n == 0) {
		return x;
	}

	const split = x.toFixed(n + 1).split(".");

	return parseFloat(split[0] + "." + split[1].substring(0, n));
}

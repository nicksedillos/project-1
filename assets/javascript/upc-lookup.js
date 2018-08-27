/*
When a UPC code is defined by the user, make a query to Barcode Lookup.
Record the entire result to the associated parent item in Firebase (to minimize future API calls).
Log this result to console.
*/

const apiKey = o35yk1ejzwscfqtoq9p0hucufz3okk;
var barcodeLookupQueryURL = "https://api.barcodelookup.com/v2/products?barcode=" + upc + "&key=" + apiKey;

if ((upc == `undefined`)) {
	console.log(`UPC is not defined.`);
} else {
	function lookUpUPC() {
		console.log(`Looking up UPC#${upc}.`)
		$.ajax({
			url: barcodeLookupQueryURL,
			method: "GET"
		})
		.then(function(response) {
			const barcodeLookupInfo = response.data.products;
			console.log(barcodeLookupInfo);
		});
	};
}
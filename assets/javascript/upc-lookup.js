const apiKey = o35yk1ejzwscfqtoq9p0hucufz3okk;
var barcode = ""
var queryURL = "https://api.barcodelookup.com/v2/products?barcode=" + barcode + "&key=" + apiKey;

/*
When a UPC code is added, make a query to Barcode Lookup.
Record the entire result to the parent item in Firebase.
Log this result to console.
*/
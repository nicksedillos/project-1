  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD_a_1FWqhyWixQ1kusQNchcDb-MUrbLWk",
    authDomain: "home-inventory-manager.firebaseapp.com",
    databaseURL: "https://home-inventory-manager.firebaseio.com",
    projectId: "home-inventory-manager",
    storageBucket: "home-inventory-manager.appspot.com",
    messagingSenderId: "165919673421"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event){
    event.preventDefault();

var itemName = $("#item").val().trim();
var quantaty = $("#quantaty").val().trim();
var catagory = $("#catagory").val().trim();
var location = $("#location").val().trim();
var price = $("#price").val().trim();

var newItem = {
    item: itemName,
    quantaty: quantaty,
    catagory: catagory,
    location: location,
    price: price
};
database.ref().push(newItem);
console.log(newItem.item);
console.log(newItem.quantaty);
console.log(newItem.catagory);
console.log(newItem.location);
console.log(newItem.price);
});


database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
var item = childSnapshot.val().item
var quantaty = childSnapshot.val().quantaty
var catagory = childSnapshot.val().catagory
var location = childSnapshot.val().location
var price = childSnapshot.val().price

var quantAdd = $("<button class='button button1'>").text("+");
var quantSub = $("<button class='button button2'>").text("-");
var newRow = $("<tr>").append(
    $("<td>").text(item),
    $("<td>").text(quantaty).prepend(quantAdd,quantSub),
    $("<td>").text(catagory),
    $("<td>").text(location),
    $("<td>").text(price)
  );

  $(".table > tbody").append(newRow);

}); 
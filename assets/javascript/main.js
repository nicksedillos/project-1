// Initialize Firebase
const config = {
  apiKey: "AIzaSyD_a_1FWqhyWixQ1kusQNchcDb-MUrbLWk",
  authDomain: "home-inventory-manager.firebaseapp.com",
  databaseURL: "https://home-inventory-manager.firebaseio.com",
  projectId: "home-inventory-manager",
  storageBucket: "home-inventory-manager.appspot.com",
  messagingSenderId: "165919673421"
};

firebase.initializeApp(config);

const database = firebase.database();

//Add item functionality 
$("#addItem").on("click", function(event){
  event.preventDefault();
  $(`#error-message`).remove()
  const errorAlert = $(`<div>`);
    errorAlert.addClass(`alert alert-danger`)
    errorAlert.attr(`id`,`error-message`)

  const itemName = $("#item").val().trim();
      if (itemName === ""){
        errorAlert.html(`Add a name for the item`)
        $("#item").after(errorAlert);
        return;
    } 
  const quantity = $("#quantity").val().trim();
      if (quantity === ""){
        errorAlert.html(`Add a quantity`)
        $("#quantity").after(errorAlert);
        return;
    } 
  const category = $("#category").val().trim();
      if (category === ""){
        errorAlert.html(`Add a category`)
        $("#category").after(errorAlert);
        return;
    } 
  const location = $("#location").val().trim();
      if (location === ""){
        errorAlert.html(`Add where the item is stored`)
        $("#location").after(errorAlert);
        return;
      } 
  const price = $("#price").val().trim();
      if (price === ""){
        errorAlert.html(`What was the price?`)
        $("#price").after(errorAlert);
        return;
      }

  database.ref(`/itemList`).push({
    item: itemName,
    quantity: quantity,
    category: category,
    location: location,
    price: price,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  });

  document.getElementById("addNewItem").reset()
});




// Appends all Firebase datat to the table
database.ref(`/itemList`).on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    const item = childSnapshot.val().item
    const quantity = childSnapshot.val().quantity
    const category = childSnapshot.val().category
    const location = childSnapshot.val().location
    const price = childSnapshot.val().price

    const quantAdd = $("<button class='button button1'>").html("+");
    const quantSlash = $("<span></span>").html("/");
    const quantSub = $("<button class='button button2'>").html("-");
    const quantSpace = $("<span></span>").html(" ")
    const newRow = $("<tr>").append(
       
        $(`<td data-item=${item}>`).html(item),
        $(`<td data-item=${item}>`).html(quantity).prepend(quantAdd,quantSlash,quantSub,quantSpace),
        $(`<td data-item=${item}>`).html(location),
        $(`<td data-item=${item}>`).html(category),
        $(`<td data-item=${item}>`).html(price)
      );
      
      $("#itemBody").prepend(newRow);

  }, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
}); 

// Search funtionaltiy at the top
$(document).ready(function(){
  $("#searchInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#itemBody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

// $('.button1').on("click", function() {

//   database.orderByChild(`/itemList`).equalTo(item).on("click", function() {
//     console.log(snapshot.key);

//     console.log(childSnapshot.val());

//     const item = childSnapshot.val().item
//     const quantity = childSnapshot.val().quantity
//     const category = childSnapshot.val().category
//     const location = childSnapshot.val().location
//     const price = childSnapshot.val().price
//     const add = childSnapshot.val().quanitity;


//     const quantAdd = $("<button class='button button1'>").html("+");
//     const quantSlash = $("<span></span>").html("/");
//     const quantSub = $("<button class='button button2'>").html("-");
//     const quantSpace = $("<span></span>").html(" ")


//     add++;
//     const newRow = $("<tr>").append(
       
//         $(`<td data-item=${item}>`).html(item),
//         $(`<td data-item=${item}>`).html(quantity).prepend(quantAdd,quantSlash,quantSub,quantSpace),
//         $(`<td data-item=${item}>`).html(location),
//         $(`<td data-item=${item}>`).html(category),
//         $(`<td data-item=${item}>`).html(price)
//       );
      
//       $("#itemBody").prepend(newRow);

//   }, function(errorObject) {
//   console.log("Errors handled: " + errorObject.code);
// });
// });

  

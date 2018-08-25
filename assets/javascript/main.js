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
let clicked = null;
let locationStorage = [];
let categoryStorage = [];

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

// Function to create table head, form input, and the table body to display the database data.
function createTable() {
    $(`#displayDiv`).empty();
    
    const table = $(`<table class="table">`)
    const tableHead = $(`<thead>`);
    const tHeadRow = $(`<tr>`);
    const tableHeaders = ["Item","Quantity","Location","Category","Price"]
    for (i of tableHeaders) {
        const tHeader = $(`<th>`)
          tHeader.html(i)
          tHeadRow.append(tHeader);
    }

    tableHead.append(tHeadRow);

    const formRow = $(`<tr>`);
    const formPlaceholders = ["Milk","#","Location","Category","Price"]
    for (let i = 0; i < tableHeaders.length; i++){
      const tCol = $(`<th>`);
      const input = $(`<input>`);
      if(formPlaceholders[i] === "#"){
        input.attr({
          "id": tableHeaders[i].toLowerCase(),
          "placeholder": formPlaceholders[i],
          "type": "number",
          "min": "0"
        });
      } else {
        input.attr({
          "id": tableHeaders[i].toLowerCase(),
          "placeholder": formPlaceholders[i],
          "type": "text",
      });
    }
      input.addClass(`form-control`);

      tCol.append(input);
      formRow.append(tCol);
    }

    table.append(tableHead);
    table.append(formRow);
    table.append(`<tbody id="itemBody">`)
    $(`#displayDiv`).append(table);
}


// Appends all Firebase datat to the table
function displayTable() {
  createTable();

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
      const deleteButton = $("<button class='button deleteButtons' data-toggle='modal' data-target='#deleteModal'>").html("✘")
      const newRow = $("<tr>").append(
        
          $(`<td data-item=${item}>`).html(item),
          $(`<td data-item=${item}>`).html(quantity).prepend(quantAdd,quantSlash,quantSub,quantSpace),
          $(`<td data-item=${item}>`).html(location),
          $(`<td data-item=${item}>`).html(category),
          $(`<td data-item=${item}>`).html(price).append(deleteButton)
        );
        
        $("#itemBody").prepend(newRow);

    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }); 
}
// Initiates the table creation
displayTable();

// Create Location dropdown
function category() {
    for(i of categoryStorage){

      const dropdown = $(`<a>`);
      dropdown.addClass(`dropdown-item listItem`);
      dropdown.html(i)
      $(`#categoryDropdown`).append(dropdown);
    }
}

// Search funtionaltiy at the top
$(document).ready(function(){
  $("#searchInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#itemBody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

// filter based on click
$(".listItem").on("click", function(){
     clicked = $(this).text().toLowerCase();
    $("#itemBody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(clicked) > -1 )
    });
});
// Filter table based on click.
$(".headerName").on("click", function(){
    clicked = ""
   $("#itemBody tr").filter(function() {
       $(this).toggle($(this).text().toLowerCase().indexOf(clicked) > -1 )
   });
});

$(`body`).on(`click`, `#itemList`, function(){
  if($(this).text() === "Item List"){
    return;
  } else {
    displayTable();
  }
})
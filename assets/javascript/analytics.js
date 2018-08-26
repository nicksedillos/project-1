const itemlist = database.ref("/itemList");

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
$(`body`).on(`click`,`#analyticsSwitch`,function(){
    $(`#displayDiv`).empty();
    google.charts.setOnLoadCallback(drawChart);
    $(`#mainHeader`).html(`Analytics`)
})

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
let dataStore = [];

function drawChart() {

    // Create the data table.
    let data = new google.visualization.DataTable();
    // Set chart options
    let barchart_options = {'title':'Quantity Stored',
                    'width':`100%`,
                    'height':980};

    data.addColumn('string', 'Item');
    data.addColumn('number', 'Quantity');
    itemlist.on("child_added", function(snapshot) {
        data.addRows([
            [snapshot.val().item, parseInt(snapshot.val().quantity)],
        ])
        var barChart = new google.visualization.BarChart(document.getElementById('displayDiv'));
            barChart.draw(data, barchart_options);

    });

}

// Function for the table to update on any page
database.ref(`/itemList`).on(`child_changed`, function(snapshot){
    const currentDisplay = $(`#mainHeader`).text().trim();
    console.log(currentDisplay);
    if (currentDisplay === "Item List"){
      displayTable();
    } else {
        drawChart();
    }
  })

  // Filter based on click
$("body").on("click",`.listItem`, function(){
    const filterName = $(this).html()
    const currentPage = $(`#mainHeader`).text().trim()
    const searchType = $(this).data(`type`)

    if (currentPage === "Item List"){
        $(`#displayDiv`).empty();
        displayTable();
        clicked = $(this).text().toLowerCase();
        $("#itemBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(clicked) > -1 )
        
        });
    } else if(currentPage === "Analytics"){
        let data = new google.visualization.DataTable();
        // Set chart options
        let barchart_options = {'title':'Quantity Stored',
                        'width':`100%`,
                        'height':980};
    
        data.addColumn('string', 'Item');
        data.addColumn('number', 'Quantity');
        itemlist.orderByChild(`${searchType}`).equalTo(filterName).on("child_added", function(snapshot) {
            data.addRows([
                [snapshot.val().item, parseInt(snapshot.val().quantity)],
            ])
            var barChart = new google.visualization.BarChart(document.getElementById('displayDiv'));
                barChart.draw(data, barchart_options);
        });
    }
});

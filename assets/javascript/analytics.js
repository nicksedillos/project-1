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
                'width':1000,
                'height':400};

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
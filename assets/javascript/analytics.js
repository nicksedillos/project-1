const itemlist = database.ref("/itemList");
let currentActiveChart = `Bar`
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
$(`body`).on(`click`,`#analyticsSwitch`,function(){
    $(`#displayDiv`).empty();
    $(`#analyticsButtons`).remove();
    const graphTypes = ["Bar","Pie","Column"]
    const barButtons = $("<ul>")
    barButtons.addClass(`nav justify-content-center`);
    barButtons.attr(`id`,`analyticsButtons`)

    for (let i of graphTypes){
        const butttonList = $(`<li>`)
        butttonList.addClass(`nav-item`);

        const button = $(`<button>`)
        button.addClass(`nav-link`)
        button.attr(`id`, `barType${i}`)
        button.html(`${i}`)
        butttonList.append(button);
        barButtons.append(butttonList);
    }
    $(`#navDisplay`).append(barButtons);

    google.charts.setOnLoadCallback(drawBarChart);
    $(`#mainHeader`).html(`Analytics`)
})

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
let dataStore = [];

$(`body`).on(`click`,`#barTypePie`, drawPieChart);
$(`body`).on(`click`,`#barTypeBar`, drawBarChart);
$(`body`).on(`click`,`#barTypeColumn`, drawColumnChart);


function drawBarChart() {
    currentActiveChart = `Bar`;
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
        let barChart = new google.visualization.BarChart(document.getElementById('displayDiv'));
            barChart.draw(data, barchart_options);
    });
}

function drawPieChart() {
    currentActiveChart = `Pie`;
    // Create the data table.
    let data = new google.visualization.DataTable();
    // Set chart options
    let piechart_options = {'title':'Quantity Stored',
                    'width':`100%`,
                    'height':980};

    data.addColumn('string', 'Item');
    data.addColumn('number', 'Quantity');
    itemlist.on("child_added", function(snapshot) {
        data.addRows([
            [snapshot.val().item, parseInt(snapshot.val().quantity)],
        ])
        let pieChart = new google.visualization.PieChart(document.getElementById('displayDiv'));
            pieChart.draw(data, piechart_options);
    });
}

function drawColumnChart() {
    currentActiveChart = `Column`;
    // Create the data table.
    let data = new google.visualization.DataTable();
    // Set chart options
    let column_options = {title: "Quantity Stored",
                    width:`100%`,
                    height:`980`,
                    bar: {groupWidth: "95%"},
                    legend: { position: "none"},
                };

    data.addColumn('string', 'Item');
    data.addColumn('number', 'Quantity');
    itemlist.on("child_added", function(snapshot) {
        data.addRows([
            [snapshot.val().item, parseInt(snapshot.val().quantity)],
        ])
        let columnChart = new google.visualization.ColumnChart(document.getElementById('displayDiv'));
            columnChart.draw(data, column_options);
    });
  }

// Function for the table to update on any page
database.ref(`/itemList`).on(`child_changed`, function(snapshot){
    const currentDisplay = $(`#mainHeader`).text().trim();
    if (currentDisplay === "Item List"){
      displayTable();
    } else {
        if (currentActiveChart === `Bar`){
            drawBarChart();
        } else if (currentActiveChart === `Pie`){
            drawPieChart();
        } else if (currentActiveChart === `Donut`){
            drawDonutChart();
        } else (console.log(`error-101`))
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
        let chart_options = {'title':'Quantity Stored',
                        'width':`100%`,
                        'height':980};
    
        data.addColumn('string', 'Item');
        data.addColumn('number', 'Quantity');
        itemlist.orderByChild(`${searchType}`).equalTo(filterName).on("child_added", function(snapshot) {
            data.addRows([
                [snapshot.val().item, parseInt(snapshot.val().quantity)],
            ])
            if(currentActiveChart === `Bar`){
            let barChart = new google.visualization.BarChart(document.getElementById('displayDiv'));
                barChart.draw(data, chart_options);
            } else if (currentActiveChart === `Pie`){
                let pieChart = new google.visualization.PieChart(document.getElementById('displayDiv'));
                pieChart.draw(data, chart_options);
            } else if (currentActiveChart === `Column`){
                let column_options = {title: "Quantity Stored",
                    width:`100%`,
                    height:`980`,
                    bar: {groupWidth: "95%"},
                    legend: { position: "none"},
                };
                let columnChart = new google.visualization.ColumnChart(document.getElementById('displayDiv'));
                columnChart.draw(data, column_options);
            } else {console.log(`Error 101`)}
        });
    }
});

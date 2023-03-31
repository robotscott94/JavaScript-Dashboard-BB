// Create url variable to load data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Loads json data
d3.json(url).then(function(data) {

    // Returns object that can be used to plot top ten otu sample values for selected individual
    function topten(x) {
        
            // Identify sample from list input
            let selectedSample = data.samples.find(sample => sample.id === x);
            // Creates trace array using data from json
            let traceArray = [{
                y: selectedSample.otu_ids.slice(0,10).map(function(item) {
                    return `OTU: ${item}`
                }).reverse(),
                x: selectedSample.sample_values.slice(0,10).reverse(),
                type: "bar",
                orientation: "h",
                text: selectedSample.otu_labels.slice(0,10).reverse()
            }];
            return traceArray;
            
        
    }

    // Returns objects used to plot sample data for each individual
    function bubble(x) {
        
            // Identify sample from list input
            let selectedSample = data.samples.find(sample => sample.id === x);
            // Creates trace array using data from json
            let traceArray = [{
                x: selectedSample.otu_ids,
                y: selectedSample.sample_values,
                text: selectedSample.otu_labels,
                mode: 'markers',
                marker: {
                    color: selectedSample.otu_ids,
                    size: selectedSample.sample_values
                }
            }];
            return traceArray;
            
        
    }

    // Add individual metadata to the panel
    function metadat(x) {
        // Identify metadata from list input
        let mdVals = data.metadata.find(person => person.id === parseInt(x));
        // Select panel from index.html
        let panel = d3.select("#sample-metadata")
        // Clears panel to repopulate when new selections are made
        panel.html("");
        // Updates html panel item
        Object.entries(mdVals).forEach(([key, value]) => {
            panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
          });
    }
    
    // Create a gauge
    // Gauge is not functional, but the code is included for future use

    // var data = [
    //     {
    //         domain: { x: [0, 1], y: [0, 1] },
    //         value: 270,
    //         title: { text: "Speed" },
    //         type: "indicator",
    //         mode: "gauge+number"
    //     }
    // ];
    
    // var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    // Plotly.newPlot('myDiv', data, layout);



    // Function populates dropdown menu and initializes visuals
    function init() {
            // Select id objects from json
            let values = data.names;
            // Select dropdown menu
            let dropdownMenu = d3.select("#selDataset");
            //Update dropdown with id numbers
            values.forEach(value => {
                dropdownMenu.append("option").text(value).property("value", value);
            })
            // Choose first sample data to initialize app
            const firstSample = values[0];
            // Populate visualizations with first individual in dataset
            Plotly.plot("bar", topten(firstSample));
            Plotly.plot("bubble", bubble(firstSample));
            metadat(firstSample);
        
    }

    // Updates visuals when a new item is selected from dropdown list
    function optionChanged(newSample) {
        metadat(newSample);
        Plotly.react("bar", topten(newSample));
        Plotly.react("bubble", bubble(newSample));
    };

    // Makes optionChanged() available for use in index.html
    window.optionChanged = optionChanged;

    // Initializes app
    init();
});






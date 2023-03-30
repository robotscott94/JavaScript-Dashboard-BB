const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



d3.json(url).then(function(data) {

    function topten(x) {
        
            
            let selectedSample = data.samples.find(sample => sample.id === x);
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

    function bubble(x) {
        
            
            let selectedSample = data.samples.find(sample => sample.id === x);
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

    function metadat(x) {
        let mdVals = data.metadata.find(person => person.id === parseInt(x));
        let panel = d3.select("#sample-metadata")
        panel.html("");
        Object.entries(mdVals).forEach(([key, value]) => {
            panel.append("h5").text(`${key.toUpperCase()}: ${value}`);
          });
    }
    

    function init() {
                    
            let values = data.names;
            let dropdownMenu = d3.select("#selDataset");
                
            values.forEach(value => {
                dropdownMenu.append("option").text(value).property("value", value);
            })
        
            const firstSample = values[0];
            Plotly.plot("bar", topten(firstSample));
            Plotly.plot("bubble", bubble(firstSample));
            metadat(firstSample);
        
    }

    function optionChanged(newSample) {
        metadat(newSample);
        Plotly.react("bar", topten(newSample));
        Plotly.react("bubble", bubble(newSample));
    };

    window.optionChanged = optionChanged;

    init();
});






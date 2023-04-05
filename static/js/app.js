const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let dropdownMenu = d3.select("#selDataset");
// Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//     console.log(data);
// });


function init() {
    d3.json(url).then(function (data) {

        const names = data.names
        for (let index = 0; index < names.length; index++) {
            const element = names[index];
            dropdownMenu.append("option").text(element).property("value", element)
        }
        buildCharts(names[0])
        buildBarChart(names[0]);
        buildBubbleChart(names[0]);
        // buildGaugeChart(names[0]);
        // console.log(names)
    });
}
init()

function optionChanged(id) {
    console.log(id);
    buildCharts(id);
    buildBarChart(id);
    buildBubbleChart(id);
    // buildGaugeChart(id);
}

function buildCharts(id) {
    console.log(id)
    d3.json(url).then(function(data) {
        console.log(data);
        const metadata = data.metadata
        const metadataobj= metadata.filter(o => o.id == id)[0]
        console.log(metadataobj)    
        d3.select("#sample-metadata").html("");
        Object.entries(metadataobj).forEach(([key,value]) => {
            console.log(key,value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

    });
}


function buildBarChart(id) {
    console.log(id)
    d3.json(url).then(function(data) {
        console.log(data);
        const samples = data.samples;
        let samplesobj = samples.filter(o=> o.id == id)[0];
        console.log(samplesobj)
        let otu_ids = samplesobj.otu_ids.slice(0,10).map(id => `OTU ${id}`)
        let otu_labels = samplesobj.otu_labels.slice(0,10);
        let sample_values = samplesobj.sample_values.slice(0,10);

        console.log(otu_ids,otu_labels,sample_values);

        let yticks = otu_ids.reverse();
        let xticks = sample_values.reverse();
        let labels = otu_labels.reverse();

        let trace = {
            x : xticks,
            y : yticks,
            text : labels,
            type : "bar",
            orientation : "h"
        };

      

        let layout = {
            title: "Top 10 OTUs"
        };

        Plotly.newPlot("bar", [trace], layout)

    });
};

function buildBubbleChart(id) {
    console.log(id)
    d3.json(url).then(function(data) {
        console.log(data);
        const samples = data.samples;
        let samplesobj = samples.filter(o=> o.id == id)[0];
        let otu_ids = samplesobj.otu_ids;
        let otu_labels = samplesobj.otu_labels;
        let sample_values = samplesobj.sample_values;

        console.log(otu_ids,otu_labels,sample_values);

        let trace1 = {
            x : otu_ids,
            y : sample_values,
            text : otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
};

        let layout = {
        title: "Bacteria in each sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
};

        Plotly.newPlot("bubble", [trace1], layout)
    });
};


// function buildGaugeChart(id) {
//     console.log(id)
//     d3.json(url).then(function(data) {
//         console.log(data);
//         const samples = data.samples;
//         let samplesobj = samples.filter(o=> o.id == id)[0];
//         let otu_ids = samplesobj.otu_ids;
//         let otu_labels = samplesobj.otu_labels;
//         let sample_values = samplesobj.sample_values;

//         console.log(otu_ids,otu_labels,sample_values);
        
//         let trace2 = {
//             type: "indicator",
//             mode: "gauge+number+delta",
            
//             delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//             gauge: {
//             axis: { range: [0,9], tickwidth: 1, tickcolor: "green" },
//             bar: { color: "green" },
//             bgcolor: "white",
//             borderwidth: 2, 
//             bordercolor: "white",
//             steps: [
//                 { range: [0,1], color: "RGB(253,245,230)" },
//                 { range: [1,2], color: "RGB(245,245,245)" },
//                 { range: [2,3], color: "RGB(245,222,179)" },
//                 { range: [3,4], color: "RGB(255,250,205)" },
//                 { range: [4,5], color: "RGB(250,250,210)" },
//                 { range: [5,6], color: "RGB(143,188,143)" },
//                 { range: [6,7], color: "RGB(60,179,113)" },
//                 { range: [7,8], color: "RGB(102,205,170)" },
//                 { range: [8,9], color: "RGB(95,158,160)" },

//             ]
//             // pointer = Object {
//             //     type : "path",
//             //     value: 1.9,
//             //     fillcolor: "Red"
//             // };

//             let layout = {
//                 title: "Belly Button Washing Frequency Scrubs per Week" 
//                 // "width": 500,
//                 // "height": 400,
//                 // "margin": { t: 25, r: 25, l: 25, b: 25 },
//                 // "paper_bgcolor": "white",
//                 // "font": { color: "black", family: "Arial" }
//             };
//             }  
  
  
  
//             Plotly.newPlot('gauge', [trace2], layout);
// }});
// };
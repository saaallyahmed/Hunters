console.log("app.js")

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("../static/data/data.json").then((data) => {
    console.log("data")
    console.log(data)

    var sampleNames = data.age;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(columnName) {
  // Fetch new data each time a new sample is selected
  //buildMetadata(newSample);
  console.log(columnName);
  buildCharts(columnName);

}

function buildCharts(columnName) {
  console.log("columnName");
  console.log(columnName);

  d3.json("../static/data/data.json").then((data) => {
    var metadata = data.metadata;
    console.log("metadata");
    console.log(metadata);

    var resultArray = metadata.filter(sampleObj => sampleObj.age == columnName);
    console.log("resultArray");
    console.log(resultArray);

    var maleArray = resultArray.filter(sampleObj => sampleObj.sex == "m");
    console.log("maleArray");
    console.log(maleArray);

    maleCount = maleArray.length
    console.log("maleCount");
    console.log(maleCount);

    var femaleArray = resultArray.filter(sampleObj => sampleObj.sex == "f");
    console.log("femaleArray");
    console.log(femaleArray);

    femaleCount = femaleArray.length
    console.log("femaleCount");
    console.log(femaleCount);

    // Basic Info 
    var PANEL = d3.select('#basic-metadata');

    PANEL.html("");

    statusArray = ["single", "seeing someone", "available", "married"]

    // for male    
    PANEL.append("h6").text(`Male: ${maleCount}`);
    PANEL.append("h6").text(`==== status ====`);

    statusArray.map((s) => {
      var male_status = maleArray.filter(sampleObj => sampleObj.status == s);
      PANEL.append("h6").text(`${s}: ${male_status.length}`);
    });

    PANEL.append("p").text('**************');

    // for female    
    PANEL.append("h6").text(`Female: ${femaleCount}`);
    PANEL.append("h6").text(`==== status ====`);

    statusArray.map((s) => {
      var male_status = femaleArray.filter(sampleObj => sampleObj.status == s);
      PANEL.append("h6").text(`${s}: ${male_status.length}`);
    });

    // Pie for gander
    var data = [{
      values: [maleCount, femaleCount],
      labels: ['Male', 'Female'],
      type: 'pie'
    }];

    var layout = {
      height: 400,
      width: 500
    };

    Plotly.newPlot('pie', data, layout);

    // Bar for sign
    sign_names = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    sign_counts = [];

    sign_names.map((name) => {
      var match = resultArray.filter(sampleObj => sampleObj.sign.includes(name.toLowerCase()));
      sign_counts.push(match.length);
    });

    var bar_info = [
      {
        y: sign_names.reverse(),
        x: sign_counts.reverse(),
        text: [
          "(Ram) March 21–April 19",
          "(Bull) April 20–May 20",
          "(Twins) May 21–June 21",
          "(Crab) June 22–July 22",
          "(Lion) July 23–August 22",
          "(Virgin) August 23–September 22",
          "(Balance) September 23–October 23",
          "(Scorpion) October 24–November 21",
          "(Archer) November 22-December 21",
          "(Goat) December 22–January 19",
          "(Water Bearer)January 20–February 18",
          "(Fish) February 19–March 20"
        ],
        type: "bar",
        orientation: "h",
      }
    ];

    var bar_fig = {
      title: "zodiac Info",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", bar_info, bar_fig);

    // Table view
    const tbody = d3.select("tbody");

    tbody.html("");

    tbl_header = tbody.append("tr");
    let header = tbl_header.append("th");
    header.text("ID");
    header = tbl_header.append("th");
    header.text("Gendar");
    header = tbl_header.append("th");
    header.text("Status");
    header = tbl_header.append("th");
    header.text("Body Type");
    header = tbl_header.append("th");
    header.text("Height");
    header = tbl_header.append("th");
    header.text("Diet");
    header = tbl_header.append("th");
    header.text("Ethnicity");
    header = tbl_header.append("th");
    header.text("Pets");
    header = tbl_header.append("th");
    header.text("Religion");
    header = tbl_header.append("th");
    header.text("Sign");
    header = tbl_header.append("th");
    header.text("Smokes");
    header = tbl_header.append("th");
    header.text("Speaks");

    resultArray.forEach((row) => {
      // Create tr for each row of the table
      const tbl = tbody.append("tr");
      // console.log("row")
      // console.log(row)

      let cell = tbl.append("td");
      cell.text(row._id.$oid);
      cell = tbl.append("td");
      cell.text(row.sex);
      cell = tbl.append("td");
      cell.text(row.status);
      cell = tbl.append("td");
      cell.text(row.body_type);
      cell = tbl.append("td");
      cell.text(row.height);
      cell = tbl.append("td");
      cell.text(row.diet);
      cell = tbl.append("td");
      cell.text(row.ethnicity);
      cell = tbl.append("td");
      cell.text(row.pets);
      cell = tbl.append("td");
      cell.text(row.religion);
      cell = tbl.append("td");
      cell.text(row.sign);
      cell = tbl.append("td");
      cell.text(row.smokes);
      cell = tbl.append("td");
      cell.text(row.speaks);
      
    });


  });
}

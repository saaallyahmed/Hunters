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
    var ultimateColors = [
      ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
      ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
      ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
      ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
    ];
    // Pie for gender
    var data = [{
      values: [maleCount, femaleCount],
      labels: ['Male', 'Female'],
      textposition: 'inside',
      hoverinfo: 'labels',
      hole: .4,
      type: 'pie',
      marker: {
        colors: ultimateColors[2]
      },
    }];

    var layout = {
      title: 'Gender Distribution',
      autosize: true,
      height: 400,
      width: 400
    };

    Plotly.newPlot('pie', data, layout);

    // Barchart for star signs
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
        marker: {color: 'rgb(55, 83, 109)'},
        orientation: "h",
      }
    ];

    var bar_fig = {
      autosize: true,
      title: "Zodiac Info",
      y_axis: {automargin:true}
    };

    Plotly.newPlot("bar", bar_info, bar_fig);

    // Histogram for job
    job_names = [
    "artistic / musical / writer",
    "banking / financial / real estate",
    "clerical / administrative",
    "computer / hardware / software",
    "construction / craftsmanship",
    "education / academia", 
    "entertainment / media",
    "executive / management",
    "hospitality / travel",
    "law / legal services",
    "medicine / health",
    "political / government",
    "sales / marketing / biz dev", 
    "science/ tech / engineering", 
    "student",
    "transportation",
    "unemployed",
    "other",
    "declined to answer",
    ];
    job_counts = [];

    job_names.map((name) => {
      var match = resultArray.filter(sampleObj => sampleObj.job.includes(name.toLowerCase()));
      job_counts.push(match.length);
    });
    
    // bar for jobs
    var bar2_info = [
      {
        x: job_names,
        y: job_counts,
        // text: [
        //      "other",
        //     "Student",
        //     "transportation",
        //     "hospitality / travel",
        //     "student", 
        //     "entertainment / media",
        //     "clerical / administrative",
        //     "construction / craftsmanship",
        //     "declined to answer",
        //     "political / government",
        //     "law / legal services",
        //     "science/tech/engineering",
        //     "computer/hardware/software",
        //     "sales/marketing/biz dev",
        //     "artistic/musical/writer",
        //     "medicine/health",
        //     "education/academia",
        //     "executive/management",
        //     "banking/financial/real estate",
        //     "unemployed"
        //     ],
        type: "bar",
        marker:{
            color: 'rgb(142,124,195)'
        },
      }
      ];

var bar2_fig = {
  autosize : true,
  title: "Job Details",
  // margin: { t: 30, l: 100 },
  y_axis: {automargin:true}
};

Plotly.newPlot("bar2", bar2_info, bar2_fig);

    // var trace2 =[{
    //   y:job_counts.reverse(),
    //   x:sign_names.reverse(),
    //   name: 'Job',
    //   type:'bar'
    // }];
    // var data =[trace1, trace2];
    // var layout = {
    //   barmode:'group'
    // };

        // text: [
        //   "(Ram) March 21–April 19",
        //   "(Bull) April 20–May 20",
        //   "(Twins) May 21–June 21",
        //   "(Crab) June 22–July 22",
        //   "(Lion) July 23–August 22",
        //   "(Virgin) August 23–September 22",
        //   "(Balance) September 23–October 23",
        //   "(Scorpion) October 24–November 21",
        //   "(Archer) November 22-December 21",
        //   "(Goat) December 22–January 19",
        //   "(Water Bearer)January 20–February 18",
        //   "(Fish) February 19–March 20"
        // ],
       


    // Table view
    const tbody = d3.select("tbody");

    tbody.html("");

    tbl_header = tbody.append("tr");
    let header = tbl_header.append("th");
    header.text("ID");
    // header = tbl_header.append("th");
    // header.text("Gender");
    // header = tbl_header.append("th");
    // header.text("Status");
    // header = tbl_header.append("th");
    // header.text("Body Type");
    header = tbl_header.append("th");
    header.text("Height");
    // header = tbl_header.append("th");
    // header.text("Diet");
    header = tbl_header.append("th");
    header.text("Ethnicity");
    header = tbl_header.append("th");
    header.text("Pets");
    header = tbl_header.append("th");
    header.text("Religion");
    // header = tbl_header.append("th");
    // header.text("Sign");
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
      // cell = tbl.append("td");
      // cell.text(row.sex);
      // cell = tbl.append("td");
      // cell.text(row.status);
      // cell = tbl.append("td");
      // cell.text(row.body_type);
      cell = tbl.append("td");
      cell.text(row.height);
      // cell = tbl.append("td");
      // cell.text(row.diet);
      cell = tbl.append("td");
      cell.text(row.ethnicity);
      cell = tbl.append("td");
      cell.text(row.pets);
      cell = tbl.append("td");
      cell.text(row.religion);
      // cell = tbl.append("td");
      // cell.text(row.sign);
      cell = tbl.append("td");
      cell.text(row.smokes);
      cell = tbl.append("td");
      cell.text(row.speaks);
      
    });


  });
}

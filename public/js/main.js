/**
 * Load data from CSV file asynchronously and render chart
 */
// Add your code here


/**
 * Load data from CSV file asynchronously and render chart
 */
d3.csv('data/all_drinking_v2.csv').then(data => {

    // Generate filters from input elements on index.html
    const getFilters = () => {
        let s = {
            "sex": "female",
            "type": "any",
        };
        $('.btn-group .active input').each(function (d, i) {
            $(this).hasClass('sex') ? s.sex = $(this).attr('value') : s.type = $(this).attr('value')
        });

        return s;
    };

    // Actually filter the data
    const filterData = (data) => {
        let filters = getFilters();
        return data.filter((d) => d.sex == filters.sex &&
            d.type == filters.type);
    }

    // Do any tranformations of the data
    data.forEach(d => {
        d.percent = +d.percent;
    });
    // Sort data by data
    // data.sort((a, b) => b.percent - a.percent);

    // Create a new bar chart instance and pass the filtered data to the bar chart class
    barchart = new Barchart({ parentElement: '#vis' }, filterData(data));
    // Show chart
    barchart.updateVis();

    // Update the data passed to the chart whenever you interact with a button
    $('input').change(() => {
        barchart.data = filterData(data);
        barchart.updateVis();
    });
})
    .catch(error => console.error(error));

d3.select('#sorting').on('click', d => {
    barchart.config.reverseOrder = true;
    barchart.updateVis();
})
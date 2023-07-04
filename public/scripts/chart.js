var data = [{
    values: [document.getElementById('work').innerText, document.getElementById('meeting').innerText, document.getElementById('break').innerText],
    labels: ['Work', 'Meeting', 'Break'],
    type: 'pie'
}];

var layout = {
    height: 400,
    width: 500
};

console.log(document.getElementById('work').innerText)
Plotly.newPlot('myDiv', data, layout);

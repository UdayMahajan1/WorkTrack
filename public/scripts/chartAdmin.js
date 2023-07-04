const date = new Date();
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = date.getMonth();
document.getElementById("month").innerText = `Statistics for ${monthList[month]}, ${date.getFullYear()}`;

let work = 0,meeting = 0,breaks = 0,workTech = 0,workPM=0,workHR=0,meetingTech=0,meetingPM=0,meetingHR=0,breaksTech=0,breaksPM=0,breaksHR=0;

let statistics = JSON.parse(document.getElementById("stats").innerText)
statistics.forEach((stat) => {
    let monthVal = parseInt(stat.date.substring(5, 7));
    if(monthList[monthVal - 1]==monthList[month]){
        if(stat.task_type==="Work"){
            work += stat.time_taken; 
        }else if(stat.task_type==="Meeting"){
            meeting += stat.time_taken;
        }else if(stat.task_type==="Break"){
            breaks += stat.time_taken;
        }
    }
});

statistics.forEach((stat) => {
    let monthVal = parseInt(stat.date.substring(5, 7));
    if (monthList[monthVal - 1] == monthList[month]) {
        if (stat.task_type === "Work") {
            work+=stat.time_taken;
        } else if (stat.task_type === "Meeting") {
            meeting+=stat.time_taken;
        } else if (stat.task_type === "Break") {
            breaks+=stat.time_taken;
        }
    }
});

var data = [{
    values: [work,meeting,breaks],
    labels: ['Work', 'Meeting', 'Break'],
    type: 'pie'
}];

var layout = {
    height: 400,
    width: 500
};

Plotly.newPlot('myDiv1', data, layout);

statistics.forEach((stat) => {
    let monthVal = parseInt(stat.date.substring(5, 7));
    if (monthList[monthVal - 1] == monthList[month]) {
        if (stat.task_type === "Work" && stat.dept === "Technology") {
            workTech+=stat.time_taken;
        } else if (stat.task_type === "Meeting" && stat.dept === "Product Management") {
            meetingPM+=stat.time_taken;
        } else if (stat.task_type === "Break" && stat.dept === "Human Resources") {
            breaksHR += stat.time_taken;
        }else if (stat.task_type === "Work" && stat.dept === "Product Management") {
            workPM += stat.time_taken;
        }
        else if (stat.task_type === "Meeting" && stat.dept === "Technology") {
            meetingTech += stat.time_taken;
        }
        else if (stat.task_type === "Break" && stat.dept === "Technology") {
            breaksTech += stat.time_taken;
        }
        else if (stat.task_type === "Work" && stat.dept === "Human Resources") {
            workHR += stat.time_taken;
        }
        else if (stat.task_type === "Meeting" && stat.dept === "Human Resources") {
            meetingHR += stat.time_taken;
        }
        else if (stat.task_type === "Break" && stat.dept === "Product Management") {
            breaksPM += stat.time_taken;
        }
    }
});

var data3 = [
    {
        x: ["work", "meeting", "breaks"],
        y: [workTech, meetingTech, breaksTech],
        type: 'bar'
    }
];

var layout3 = {
    height: 400,
    width: 500
};

Plotly.newPlot('myDiv2', data3, layout3);

function deptStats(e)
{
    var data2;
    if(e==="Technology")
    {
        console.log(workTech,meetingTech,breaksTech);
        data2 = [
            {
                x: ["work", "meeting", "breaks"],
                y: [workTech, meetingTech, breaksTech],
                type: 'bar'
            }
        ];
    }else if(e==="Product Management")
    {
        console.log(workPM, meetingPM, breaksPM);
        data2 = [
            {
                x: ["work", "meeting", "breaks"],
                y: [workPM, meetingPM, breaksPM],
                type: 'bar'
            }
        ];
    }else if(e==="Human Resources")
    {
        console.log(workHR, meetingHR, breaksHR);
        data2 = [
            {
                x: ["work", "meeting", "breaks"],
                y: [workHR, meetingHR, breaksHR],
                type: 'bar'
            }
        ];
    }
    var layout2 = {
        height: 400,
        width: 500
    };


    Plotly.newPlot('myDiv2', data2, layout2);
}

function indStats(e)
{
    document.getElementById("myLargeModalLabel00").innerText = `${document.getElementById(`username${e}`).innerText}'s tasks for ${monthList[month]}, ${date.getFullYear()}`;
    let username = document.getElementById(`username${e}`).innerText;
    let indWork = 0,indMeeting = 0,indBreaks = 0;
    statistics.forEach((stat) => {
        let monthVal = parseInt(stat.date.substring(5, 7));
        if(stat.username===username && monthList[monthVal - 1] == monthList[month]){
            if(stat.task_type==="Work"){
                indWork+=stat.time_taken;
            }else if(stat.task_type==="Meeting"){
                indMeeting+=stat.time_taken;
            }else if(stat.task_type==="Break"){
                indBreaks+=stat.time_taken;
            }
        }
    });

    var data = [
        {
            x: ["work", "meeting", "breaks"],
            y: [indWork, indMeeting, indBreaks],
            type: 'bar'
        }
    ];

    var layout = {
        height: 400,
        width: 500
    };


    Plotly.newPlot('myDiv3', data, layout);
}

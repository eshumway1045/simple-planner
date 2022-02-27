// variable to store and loop through scheduler
var dayHr = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },

]

// gets the header date
function HeaderDate() {
    var curHeaderDay = moment().format('dddd');
    var curHeaderDate = moment().format('MMMM Do, YYYY');
    $("#currentDate").text(curHeaderDay);
    $("#currentDay").text(curHeaderDate);
}

// save to localStorage
function saveTasks() {
    localStorage.setItem("dayHr", JSON.stringify(dayHr));
}

// displays localStorage
function displayTasks() {
    dayHr.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function initiate() {
    var storedDay = JSON.parse(localStorage.getItem("dayHr"));

    if (storedDay) {
        dayHr = storedDay;
    }

    saveTasks();
    displayTasks();
}

// loads header date
HeaderDate();

// creates the visuals for the scheduler body
dayHr.forEach(function (thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hrField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-3 hour "
        });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-8 description p-0"
        });
    var planData = $("<textarea>")
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr({
            "class": "past",
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
        });
    savePlan.append(saveButton);
    hourRow.append(hrField, hourPlan, savePlan);
})

// loads any existing localstorage
initiate();


// saves data to be used in localStorage
$(".saveBtn").on("click", function (event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    dayHr[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveTasks();
    displayTasks();
})
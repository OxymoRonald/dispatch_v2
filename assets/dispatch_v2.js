// JSON file name
let json_file = "assets/staff.json";

// Staff lists
var ems_staff = [];

// Create a formatted timestamp for logging
function timestamp(){
    var currentDate = new Date();
    var currentDateString = currentDate.getFullYear() + "-" 
                          + ("0" + (currentDate.getMonth()+1)).slice(-2) + "-"
                          + ("0" + currentDate.getDate()).slice(-2) + " "
                          + ("0" + currentDate.getHours()).slice(-2) + ":"
                          + ("0" + currentDate.getMinutes()).slice(-2) + ":"
                          + ("0" + currentDate.getSeconds()).slice(-2)
    // console.log(currentDateString)
    return currentDateString
}

// Load initial page
async function main(){
    try{
        load_start = Date.now();
        console.log("--- Loading dispatch v2 ---");
        console.log("--- Load staff members ---");
        await getStaff(); // wait for async function getStaff to finish.
        load_end = Date.now();
        load_time = Math.round(load_start - load_end);
        console.log("--- Loaded page in " + load_time + " milliseconds ---");
        console.log(" ")
        updatePage(); // Update page
    console.log(" ")
    }
    catch(error){
        console.error("An error occured in the main function:", error.message);
        console.log(" ")
    }
};

// Read staff from JSON file
function getStaff(){
    return new Promise((resolve, reject) => {

        // Load json from external file
        $.getJSON(json_file, function(jsonData){

            for(const [index, staff_member] of jsonData.staff.entries()){

                // Set status and timestamp
                staff_member.status = 42;
                staff_member.timestamp = 0;
                ems_staff.push(staff_member);
                console.log("    " + staff_member.callsign + ": " + staff_member.name);

            };
            
            // Order staff lists by callsign
            ems_staff.sort((a,b) => a.callsign - b.callsign);
            resolve()

        // If loading the JSON fails
        }).fail(function(){
            reject(new Error("An error has occurred while loading the JSON file: " + error.message));
            // document.getElementById("ems_42").innerHTML = "<div class='error_message'>ERROR LOADING JSON</div>";
        });

    });
}

// Update page
function updatePage(){
    load_start = Date.now();
    console.log("--- Updating page ---")
    
    try{
        
        // Define staff list by status
        var ems_staff_list_42 = "<span>Off Duty</span>";

        for( const[index, staff_member] of ems_staff.entries()){
            // If 42
            if(staff_member.status == 42){
                
                ems_staff_list_42 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + index + "' class='staff_card'>"
                ems_staff_list_42 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                ems_staff_list_42 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                ems_staff_list_42 += "<span class='no-drag'>time</span>"
                ems_staff_list_42 += "</div>"  
            }
        }


        // Update page areas
        document.getElementById("col_1042").innerHTML = ems_staff_list_42;
        // id="col_1042" 
    }
    catch{
        console.log("    Update failed.")
    }

    load_end = Date.now();
    load_time = Math.round(load_start - load_end);
    console.log("--- Updated page in " + load_time + " milliseconds ---");
    console.log(" ")
};

// On update (button push)
function updateDispatch(id, status){

    // Update status for staff member
    ems_staff[id]['status'] = status;

    // Update timestamp for staff member
    if(status == 42){
        ems_staff[id]['timestamp'] = 0;
    }
    else{
        ems_staff[id]['timestamp'] = Date.now();
    }

    // Sort by timestamp, then callsign
    ems_staff.sort((a,b) => a.timestamp - b.timestamp || a.callsign - b.callsign);

    // Update page
    updatePage();

}


//  onclick='updateDispatch(" + index + ", 8)'/>";

// Simple drag n drop

// Maybe use dragstart even to store the ID of the elemenent beeing dragged
var updating = ""
// console.log(updating)

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    
    // console.log(ev.srcElement.id)
    // console.log(ev)
    updating = document.getElementById(ev.dataTransfer.getData("text")).id
    // console.log("Child ID: " + document.getElementById(ev.dataTransfer.getData("text")).id)
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    // console.log(ev.target)
    // console.log(ev.target.id)
    console.log("Target ID: " + ev.target.id)
    console.log("Updating Child: " +  updating)
    console.log("Child ID: " + (updating).slice(6))
    console.log("Child Name: " + ems_staff[(updating).slice(6)].name)
    // Update status for staff member
    console.log("Old Status: " + ems_staff[(updating).slice(6)]['status'])
    console.log("New Status: " + (ev.target.id).slice(6))
    ems_staff[(updating).slice(6)]['status'] = (ev.target.id).slice(6);
}


// Update page sections every 30 seconds
setInterval(function(){ 
    console.log(timestamp() + " - Update page.")
    updatePage(); 
}, 10000);
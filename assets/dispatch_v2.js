// JSON file name
let json_file = "assets/staff.json";

// Staff lists
var ems_staff = [];

// Main function
async function main(){
    try{
        console.log("Getting staff JSON")
        await getStaff(); // wait for async function getStaff to finish.
        console.log("Load page")
        await updatePage(); // wait for async function updatePage to finish.
        console.log("Wait for event")
        console.log(" ")
    }
    catch(error){
        console.error("An error occured in the main function:", error.message);
        console.log(" ")
    };
};

// Load staff list from JSON file
function getStaff(){
    return new Promise((resolve, reject) => {
        // Load json from external file
        $.getJSON(json_file, function(jsonData){
            for(const [index, staff_member] of jsonData.staff.entries()){
                // Set status
                staff_member.status = 42;
                staff_member.timestamp = 0;
                staff_member.children = [];
                staff_member.parent = -1;
                ems_staff.push(staff_member);
            }
            // Order staff lists by callsign
            ems_staff.sort((a,b) => a.callsign - b.callsign);
            // Return succesfully
            resolve()
        }).fail(function(){
            // Return error
            reject(new Error("An error has occurred while loading the JSON file: " + error.message));
        });
    });
};

// Update page
function updatePage(){
    return new Promise((resolve, reject) => {
        try{
            // Set timestamp
            time_now = Date.now();

            // Define page sections
            var ems_staff_list_06 = "<span class='no-drag col_title'>Standby</span>";
            var ems_staff_list_07 = "<span class='no-drag col_title'>On Break</span>";
            var ems_staff_list_08 = "<span class='no-drag col_title'>Ready</span>";
            var ems_staff_list_42 = "<span class='no-drag col_title'>Off Duty</span>";
            var ems_staff_list_47 = "<span class='no-drag col_title'>On a call</span>";
            var ems_staff_list_99 = "<span class='no-drag col_title'>+1</span>";

            // Iterate through staff list
            for(const[index, staff_member] of ems_staff.entries()){
                // Calculate time in queue
                time_in_queue = Math.round((time_now - staff_member.timestamp) / 1000)
                if(time_in_queue > 60){
                    time_in_queue = Math.round(time_in_queue / 60) + "m"
                }
                else{
                    time_in_queue = time_in_queue + "s"
                }

                // If status is 06
                if(staff_member.status == 6){
                    ems_staff_list_06 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.callsign + "' class='staff_card'>"
                    ems_staff_list_06 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                    ems_staff_list_06 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                    // ems_staff_list_06 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                    ems_staff_list_06 += "<span class='no-drag queuetime'> (" + time_in_queue + ")</span>"
                    // ems_staff_list_06 += "<span class='no-drag'> C(" + staff_member.children + ")</span>"
                    // ems_staff_list_06 += "<span class='no-drag'> P(" + staff_member.parent + ")</span>"
                    for(child of staff_member.children){

                        // Get child by callsign
                        var staff_index = ems_staff.findIndex(staff => staff.callsign == child);

                        ems_staff_list_06 += "<div draggable='true' ondragstart='drag(event)' class='staff_card no-drag'>"
                        ems_staff_list_06 += "<span class='no-drag staff_card_callsign'>"+ ems_staff[staff_index].callsign +"</span>"
                        ems_staff_list_06 += "<span class='no-drag'>"+ ems_staff[staff_index].name +"</span>"
                        // ems_staff_list_06 += "<span class='no-drag'> (" + ems_staff[staff_index].status + ")</span>"
                        // ems_staff_list_06 += "<span class='no-drag'> Parent: ("+ ems_staff[staff_index].parent +")</span>"
                        ems_staff_list_06 += "</div>"

                    }
                    ems_staff_list_06 += "</div>" 
                }

                // If status is 07
                else if(staff_member.status == 7){
                    ems_staff_list_07 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.callsign + "' class='staff_card'>"
                    ems_staff_list_07 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                    ems_staff_list_07 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                    // ems_staff_list_07 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                    ems_staff_list_07 += "<span class='no-drag queuetime'> (" + time_in_queue + ")</span>"
                    // ems_staff_list_07 += "<span class='no-drag'> C(" + staff_member.children + ")</span>"
                    // ems_staff_list_07 += "<span class='no-drag'> P(" + staff_member.parent + ")</span>"
                    for(child of staff_member.children){

                        // Get child by callsign
                        var staff_index = ems_staff.findIndex(staff => staff.callsign == child);

                        ems_staff_list_07 += "<div draggable='true' ondragstart='drag(event)' class='staff_card no-drag'>"
                        ems_staff_list_07 += "<span class='no-drag staff_card_callsign'>"+ ems_staff[staff_index].callsign +"</span>"
                        ems_staff_list_07 += "<span class='no-drag'>"+ ems_staff[staff_index].name +"</span>"
                        // ems_staff_list_07 += "<span class='no-drag'> (" + ems_staff[staff_index].status + ")</span>"
                        // ems_staff_list_07 += "<span class='no-drag'> Parent: ("+ ems_staff[staff_index].parent +")</span>"
                        ems_staff_list_07 += "</div>"

                    }
                    ems_staff_list_07 += "</div>" 
                }

                // If status is 08
                else if(staff_member.status == 8){
                    ems_staff_list_08 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.callsign + "' class='staff_card'>"
                    ems_staff_list_08 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                    ems_staff_list_08 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                    // ems_staff_list_08 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                    ems_staff_list_08 += "<span class='no-drag queuetime'> (" + time_in_queue + ")</span>"
                    // ems_staff_list_08 += "<span class='no-drag'> C(" + staff_member.children + ")</span>"
                    // ems_staff_list_08 += "<span class='no-drag'> P(" + staff_member.parent + ")</span>"
                    for(child of staff_member.children){

                        // Get child by callsign
                        var staff_index = ems_staff.findIndex(staff => staff.callsign == child);

                        ems_staff_list_08 += "<div draggable='true' ondragstart='drag(event)' class='staff_card no-drag'>"
                        ems_staff_list_08 += "<span class='no-drag staff_card_callsign'>"+ ems_staff[staff_index].callsign +"</span>"
                        ems_staff_list_08 += "<span class='no-drag'>"+ ems_staff[staff_index].name +"</span>"
                        // ems_staff_list_08 += "<span class='no-drag'> (" + ems_staff[staff_index].status + ")</span>"
                        // ems_staff_list_08 += "<span class='no-drag'> Parent: ("+ ems_staff[staff_index].parent +")</span>"
                        ems_staff_list_08 += "</div>"

                    }
                    ems_staff_list_08 += "</div>" 
                }

                // If status is 42
                else if(staff_member.status == 42){
                    ems_staff_list_42 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.callsign + "' class='staff_card'>"
                    ems_staff_list_42 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                    ems_staff_list_42 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                    // ems_staff_list_42 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                    // ems_staff_list_42 += "<span class='no-drag'> C(" + staff_member.children + ")</span>"
                    // ems_staff_list_42 += "<span class='no-drag'> P(" + staff_member.parent + ")</span>"
                    ems_staff_list_42 += "</div>"  
                }

                // If status is 47
                else if(staff_member.status == 47){
                    ems_staff_list_47 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.callsign + "' class='staff_card'>"
                    ems_staff_list_47 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                    ems_staff_list_47 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                    // ems_staff_list_47 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                    ems_staff_list_47 += "<span class='no-drag queuetime'> (" + time_in_queue + ")</span>"
                    // ems_staff_list_47 += "<span class='no-drag'> C(" + staff_member.children + ")</span>"
                    // ems_staff_list_47 += "<span class='no-drag'> P(" + staff_member.parent + ")</span>"
                    for(child of staff_member.children){

                        // Get child by callsign
                        var staff_index = ems_staff.findIndex(staff => staff.callsign == child);

                        ems_staff_list_47 += "<div draggable='true' ondragstart='drag(event)' class='staff_card no-drag'>"
                        ems_staff_list_47 += "<span class='no-drag staff_card_callsign'>"+ ems_staff[staff_index].callsign +"</span>"
                        ems_staff_list_47 += "<span class='no-drag'>"+ ems_staff[staff_index].name +"</span>"
                        // ems_staff_list_47 += "<span class='no-drag'> (" + ems_staff[staff_index].status + ")</span>"
                        // ems_staff_list_47 += "<span class='no-drag'> Parent: ("+ ems_staff[staff_index].parent +")</span>"
                        ems_staff_list_47 += "</div>"

                    }
                    ems_staff_list_47 += "</div>" 
                }

                // Else
                else{
                    // Get parent name
                    // Get parent index
                    // var parent_index = ems_staff.findIndex(staff => staff.callsign == parent_callsign);
                    var parent_index = ems_staff.findIndex(staff => staff.callsign == staff_member.parent);


                    ems_staff_list_99 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.callsign + "' class='staff_card'>"
                    ems_staff_list_99 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                    ems_staff_list_99 += "<span class='no-drag'>"+ staff_member.name +"</span>"                    
                    // ems_staff_list_99 += "<div class='no-drag staff_card_parent'>"  
                    // ems_staff_list_99 += "<span class='no-drag staff_card_callsign'>P(" + staff_member.parent + ")</span>"
                    ems_staff_list_99 += "<span class='no-drag staff_card_parent'>(" + ems_staff[parent_index].name + ")</span>"
                    // ems_staff_list_99 += "</div>"  
                    ems_staff_list_99 += "</div>"  
                    
                }

            }

            // Update HTML
            document.getElementById("col_1006").innerHTML = ems_staff_list_06;
            document.getElementById("col_1007").innerHTML = ems_staff_list_07;
            document.getElementById("col_1008").innerHTML = ems_staff_list_08;
            document.getElementById("col_1042").innerHTML = ems_staff_list_42;
            document.getElementById("col_1047").innerHTML = ems_staff_list_47;
            document.getElementById("col_9999").innerHTML = ems_staff_list_99;
            console.log("Updated page")

            // Return succesfully
            resolve();
        }
        catch(error){
            // Return error
            reject(new Error("An error has occurred while refreshing the page: " + error.message));
        };
    });
};

// Drag and drop functions
// Allow items to be dropped
function allowDrop(ev) {
    ev.preventDefault();
}

// While dragging
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    // Get ID of the child we're updating
    updating = document.getElementById(ev.dataTransfer.getData("text")).id
    
}

// On drop
function drop(ev) {
    ev.preventDefault();
    updateDispatch(updating, ev.target.id)
}

function updateDispatch(id, status){

    // Get callsign
    var id = id.slice(6)*1
    // Get index of staff by callsign
    var staff_index = ems_staff.findIndex(staff => staff.callsign == id);

    if(status.startsWith("col_")){
        // Check for parent
        if(ems_staff[staff_index].parent >= 0){
            parent_callsign = ems_staff[staff_index].parent
            // Clear parent's child
            // Get parent index
            var parent_index = ems_staff.findIndex(staff => staff.callsign == parent_callsign);
            // Get index of child value in parent
            const childindex = ems_staff[parent_index].children.indexOf(id);
            // Splice 
            if (childindex > -1) { // only splice array when item is found
                ems_staff[parent_index].children.splice(childindex, 1); // 2nd parameter means remove one item only
            }
 
            // Clear child's parent
            ems_staff[staff_index].parent = -1

        }

        // Set status
        status = status.slice(6)*1
    }

    else if(status.startsWith("staff_")){
        // Get callsign from ID
        parent_callsign = status.slice(6)*1

        // Get parent id by callsign
        var parent_index = ems_staff.findIndex(staff => staff.callsign == parent_callsign);

        // If parent != child
        if(parent_callsign == id){
            status = ems_staff[staff_index].status;
        }
        else{
            // Add parent to child
            ems_staff[staff_index].parent = parent_callsign
            // Add child to parent
            ems_staff[parent_index].children.push(id)
            // Set status to child
            status = "child"
        }
        // Remove duplicate children from parent using filter with indexOf to find repeated elements
        ems_staff[parent_index].children = ems_staff[parent_index].children.filter((item, index) => ems_staff[parent_index].children.indexOf(item) === index)

    }

    // Update status
    ems_staff[staff_index].status = status

    if(status == 42){
        // Update Timestamp
        ems_staff[staff_index].timestamp = 0 
        // Reset parent
        ems_staff[staff_index].parent = -1;
        // Reset Children
        ems_staff[staff_index].children = [];
    }
    else{
        // Update Timestamp
        ems_staff[staff_index].timestamp = Date.now()
    }

    // Order by timestamp then ID
    ems_staff.sort((a,b) => a.timestamp - b.timestamp || a.callsign - b.callsign);

    // Update page
    updatePage();
}

// Update page every 10 seconds
setInterval(function(){ 
    updatePage(); 
}, 10000);
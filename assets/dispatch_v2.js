// ToDo
// Add nesting for +1\
// Re-order functions
// If a child is removed from parent , remove from parents child list


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
                staff_member.children = [];
                staff_member.parent = -1;
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
        // Calculate time
        time_now = Date.now();

        // Define staff list by status
        var ems_staff_list_06 = "<span>10-6</span>";
        var ems_staff_list_07 = "<span>10-7</span>";
        var ems_staff_list_08 = "<span>10-8</span>";
        var ems_staff_list_42 = "<span>Off Duty</span>";
        var ems_staff_list_47 = "<span>On A Call</span>";
        var ems_staff_list_99 = "<span>+1</span>";

        for( const[index, staff_member] of ems_staff.entries()){
            // Calculate time in queue
            time_in_queue = Math.round((time_now - staff_member.timestamp) / 1000)
            if(time_in_queue > 60){
                time_in_queue = Math.round(time_in_queue / 60) + "m"
            }
            else{
                time_in_queue = time_in_queue + "s"
            }

            // Process based on status
            // If 42
            console.log("    Populating status lists")
            if(staff_member.status == 42){
                
                ems_staff_list_42 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + index + "' class='staff_card'>"
                ems_staff_list_42 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                ems_staff_list_42 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                ems_staff_list_42 += "<span class='no-drag'> (i="+ index +")</span>"
                ems_staff_list_42 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                ems_staff_list_42 += "</div>"  

            }
            // Elif 10-6
            else if(staff_member.status == 6){
                
                ems_staff_list_06 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + index + "' class='staff_card'>"
                ems_staff_list_06 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                ems_staff_list_06 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                ems_staff_list_06 += "<span class='no-drag'> (i="+ index +")</span>"
                ems_staff_list_06 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                ems_staff_list_06 += "<span class='no-drag'> (" + time_in_queue + ")</span>"
                for(child in staff_member.children){
                    // console.log("Child ID: " + child)
                    // console.log("Child ID value: " + staff_member.children[child])

                    ems_staff_list_06 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.children[child] + "' class='staff_card no-drag'>"
                    ems_staff_list_06 += "<span class='no-drag staff_card_callsign'>"+ ems_staff[staff_member.children[child]].callsign +"</span>"
                    ems_staff_list_06 += "<span class='no-drag'>"+ ems_staff[staff_member.children[child]].name +"</span>"
                    ems_staff_list_06 += "<span class='no-drag'> (" + ems_staff[staff_member.children[child]].status + ")</span>"
                    ems_staff_list_06 += "<span class='no-drag'> (i="+ index +")</span>"
                    ems_staff_list_06 += "<span class='no-drag'> Parent: ("+ ems_staff[staff_member.children[child]].parent +")</span>"
                    ems_staff_list_06 += "</div>"  
                }
                ems_staff_list_06 += "</div>"  


            }
            // Elif 10-7
            else if(staff_member.status == 7){
                
                ems_staff_list_07 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + index + "' class='staff_card'>"
                ems_staff_list_07 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                ems_staff_list_07 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                ems_staff_list_07 += "<span class='no-drag'> (i="+ index +")</span>"
                ems_staff_list_07 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                ems_staff_list_07 += "<span class='no-drag'> (" + time_in_queue + ")</span>"
                for(child in staff_member.children){
                    // console.log("Child ID: " + child)
                    // console.log("Child ID value: " + staff_member.children[child])

                    ems_staff_list_07 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.children[child] + "' class='staff_card no-drag'>"
                    ems_staff_list_07 += "<span class='no-drag staff_card_callsign'>"+ ems_staff[staff_member.children[child]].callsign +"</span>"
                    ems_staff_list_07 += "<span class='no-drag'>"+ ems_staff[staff_member.children[child]].name +"</span>"
                    ems_staff_list_07 += "<span class='no-drag'> (" + ems_staff[staff_member.children[child]].status + ")</span>"
                    ems_staff_list_07 += "<span class='no-drag'> (i="+ index +")</span>"
                    ems_staff_list_07 += "<span class='no-drag'> Parent: ("+ ems_staff[staff_member.children[child]].parent +")</span>"
                    ems_staff_list_07 += "</div>"  
                }
                ems_staff_list_07 += "</div>"  


            }
            // Elif 10-8
            else if(staff_member.status == 8){
                console.log("Name: " + staff_member.name)
                console.log("Children: " + staff_member.children)
                
                ems_staff_list_08 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + index + "' class='staff_card'>"
                ems_staff_list_08 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                ems_staff_list_08 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                ems_staff_list_08 += "<span class='no-drag'> (i="+ index +")</span>"
                ems_staff_list_08 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                ems_staff_list_08 += "<span class='no-drag'> (" + time_in_queue + ")</span>"
                ems_staff_list_08 += "<span class='no-drag'> Children: ("+ staff_member.children +")</span>"
                ems_staff_list_08 += "<span class='no-drag'> Parent: ("+ staff_member.parent +")</span>"
                for(child in staff_member.children){
                    // console.log("Child ID: " + child)
                    // console.log("Child ID value: " + staff_member.children[child])

                    ems_staff_list_08 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.children[child] + "' class='staff_card no-drag'>"
                    ems_staff_list_08 += "<span class='no-drag staff_card_callsign'>"+ ems_staff[staff_member.children[child]].callsign +"</span>"
                    ems_staff_list_08 += "<span class='no-drag'>"+ ems_staff[staff_member.children[child]].name +"</span>"
                    ems_staff_list_08 += "<span class='no-drag'> (" + ems_staff[staff_member.children[child]].status + ")</span>"
                    ems_staff_list_08 += "<span class='no-drag'> (i="+ index +")</span>"
                    ems_staff_list_08 += "<span class='no-drag'> Parent: ("+ ems_staff[staff_member.children[child]].parent +")</span>"
                    ems_staff_list_08 += "</div>"  
                }
                ems_staff_list_08 += "</div>"  

            }
            // Elif 10-47
            else if(staff_member.status == 47){
                
                ems_staff_list_47 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + index + "' class='staff_card'>"
                ems_staff_list_47 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                ems_staff_list_47 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                ems_staff_list_47 += "<span class='no-drag'> (i="+ index +")</span>"
                ems_staff_list_47 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                ems_staff_list_47 += "<span class='no-drag'> (" + time_in_queue + ")</span>"
                for(child in staff_member.children){
                    // console.log("Child ID: " + child)
                    // console.log("Child ID value: " + staff_member.children[child])

                    ems_staff_list_47 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + staff_member.children[child] + "' class='staff_card no-drag'>"
                    ems_staff_list_47 += "<span class='no-drag staff_card_callsign'>"+ ems_staff[staff_member.children[child]].callsign +"</span>"
                    ems_staff_list_47 += "<span class='no-drag'>"+ ems_staff[staff_member.children[child]].name +"</span>"
                    ems_staff_list_47 += "<span class='no-drag'> (" + ems_staff[staff_member.children[child]].status + ")</span>"
                    ems_staff_list_47 += "<span class='no-drag'> (i="+ index +")</span>"
                    ems_staff_list_47 += "<span class='no-drag'> Parent: ("+ ems_staff[staff_member.children[child]].parent +")</span>"
                    ems_staff_list_47 += "</div>"  
                }
                ems_staff_list_47 += "</div>"  


            }
            // Else +1, add to parent
            else{
                
                ems_staff_list_99 += "<div draggable='true' ondragstart='drag(event)' id='staff_" + index + "' class='staff_card'>"
                ems_staff_list_99 += "<span class='no-drag staff_card_callsign'>"+ staff_member.callsign +"</span>"
                ems_staff_list_99 += "<span class='no-drag'>"+ staff_member.name +"</span>"
                ems_staff_list_99 += "<span class='no-drag'> (i="+ index +")</span>"
                ems_staff_list_99 += "<span class='no-drag'> (" + staff_member.status + ")</span>"
                ems_staff_list_99 += "<span class='no-drag'> (" + time_in_queue + ")</span>"
                ems_staff_list_99 += "</div>"  

            }

        }

        // Update page areas
        // console.log("    Updating HTML areas")
        document.getElementById("col_1006").innerHTML = ems_staff_list_06;
        document.getElementById("col_1007").innerHTML = ems_staff_list_07;
        document.getElementById("col_1008").innerHTML = ems_staff_list_08;
        document.getElementById("col_1042").innerHTML = ems_staff_list_42;
        document.getElementById("col_1047").innerHTML = ems_staff_list_47;
        document.getElementById("col_9999").innerHTML = ems_staff_list_99;
    }
    catch{
        console.log("    Update failed.")
    }

    load_end = Date.now();
    load_time = Math.round(load_start - load_end);
    // console.log("--- Updated page in " + load_time + " milliseconds ---");
    console.log(" ")
};

// On update (button push)
function updateDispatch(id, status){

    // console.log("Update Dispatch ID: " + id)
    // console.log("Update Dispatch Status: " + status)

    // updateDispatch((updating).slice(6)*1, (ev.target.id).slice(6)*1)
    id = id.slice(6)*1
    if(status.startsWith("col_")){
        status = status.slice(6)*1

        // If parent is set
        if(ems_staff[id]['parent'] >= 0){
            // Print parent ID
            console.log("Parent ID: " + ems_staff[id]['parent']);

            // Remove child from parent
            // Get index of child ID
            console.log("Parent Child List: " + ems_staff[parent_id].children)
            console.log("Remove from parent: " + id)
            console.log("")

            const childindex = ems_staff[parent_id].children.indexOf(id);
            console.log("Index: " + childindex)
            if (childindex > -1) { // only splice array when item is found
                ems_staff[parent_id].children.splice(childindex, 1); // 2nd parameter means remove one item only
            }

            // Reset parent of child
            // ems_staff[id]['parent'] = -1;
        }

    }
    else if(status.startsWith("staff_")){
        // // console.log("Update Dispatch Status CHILD: " + status)
        // child_callsign = ems_staff[id].callsign
        // // console.log("Update Dispatch Child Callsign: " + child_callsign)
        // parent_id = status.slice(6)*1
        // ems_staff[parent_id].children.push(child_callsign)

        
        parent_id = status.slice(6)*1
        ems_staff[parent_id].children.push(id)
        
        // Update parent ID of child
        ems_staff[id]['parent'] = parent_id;


    }
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
    // ems_staff.sort((a,b) => a.timestamp - b.timestamp || a.callsign - b.callsign);

    // Update page
    updatePage();

}


// Variable to store the child we're updating on drag and drop
var updating = ""
// console.log(updating)

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    // Get ID of the child we're updating
    updating = document.getElementById(ev.dataTransfer.getData("text")).id
    
    // console.log(ev.srcElement.id)
    // console.log(ev)
    // console.log("Child ID: " + document.getElementById(ev.dataTransfer.getData("text")).id)
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    // console.log("Target ID: " + ev.target.id)
    // console.log("Updating Child: " +  updating)
    // console.log("Child ID: " + (updating).slice(6))
    // console.log("Child Name: " + ems_staff[(updating).slice(6)].name)
    // Update status for staff member
    // console.log("Old Status: " + ems_staff[(updating).slice(6)]['status'])
    // console.log("New Status: " + (ev.target.id).slice(6)*1)
    // ems_staff[(updating).slice(6)]['status'] = (ev.target.id).slice(6);
    // updatePage();
    updateDispatch(updating, ev.target.id)
    // updateDispatch((updating).slice(6)*1, (ev.target.id).slice(6)*1)
}


// Update page sections every 10 seconds
setInterval(function(){ 
    console.log(timestamp() + " - Update page.")
    updatePage(); 
}, 30000);
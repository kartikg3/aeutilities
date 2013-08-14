//var my_file = new File(app.project.file);
//var new_project = app.open(my_file);

//alert(new_project)

function getType(obj){
    if (obj === undefined) { return 'undefined'; }
    if (obj === null) { return 'null'; }
    return Object.prototype.toString.call(obj).split(' ').pop().split(']').shift().toLowerCase();
}

Object.prototype.getType = function(){
    return Object.prototype.toString.call(this).split(' ').pop().split(']').shift().toLowerCase();
};

{
var message = ""

app.project.timecodeDisplayType = TimeDisplayType.FRAMES
app.project.displayStartFrame = 1

len = app.project.items.length

var durations = new Array()
var maxDuration

var footageList = new Array()
var compList = new Array()

var start_frame
var end_frame

for(var i=1 ; i<len+1 ; i++){
        if(getType(app.project.items[i].mainSource) == "filesource" && getType(app.project.items[i]) == "footageitem" && app.project.items[i].parentFolder.name == "PASSES (REPLACE THESE)"){
                footageList.push(app.project.items[i])
                filename = app.project.items[i].name
                message += "\n"+ filename
                //message += " SOURCE: " + app.project.items[i].file.fullName
                tokens_1 = filename.split(".")
                tokens_2 = tokens_1[tokens_1.length-2]
                //alert(tokens_1, "token_1")                
                //alert(tokens_2, "token_2")                
                if(tokens_2 != null && tokens_2[0] == "["){
                    tokens_2 = tokens_2.replace("[","")
                    tokens_2 = tokens_2.replace("]","")
                    start_frame = Number(tokens_2.split("-")[0])
                    end_frame = Number(tokens_2.split("-")[1])
                    //alert(start_frame + " TO " + end_frame)
                    durations.push(app.project.items[i].duration)
                    //alert( timeToCurrentFormat(app.project.items[i].duration, 30, true )) 
                    }
                else{
                    if(start_frame = Number(tokens_2)){
                        //alert("Single FRAME starting from " + start_frame)
                        }
                    else{
                        //alert("Single File!!!")
                        }
                    }
    }
    else if(getType(app.project.items[i]) == "compitem"){            
            compList.push(app.project.items[i])
        }
    else{
        //alert(getType(app.project.items[i].mainSource))
        }
}


// REPLACE ALL FOOTAGE
//=========================

for(var i=0 ; i<footageList.length ; i++){
    footageList[i].replaceWith
    }

//alert(durations)
//alert(durations.sort())
durations.sort()
durations.reverse()
maxDuration =  Number(timeToCurrentFormat(durations.pop(), 30, true)) + 1

//alert("maxDuration = " + maxDuration)

// Lets DO THIS
//=================

//MAX OUT all COMPS first
for(var i=0 ; i<compList.length ; i++){
    compList[i].duration = currentFormatToTime(maxDuration, 30, false)
    }

//Now MAX out all sub LAYERS in each COMP
for(var i=0 ; i<compList.length ; i++){        
        for(var j=1 ; j<compList[i].layers.length+1 ; j++){
                var wasLocked = false
                if(compList[i].layers[j].locked){
                    wasLocked = true
                    compList[i].layers[j].locked = false
                    }
                compList[i].layers[j].outPoint = currentFormatToTime(maxDuration, 30, false)                              
                //alert("COMP : "+compList[i].name + "\nLayer : "+compList[i].layers[j].name+"\nOUTPOINT : "+timeToCurrentFormat(compList[i].layers[j].outPoint,30,true))
                if(wasLocked){
                    compList[i].layers[j].locked = true
                    } 
            }
    }

}

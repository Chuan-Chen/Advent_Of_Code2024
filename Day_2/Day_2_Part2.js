/**
--- Day 2: Red-Nosed Reports ---

Fortunately, the first location The Historians want to search isn't a long walk from the Chief Historian's office.

While the Red-Nosed Reindeer nuclear fusion/fission plant appears to contain no sign of the Chief Historian, the engineers there run up to you as soon as they see you. Apparently, they still talk about the time Rudolph was saved through molecular synthesis from a single electron.

They're quick to add that - since you're already here - they'd really appreciate your help analyzing some unusual data from the Red-Nosed reactor. You turn to check if The Historians are waiting for you, but they seem to have already divided into groups that are currently searching every corner of the facility. You offer to help with the unusual data.

The unusual data (your puzzle input) consists of many reports, one report per line. Each report is a list of numbers called levels that are separated by spaces. For example:

7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9

This example data contains six reports each containing five levels.

The engineers are trying to figure out which reports are safe. The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing or gradually decreasing. So, a report only counts as safe if both of the following are true:

    The levels are either all increasing or all decreasing.
    Any two adjacent levels differ by at least one and at most three.

In the example above, the reports can be found safe or unsafe by checking those rules:

    7 6 4 2 1: Safe because the levels are all decreasing by 1 or 2.
    1 2 7 8 9: Unsafe because 2 7 is an increase of 5.
    9 7 6 2 1: Unsafe because 6 2 is a decrease of 4.
    1 3 2 4 5: Unsafe because 1 3 is increasing but 3 2 is decreasing.
    8 6 4 4 1: Unsafe because 4 4 is neither an increase or a decrease.
    1 3 6 7 9: Safe because the levels are all increasing by 1, 2, or 3.

So, in this example, 2 reports are safe.

Analyze the unusual data from the engineers. How many reports are safe?

To begin, get your puzzle input.

true 2 5 6 8 6
true 87 89 90 93 96 99 99
true 13 14 15 18 19 23
67 69 71 72 73 76 82
29 32 30 31 34 35 37
54 56 54 57 54
70 73 75 74 77 79 81 81
53 55 56 59 62 61 65
90 93 95 92 99
58 61 61 64 67
36 37 37 39 42 39
32 35 38 40 40 40
17 19 19 21 22 23 25 29
9 11 12 12 14 20
20 22 26 27 28 29
75 78 82 84 87 84
78 79 83 85 88 91 91
30 31 32 36 40
68 69 72 76 79 82 88
29 31 37 38 40 43 45 46

 */

const fs = require('node:fs');
const filePath = './Day_2_Input.txt';

let matrix = [];



const  file = fs.readFile(filePath, 'utf8', (err , data ) => {
    if (err) {
      console.error(err);
      return;
    }
    InsertData(data);
    let array = [ '23', '23', '18', '16', '13' ];
    let array2 = [ 58, 61, 62, 64, 67 ]
    console.log(CalculateTotalSafety(matrix));
    //console.log(isSafe(array));
    //console.log(isSafe(array2))
});

const InsertData = (data) => {
    let temp = data.split(/\r?\n/);
    for(let i = 0; i < temp.length; i++){
        const split = temp[i].split(' ');
        matrix.push(split);
    }
}
//!626 //too high
//!595 //too low
//!776 //doesnt say anything
//!644 
//!600

const findDirection = (array) => { 
    let dir = [];
    let increaseCounter = 0;
    let decreaseCounter = 0;
    for(let i = 0; i < array.length - 1; i++){
        dir.push((Number(array[i]) - Number(array[i+1])) <= 0 );
        if((Number(array[i]) - Number(array[i+1])) <= 0){
            increaseCounter++;
        }else{
            decreaseCounter++;
        }
    }
    //console.log(dir);
    //console.log(increaseCounter, decreaseCounter)
    return increaseCounter > decreaseCounter;
}

const isSafe = (array) => {
    let safe = false;
    let Dampener = -1;
    if(Number(array[0]) === Number(array[array.length - 1])){return false;}
    // /Number(array[0]) < Number(array[array.length - 1])
    const direction = findDirection(array); //true = increasing, false = decreasing
    //console.log(findDirection(array))
    console.log("direction: ", direction ? "increasing(true)" : "decreasing(false)");
    for(let i = 0; i < array.length-1; i++){
        
        let current = Number(array[i]);
        let next = Number(array[i+1]);
        let currentMinNext = current - next;
        
        //console.log("direction: ", direction ? "increasing" : "decreasing")
        //console.log(Number(array[i]), Number(array[i+1]))
        console.log("Iteration: "+i, "Dampener: " + Dampener)
        //console.log("iteration",i)
        console.log(array, "Current: " + current, "Next: " + next)
        console.log(currentMinNext)
        
        if(direction && currentMinNext >= -3 && currentMinNext <= -1){
            safe = true;
        }else if(!direction && currentMinNext <= 3 && currentMinNext >= 1) {
            safe = true;
        }else{
            //console.log(Number(array[i]), Number(array[i+2])) 
            //console.log("in dampener", Dampener)
            if(Dampener === -1){
                if(i == array.length-1) {
                    console.log("isSafe: " + true)
                    return true;
                }
                Dampener = i;
                console.log("Iteration: "+i, "Dampener: " + Dampener)
                array[i+1] = array[i]
                //console.log("dampener is called", array[i], i)
                safe = true;
                
            }else{
                console.log("isSafe: " + false)
                //console.log(Number(array[i]), Number(array[i+1]))
                return false;
            }
        }
    }
    console.log("isSafe: " + safe + "\n\n\n\n")
    return safe;
}

const CalculateTotalSafety = (array) => {
    let totalSafety = 0;
    for(let i = 0; i < array.length; i++){
        if(isSafe(array[i])){
            totalSafety += 1;
        }
    }
    return totalSafety;
}

const Pop = (array) => {
    console
}
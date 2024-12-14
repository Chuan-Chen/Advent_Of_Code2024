const fs = require('node:fs');
const filePath = './Day_2_Input.txt';

let matrix = [];

const  file = fs.readFile(filePath, 'utf8', (err , data ) => {
    if (err) {
      console.error(err);
      return;
    }
    InsertData(data);
    //let array = [ '15', '17', '20', '21', '24' ];
    console.log(CalculateTotalSafety(matrix));
    //console.log(isSafe(array));
});

const InsertData = (data) => {
    let temp = data.split(/\r?\n/);
    for(let i = 0; i < temp.length; i++){
        const split = temp[i].split(' ');
        matrix.push(split);
    }
}
const isIncreasing = (array) => { 
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

const isSafe = (data) => {
    const direction = isIncreasing(data);
    console.log(data, direction);
    
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
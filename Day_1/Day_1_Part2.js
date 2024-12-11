const fs = require('node:fs');
let left = [];
let right = new Map();


const  file = fs.readFile('./Day_1_Input.txt', 'utf8', (err , data ) => {
    if (err) {
      console.error(err);
      return;
    }
    InsertData(data);
    console.log(CalculateSimilarity(left, right));
});
const InsertData = (data) => {
    temp = data.split(/\r?\n/);
    for(let i = 0; i < temp.length; i++){
        const split = temp[i].split('   ');
        left.push(split[0]);
        Inc_Map(right, split[1]);
    }
}

const Inc_Map = (map, value) => {
    let curVal = map.get(value) ? map.get(value) : 0;
    map.set(value, curVal+1);
}


const CalculateSimilarity = (array1, map2) => {
    let totalSimilarity = 0;
    for(let i = 0; i < array1.length; i++){
        
        totalSimilarity += array1[i] * (map2.get(array1[i]) ? map2.get(array1[i]) : 0);
    }
    return totalSimilarity;
}
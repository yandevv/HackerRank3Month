'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'migratoryBirds' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function migratoryBirds(arr: number[]): number {
    let mostLowestNumber: number[] = [1, 0];
    let actualNumberCount: number[] = [1, 0]
    
    arr.sort();
    
    arr.forEach((value) => {
        // Change actualNumber array to the new number to count
        if(actualNumberCount[0] !== value) {
            actualNumberCount[0] = value;
            actualNumberCount[1] = 1;
            return;
        }
        
        // Increase mostLowest array count if its equal to the value
        if(mostLowestNumber[0] === value) {
            mostLowestNumber[1]++;
            return;
        }
        
        // Increase actualNumber array if its equal with the value
        if(actualNumberCount[0] === value) {
            actualNumberCount[1]++;
        }
        
        // If the mostLowest array count is lesser than actualNumber array count, then the mostLowest array values assume the actualNumber values
        if(mostLowestNumber[1] < actualNumberCount[1] ) {
            mostLowestNumber[0] = actualNumberCount[0];
            mostLowestNumber[1] = actualNumberCount[1];
        }
    })
    
    return mostLowestNumber[0];
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const arrCount: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result: number = migratoryBirds(arr);

    ws.write(result + '\n');

    ws.end();
}

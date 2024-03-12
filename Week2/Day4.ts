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

function diagonalDifference(arr: number[][]): number { //Math.abs() // arr[Line][Column]
    let diagonalDiff: number = 0;
    
    let diagonalSum1: number = 0, diagonalSum2: number = 0, control: number = arr.length - 1;
    
    for(let i in arr) { //Left-Right Diagonal Sum
        diagonalSum1 = diagonalSum1 + arr[i][i];
    }    
    
    for(let i in arr) { //Right-Left Diagonal Sum
        diagonalSum2 = diagonalSum2 + arr[i][control];        
    
        control--;
    }    
    
    diagonalDiff = Math.abs(diagonalSum1 - diagonalSum2);
    
    return diagonalDiff;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    let arr: number[][] = Array(n);

    for (let i: number = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result: number = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}

'use strict';

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
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr: number[], n: number): void {
    let numPositivo: number = 0, numNegativo: number = 0, numZero : number = 0;    
     
    for (let i: number = 0; i < n; i++) {
        if(arr[i] > 0) {
            numPositivo++;
        } else if (arr[i] < 0) {
            numNegativo++;
        } else {
            numZero ++;
        }
    }
    
    const posRatio : number = numPositivo/n
    const negRatio : number = numNegativo/n
    const zeroRatio : number = numZero/n
    
    console.log(posRatio.toFixed(6))
    console.log(negRatio.toFixed(6))
    console.log(zeroRatio.toFixed(6))
}

function main() {
    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    plusMinus(arr, n);
}

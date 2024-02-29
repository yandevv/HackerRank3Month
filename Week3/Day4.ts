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
 * Complete the 'sockMerchant' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY ar
 */

function sockMerchant(n: number, ar: number[]): number {
    let numberOfPairs: number = 0;
    ar.sort();
    
    function countPairs(socksArray: number[]) {
        for(let i: number = 0; i < socksArray.length; i++) {
            for(let j: number = 0; j < socksArray.length; j++) {
                if(i !== j && socksArray[i] === socksArray[j]) {
                    numberOfPairs++;
                    return countPairs(socksArray.filter((value, index) => index !== i && index !== j));
                }
            }
        }
    }
    countPairs(ar);
    

    return numberOfPairs;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const ar: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

    const result: number = sockMerchant(n, ar);

    ws.write(result + '\n');

    ws.end();
}
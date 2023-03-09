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
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function lonelyinteger(a: number[]): number {
    let lonelyNumber: number = 0;
    
    for(let i: number = 0; i < a.length; i++) {
        let repeted: number = 0;
        
        for(let j: number = 0; j < a.length; j++) {
            if(a[i] == a[j]) {
                repeted++;
            }
        }
        
        if(repeted == 1 || a.length == 1) {
            lonelyNumber = a[i];
        }        
    }
    
    return lonelyNumber;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const a: number[] = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result: number = lonelyinteger(a);

    ws.write(result + '\n');

    ws.end();
}

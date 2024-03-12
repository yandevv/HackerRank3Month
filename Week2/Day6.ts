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
 * Complete the 'countingValleys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER steps
 *  2. STRING path
 */

function countingValleys(steps: number, path: string): number {
    let valleyCount: number = 0, actualAltitude: number = 0, actualLocal: string = 'SeaLevel';
    
    let stepTypes: string[] = path.split('');
    
    for(let i: number = 0; i < steps; i++) {
        if(stepTypes[i] == 'D') {
            actualAltitude--;
        } else{
            actualAltitude++;
        }
        
        if(actualAltitude < 0 && actualLocal != 'Valley') {
            actualLocal = 'Valley';
            valleyCount++;            
        } else if(actualAltitude > 0 && actualLocal != 'Mountain'){
            actualLocal = 'Mountain';
        } else if(actualAltitude == 0 && actualLocal != 'SeaLevel'){
            actualLocal = 'SeaLevel';
        }
    }   
    
    return valleyCount;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const steps: number = parseInt(readLine().trim(), 10);

    const path: string = readLine();

    const result: number = countingValleys(steps, path);

    ws.write(result + '\n');

    ws.end();
}
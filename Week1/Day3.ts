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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s: string): string {
    let hourFormat: string = s.slice(8), hour: number = parseInt(s.slice(0, 2));
    let convertedString: string;
    
    if(hourFormat == "PM" && hour < 12) {
        convertedString = (hour + 12) + s.slice(2, -2);
    } else if(hourFormat == "AM" && hour == 12) {
        convertedString = "00" + s.slice(2, -2);
    } else {
        convertedString = s.slice(0, -2);
    }
    
    return(convertedString);
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}

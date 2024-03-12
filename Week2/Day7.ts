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
 * Complete the 'pangrams' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function pangrams(s: string): string {
    let isPangram: string = 'not pangram';
    
    let letters: string[] = s.split(''), comparisonArr: string[] = [];
    
    for(let i: number = 0; i < letters.length; i++) {
        let b: boolean = false;
        
        for(let j: number = 0; j < comparisonArr.length; j++) {            
            if(letters[i].toLowerCase() == comparisonArr[j]) {
                b = true;
            }
        }
        
        if(b == false) {
            comparisonArr.push(letters[i].toLowerCase());
        }
    }
    
    if(comparisonArr.length == 27) {
        isPangram = 'pangram';
    }
    
    return isPangram;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = pangrams(s);

    ws.write(result + '\n');

    ws.end();
}
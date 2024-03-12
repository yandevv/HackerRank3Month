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
 * Complete the 'marsExploration' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function marsExploration(s: string): number {
    let changedLetters: number = 0;
    
    let letters: string[] = s.split('');
    
    for(let i: number = 0; i < letters.length; i++) {        
        switch ((i+1) % 3) {
            case 1: //Need to be S
                if(letters[i] != 'S') {
                    changedLetters++;
                }
            break;
            case 2: //Need to be O
                if(letters[i] != 'O') {
                    changedLetters++;
                }
            break;
            case 0: //Need to S
                if(letters[i] != 'S') {
                    changedLetters++;
                }
            break;
        }
    }
    
    return changedLetters;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: number = marsExploration(s);

    ws.write(result + '\n');

    ws.end();
}
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
    main(inputLines);
});

function readLine(): string {
    return inputLines[currentLine++];
}

function camelCase(text: string) {
    const separatedText: string[] = text.split(' ');
    let finalText: string = separatedText[0];
    for(let i: number = 1; i < separatedText.length; i++) {
        finalText += separatedText[i].split('')[0].toUpperCase() + separatedText[i].substring(1);
    }
    return finalText;
}

function main(input: string[]) {
    for(let i in input) {
        const splittedInput: string[] = input[i].replace('\r', '').split(';');
        if(splittedInput[0] === 'S') {
            //S;M;
            if(splittedInput[1] === 'M') {
                console.log(splittedInput[2].replace('()', '').replace(/([A-Z])/g, ' $1').toLowerCase());
                continue;
            }
            //S;V;
            if(splittedInput[1] === 'V') {
                console.log(splittedInput[2].replace(/([A-Z])/g, ' $1').toLowerCase());
                continue;
            }
            //S;C;
            if(splittedInput[1] === 'C') {
                console.log(splittedInput[2].replace(/([A-Z])/g, ' $1').toLowerCase().trim());
                continue;
            }
        }
        const camelCasedInput = camelCase(splittedInput[2]);
        //C;M;
        if(splittedInput[1] === 'M') {
            console.log(camelCasedInput + '()');
            continue;
        }
        //C;V;
        if(splittedInput[1] === 'V') {
            console.log(camelCasedInput);
            continue;
        }
        //C;C
        console.log(camelCasedInput.split('')[0].toUpperCase() + camelCasedInput.substring(1));
    }
}
//JONATHAN KISE 11/11/2023 6502 ASM INTERPRETER





const fs = require('fs').promises;

async function readTextFile(filePath){
  const data = await fs.readFile(filePath, 'utf8');
  return data;
}
const filePath = 'C:/Users/shere/Desktop/JS6502Emulator/V1 6502 decoder/test.asm'; 
(async () => {
    const fileContents = await readTextFile(filePath);
    const notfinal = fileContents.replace(/\s+/," ").split(/\r?\n/);
   makedatareadable(notfinal)
 
})();
function makedatareadable(notfinal){
var final = [];
labelFinder(notfinal);
for (var i = 0; i < notfinal.length; i++) {
 
  var line = notfinal[i].split(';')[0]; // remove comments
  final[i] = line.split(/\s+/);      // split on whitespace

  final.push(notfinal);   
}

decoder(final);
}


var labels = []; // Array to hold labels
const stack = []; // Array to hold stack
const Memory = new Array(0xFFFF) // 64K of memory
var A = 0; //ACCUMLATOR
var X = 0;
var Y = 0;
//REGISTER STATUS 
var N = 0; //Negative
var V = 0; //Overflow
var B = 0; // Break
var D = 0; //Decimal Mode
var I = 0; //Interrupt disable
var Z = 0; //Zero
var C = 0; //Carry



var SP = 255;
var PC;
//CPU INFORMATION

function labelFinder(code){
  for (var i = 0; i < code.length; i++) {
    var match = code[i].match(/\b\w+:/); // Find match in current line
    if (match) {
      labels.push([match[0],i]); // If match found, add it to labels array
    }

  }

  for (var i = 0; i < labels.length; i++) {
  console.log(labels[i][0] + " At location " + labels[i][1]);
  }

}
var decoderReadLocation = 0;
var running = true;
function decoder(code){
console.log("decoderReadLocation " + decoderReadLocation);
 
  for (decoderReadLocation; (decoderReadLocation < code.length-1)&&running; decoderReadLocation++){
    var commands = {
      "LDA": LDA,
      "LDX": LDX,
      "LDY": LDY,
      "STA": STA,
      "STX": STX,
      "STY": STY,
      "TAX": TAX,
      "TAY": TAY,
      "TSX": TSX,
      "TXA": TXA,
      "TXS": TXS,
      "TYA": TYA,
      "PHA": PHA,
      "PHP": PHP,
      "PLA": PLA,
      "PLP": PLP,
      "ASL": ASL,
      "LSR": LSR,
      "ROL": ROL,
      "ROR": ROR,
      "AND": AND,
      "BIT": BIT,
      "EOR": EOR,
      "ORA": ORA,
      "ADC": ADC,
      "CMP": CMP,
      "CPX": CPX,
      "CPY": CPY,
      "SBC": SBC,
      "DEC": DEC,
      "DEX": DEX,
      "DEY": DEY,
      "INC": INC,
      "INX": INX,
      "INY": INY,
      "BRK": BRK,
      "JMP": JMP,
      "JSR": JSR,
      "RTI": RTI,
      "RTS": RTS,
      "BCC": BCC,
      "BCS": BCS,
      "BEQ": BEQ,
      "BMI": BMI,
      "BNE": BNE,
      "BPL": BPL,
      "BVC": BVC,
      "BVS": BVS,
      "CLC": CLC,
      "CLD": CLD,
      "CLI": CLI,
      "CLD": CLD,
      "CLI": CLI,
      "CLV": CLV,
      "SEC": SEC,
      "SED": SED,
      "SEI": SEI,
      "NOP": NOP,

    };

    var command = code[decoderReadLocation][0];
if (commands.hasOwnProperty(command)) {
  commands[command](code, decoderReadLocation);
} else {
  console.log("Unknown command: " + command);
}
    console.log("Values: \n A " + A.toString(16));
    console.log(" X " + X.toString(16));
    console.log(" Y " + Y.toString(16));
    console.log(" SP " + SP.toString(16));
    console.log("Flags: ");
    console.log(" N " + N);
    console.log(" Z " + Z);
    console.log(" C " + C);
    console.log(" V " + V);


  }
  }

function checkIfDataRightSize(code){
return true;
}
function BPL(code, i) {
  console.log("BPL Command started");

  // Check if the Negative flag is clear
  if (N == 0) {
    // Branch to the new location
    decoderReadLocation = getValue(code[i][1]);
  }
}
function BNE(code, i) {
  console.log("BNE Command started");

  // Check if the Zero flag is clear
  if (Z == 0) {
    // Branch to the new location
    decoderReadLocation = getValue(code[i][1]);
  }
}
function SBC(code, i) {
  console.log("SBC Command started");

  // Get the value to subtract
  var value = getValue(code[i][1]);

  // Subtract the value and the complement of the carry flag from the accumulator
  A = A - value - (1 - C);

  // Set the carry flag
  C = (A >= 0) ? 1 : 0;

  // If the result is negative, make it positive and set the negative flag
  if (A < 0) {
    A = -A;
    N = 1;
  } else {
    N = 0;
  }

  // Set the zero flag
  Z = (A === 0) ? 1 : 0;
}
function JSR(code, i) {
  console.log("JSR Command started");

  // Push the return address (minus one) onto the stack
  stack.push(i - 1);

  // Set the new read location
  decoderReadLocation = getValue(code[i][1]);
}
function RTS() {
  console.log("RTS Command started");

  // Check if the stack is not empty
  if (stack.length > 0) {
    // Pull the return address from the stack
    decoderReadLocation = stack.pop();
  } else {
    console.log("Error: Stack underflow");
  }
}
function ROR() {
  console.log("ROR Command started");

  // Store the current value of the carry flag
  var oldCarry = C;

  // Set the new carry flag to the old bit 0
  C = A & 1;

  // Shift the accumulator one bit to the right
  A = (A >> 1) & 0x7F;

  // Set bit 7 to the old carry flag
  A |= (oldCarry << 7);
}
function ROL() {
  console.log("ROL Command started");

  // Store the current value of the carry flag
  var oldCarry = C;

  // Shift the accumulator one bit to the left
  A = (A << 1) & 0xFF;

  // Set bit 0 to the old carry flag
  A |= oldCarry;

  // Set the new carry flag to the old bit 7
  C = (A & 0x80) ? 1 : 0;
}
function PLA(){
    // Check if the stack is not empty
    if (stack.length > 0) {
      // Pull the top value from the stack and store it in the accumulator
      A = stack.pop();
    } else {
      console.log("Error: Stack underflow");
    }
}
function PHA(){
  stack.push(A);
  
}
function BMI(code, i) {
  console.log("BMI Command started");

  // If the negative flag is set
  if (N === 1) {
    // Loop through the labels
    for (var j = 0; j < labels.length; j++) {
      // If the label matches the one in the code
      if (labels[j][0] === code[i][1] + ":") {
        console.log("Branching to " + labels[j][1]);
        // Set the new read location
        decoderReadLocation = labels[j][1];
      }
    }
  }
}
function BEQ(code,i){
   // If the zero flag is set
   if (Z === 1) {
    // Loop through the labels
    for (var j = 0; j < labels.length; j++) {
      // If the label matches the one in the code
      if (labels[j][0] === code[i][1] + ":") {
        console.log("Branching to " + labels[j][1]);
        // Set the new read location
        decoderReadLocation = labels[j][1];
      }
    }
  }
}

function BCS(code,i){
   // If the carry flag is set
   if (C === 1) {
    // Loop through the labels
    for (var j = 0; j < labels.length; j++) {
      // If the label matches the one in the code
      if (labels[j][0] === code[i][1] + ":") {
        console.log("Branching to " + labels[j][1]);
        // Set the new read location
        decoderReadLocation = labels[j][1];
      }
    }
  }
}
function BCC(code,i){
   // If the carry flag is clear
   if (C === 0) {
    // Loop through the labels
    for (var j = 0; j < labels.length; j++) {
      // If the label matches the one in the code
      if (labels[j][0] === code[i][1] + ":") {
       console.log("Branching to " + labels[j][1]);
        // Set the new read location
        decoderReadLocation = labels[j][1];
      }
    }
  }
}
function NOP(){
  //DO NOTHING LITERALLY DO NOTHING
}
function ASL(code,i){
A = A << 1;

}
function PLP(){
    // Pull the processor status from the stack
    var status = stack.pop();

    // Update the flags
    N = status.N;
    Z = status.Z;
    C = status.C;
    V = status.V;
}
function BVS(code, i) {
  if (V == 1) {
    for (var j = 0; j < labels.length; j++) {
      if(labels[j][0] == code[i][1]+":"){
        console.log("BVS TO " + labels[j][1])
        decoderReadLocation = labels[j][1];
      }
    }
  }
}
function BVC(code,i){

  if(V==0){
  for (var j = 0; j < labels.length; j++) {
    if(labels[j][0] == code[i][1]+":"){
      console.log("JMP TO " + labels[j][1])
      decoderReadLocation = labels[j][1];
    }
    }
  }
}
function PHP(code,i){
  stack.push({
    N: N,
    Z: Z,
    C: C,
    V: V
  });
}
function RTI(code,i){
  //NOT FULLY USED YET
}
function ORA(code,i){
  A = A | DataFixer(code,i,true);
  Z = (A === 0) ? 1 : 0;
}

function BRK(){
//STILL NEED TO DO THIS
// THIS JUST NEED TO SAY THE PROGRAM IS DONE
running = false;
}
function EOR(code,i){
A = A ^ DataFixer(code,i,true);
Z = (A === 0) ? 1 : 0;
}
function JMP(code,i){
  console.log("JMP Command started")

  for (var j = 0; j < labels.length; j++) {
    if(labels[j][0] == code[i][1]+":"){
      console.log("JMP TO " + labels[j][1])
      decoderReadLocation = labels[j][1];
    }
    }
}
function LSR(){A = A >> 1;}
function TAX(){X=A;}
function TAY(){Y=A;}
function TSX(){X=SP;}
function TXA(){A=X;}
function TXS(){SP=X;}
function TYA(){A=Y;}

function EOR(code,i){
if(A ? !DataFixer(code,i,true) : DataFixer(code,i,true));

}
function CLC(){C=0;}
function CLD(){D=0;}
function CLI(){I=1;}
function CLV(){V=0;}
function SEC(){C=1};
function SED(){D=1};
function SEI(){I=0;}
function BIT(code,i){
  
if(512&DataFixer(code,i,true)){V=1;}
if(1024&DataFixer(code,i,true)){N=1;}

}
function CMP(code,i){
var locMemory = DataFixer(code,i,true);
if(A < locMemory){Z=0;C=0;}
else if (A == locMemory){ N=0;Z=1;C=1;}
else {Z=0;C=1;}
}
function CPX(code,i){
  var locMemory = DataFixer(code,i,true);
  if(X < locMemory){Z=0;C=0;}
  else if (X == locMemory){ N=0;Z=1;C=1;}
  else {Z=0;C=1;}
}
  function CPY(code,i){
    var locMemory = DataFixer(code,i,true);
    if(Y < locMemory){Z=0;C=0;}
    else if (Y == locMemory){ N=0;Z=1;C=1;}
    else {Z=0;C=1;}
}
function DEC(code, i) {

  var locMemory = DataFixer(code, i, true);

  // Decrement the value at the memory location
  Memory[locMemory]--;

  // Set the zero flag if the new value is zero
  Z = (Memory[locMemory] === 0) ? 1 : 0;

  // Set the negative flag if the new value is negative
  N = (Memory[locMemory] < 0) ? 1 : 0;
}
function DEX(){X--;}
function DEY(){Y--;}
function INX(){X++;}
function INY(){Y++;}
function INC(code, i) {

  var locMemory = DataFixer(code, i, true);

  // Decrement the value at the memory location
  Memory[locMemory]++;

  // Set the zero flag if the new value is zero
  Z = (Memory[locMemory] === 0) ? 1 : 0;

  // Set the negative flag if the new value is negative
  N = (Memory[locMemory] < 0) ? 1 : 0;
}

function AND(code,i){
A=A&DataFixer(code,i);

}
function LDX(code,i){
  X = DataFixer(code,i,true);
}
function LDY(code,i){
  Y = DataFixer(code,i,true);
}
function LDA(code,i){
  A = DataFixer(code,i,true);
  //console.log(DataFixer(code,i,true));
  //A = Memory[DataFixer(code,i,true)];
}
function STA(code,i){
Memory[DataFixer(code,i,false)] = A;
}
function STX(code,i){
  Memory[DataFixer(code,i,false)] = X;
}
function STY(code,i){
  Memory[DataFixer(code,i,false)] = Y;
}


function ADC(code,i){
  //console.log("ADC Command started")
 // console.log("Data inside Command")
  // Add the memory value, the accumulator, and the carry flag
  var result = A + memoryValue + C;

  // Store the result in the accumulator
  A = result & 0xFF;

  // Update the carry flag
  C = (result > 0xFF) ? 1 : 0;

  // Update the overflow flag
  V = (~(A ^ memoryValue) & (A ^ result) & 0x80) ? 1 : 0;

  // Update the negative flag
  N = (A & 0x80) ? 1 : 0;

  // Update the zero flag
  Z = (A === 0) ? 1 : 0;

  //CHECK THIS
}

//HELPER FUNCTIONS
function DataFixer(code,i,ReadMemory){
var temp = 0;
// IMPLIED ADDRESSING IS NOT NEEDED
if(code[i][1][0] == "$"){
    //ABSOLUTE

    //ADD ABSOLUTE X AND Y
}
  if(code[i][1][0] == "#"){

    if(code[i][1][1] == "$"){
      //IMMEDIATE ADDRESSING
    temp = parseInt(code[i][1].slice(2),16);
    }
    else if(code[i][1][1] == "0"){
      //OCTAL
      temp = parseInt(code[i][1].slice(2),8);
    }
    else if(code[i][1][1] == "%"){
      //BINARY
    temp = parseInt(code[i][1].slice(2),2);
    }
    else 
    {
      //console.log("DATA " + code[i][1].slice(2));
     temp = parseInt(code[i][1].slice(1),10);
    }
    }
    else if(code[i][1][0] == "("){

      //INDIRECT ADDRESSING
    }
    else
    {
      //SET TRUE IF READING MEMORY SET FALSE IF READING LOCATION
      //THIS NEEDS THE CHANGE!!!
      if(ReadMemory == true){
      //  console.log("Trying to find whats going on here " +  parseInt(code[i][1].slice(1),16));
      temp = Memory[parseInt(code[i][1].slice(1),16)];
      }
      else {
          //Writing From Memory
      temp = parseInt(code[i][1].slice(1),16);

      }
    //Load the Byte from address number in memory into register A
    }
    return temp;
}


function NOTADDED(code,i){
  console.log("THIS FUNCTION HAS NOT BEEN ADDED TO THE CODE YET");
}
function ERROR(){
}

6502 Assembly Code Examples
This repository contains example code snippets for the MOS Technology 6502 assembly language, demonstrating various instructions and behaviors.

Usage
Change the JMP TESTX instruction to the desired test to see the corresponding behavior.

assembly
Copy code
JMP TEST4  ; CHANGE THIS VALUE TO SET WHAT GETS TESTED
RETURN:
    BRK

TEST1:
    ; **** LOAD INC AND DEC TEST ****
    LDA #$2C 
    LDX #$3
    DEX
    INY
    ; Expected Behavior
    ; X--, Y++
    JMP RETURN

TEST2:
    ; **** STACK TESTING ****
    LDA #$2C
    PHA
    LDA #$0
    PLA
    ; Expected Behavior
    ; Push from the Accumulator to Stack
    ; When pulled from Stack to Accumulator 
    ; the value of 2C should be loaded into A
    JMP RETURN

TEST3:
    ; **** READING AND WRITING MEMORY ****
    LDA #$2C
    STA $0400
    LDA #$0
    LDA $0400
    ; Expected Behavior
    ; Will read from and write to memory
    ; Thus the value of 2C should be loaded into A
    JMP RETURN

TEST4:
    ; **** FLAGS AND BRANCH TESTING ****
    SEC
    CLC
    BCC TESTINGBRANCH
    LDA #$2C
TESTINGBRANCH:
    LDA #$3C
    ; Expected Behavior
    ; LDA 2C will be skipped and 3C will be loaded into A
    JMP RETURN
MOS Technology 6502 ASM Instruction Set
Mnemonic	Description
ADC	Add with carry
AND	And (with accumulator)
ASL	Arithmetic shift left
BCC	Branch on carry clear
BCS	Branch on carry set
BEQ	Branch on equal (zero set)
BIT	Bit test
BMI	Branch on minus (negative set)
BNE	Branch on not equal (zero clear)
BPL	Branch on plus (negative clear)
BRK	Break / interrupt
BVC	Branch on overflow clear
BVS	Branch on overflow set
CLC	Clear carry
CLD	Clear decimal
CLI	Clear interrupt disable
CLV	Clear overflow
CMP	Compare (with accumulator)
CPX	Compare with X
CPY	Compare with Y
DEC	Decrement
DEX	Decrement X
DEY	Decrement Y
EOR	Exclusive or (with accumulator)
INC	Increment
INX	Increment X
INY	Increment Y
JMP	Jump
JSR	Jump subroutine
LDA	Load accumulator
LDX	Load X
LDY	Load Y
LSR	Logical shift right
NOP	No operation
ORA	Or with accumulator
PHA	Push accumulator
PHP	Push processor status (SR)
PLA	Pull accumulator
PLP	Pull processor status (SR)
ROL	Rotate left
ROR	Rotate right
RTI	Return from interrupt
RTS	Return from subroutine
SBC	Subtract with carry
SEC	Set carry
SED	Set decimal
SEI	Set interrupt disable
STA	Store accumulator
STX	Store X
STY	Store Y
TAX	Transfer accumulator to X
TAY	Transfer accumulator to Y
TSX	Transfer stack pointer to X
TXA	Transfer X to accumulator
TXS	Transfer X to stack pointer
TYA	Transfer Y to accumulator
Feel free to explore and modify the code to better understand the 6502 instruction set.

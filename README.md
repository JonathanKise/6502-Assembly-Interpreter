Example Code that can be run \n\n\n\n\n\n
JMP TEST4 ;CHANGE THIS VALUE TO SET WHAT GETS TESTED
RETURN:
BRK

TEST1:
;****LOAD INC AND DEC TEST****
LDA #$2C 
LDX #$3
DEX
INY
;Expected Behavior
;X--,Y++
JMP RETURN
TEST2:
;****STACK TESTING****
LDA #$2C
PHA
LDA #$0
PLA
;Expected Behavior
;Push from the Accumulator to Stack
;When pull from Stack to Accumlator 
;Thus the value of 2C should be loaded into A
JMP RETURN
TEST3:
;****READING AND WRITING MEMORY****
LDA #$2C
STA $0400
LDA #$0
LDA $0400
JMP RETURN
;Expected Behavior
;Will Read to and write from memory
;Thus the value of 2C should be loaded into A
TEST4:
;****FLAGS AND BRANCH TESTING****
SEC
CLC
BCC TESTINGBRANCH
LDA #$2C
TESTINGBRANCH:
LDA #$3C
JMP RETURN
;Expected Behavior
;LDA 2C Will be skipped and 3C will be loaded into A




MOS TECHNOLOGY 6502 ASM INSTRUCTION SET
ADC add with carry
AND and (with accumulator)
ASL arithmetic shift left
BCC branch on carry clear
BCS branch on carry set
BEQ branch on equal (zero set)
BIT bit test
BMI branch on minus (negative set)
BNE branch on not equal (zero clear)
BPL branch on plus (negative clear)
BRK break / interrupt
BVC branch on overflow clear
BVS branch on overflow set
CLC clear carry
CLD clear decimal
CLI clear interrupt disable
CLV clear overflow
CMP compare (with accumulator)
CPX compare with X
CPY compare with Y
DEC decrement
DEX decrement X
DEY decrement Y
EOR exclusive or (with accumulator)
INC increment
INX increment X
INY increment Y
JMP jump
JSR jump subroutine
LDA load accumulator
LDX load X
LDY load Y
LSR logical shift right
NOP no operation
ORA or with accumulator
PHA push accumulator
PHP push processor status (SR)
PLA pull accumulator
PLP pull processor status (SR)
ROL rotate left
ROR rotate right
RTI return from interrupt
RTS return from subroutine
SBC subtract with carry
SEC set carry
SED set decimal
SEI set interrupt disable
STA store accumulator
STX store X
STY store Y
TAX transfer accumulator to X
TAY transfer accumulator to Y
TSX transfer stack pointer to X
TXA transfer X to accumulator
TXS transfer X to stack pointer
TYA transfer Y to accumulator

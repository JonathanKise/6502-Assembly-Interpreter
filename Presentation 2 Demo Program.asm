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


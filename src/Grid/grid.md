# Grid

The Grid in Symoodle is build with [p5](https://p5js.org/).

## Understanding codes

- Each Dot is given an "id" based on its index (0-24)
- Each Line is given two Dots
- A line has to be between its neighbors
- A Line is representing in the submitted code as `[DOT_A.id]-[DOT_B.id]` where `[DOT_A.id] < [DOT_B.id]`. Examples:
    - '0-1' is a **valid** line
    - '1-0' is an **invalid** line
- A code is made up of 1 or more lines
- Lines are sorted than merged
    - A line is: '0-1'
    - Lines are collected: ['5-6', '0-1', '1-6']
    - A submitted code is the collection sorted/merged: '0-1;1-6;5-6'
    - The sort is on the string value of the number, not the numerical value

It would be nice if we eventually stored just the connection (I believe there are 72 possible lines). I think we'd need a map of some sort or some kind of algorithm:

``` JS
const connectionMap = {
  '0-1': 0,
  '0-5': 1,
  '0-6': 2,
  // ...etc...
}
```
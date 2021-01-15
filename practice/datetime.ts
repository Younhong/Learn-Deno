import {
    dayOfYear,
    // currentDayOfYear
} from 'https://deno.land/std@0.83.0/datetime/mod.ts';

console.log(dayOfYear(new Date('2020-02-02')));
// console.log(currentDayOfYear());

// currentDayOfYear은 0.83.0 버전에서 
// 삭제됨 영상의 0.63.0에서 동작함
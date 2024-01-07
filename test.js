// 'use strict';
// const letters = ['a', 'b', 'c', 'd', 'e'];
// console.log(letters.slice(1, 3));       
// console.log(letters);

// // console.log(letters.splice(1, 3));
// // console.log(letters);


const amounts = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.table(amounts);

// //For-off
// for (const [i, amountEl] of amounts.entries()) {
//     if(amountEl > 0) {
//         console.log(`${i + 1} Deposit: ${amountEl}`);
//     } else {
//         console.log(`${i + 1} withdraw: ${Math.abs(amountEl)}`);
//     }
// }

// console.log('===============================')
// FOR-EACH

amounts.forEach((amountEl) => amountEl > 0 ? console.log(`Deposit: ${amountEl}`) : console.log(`withdraw: ${Math.abs(amountEl)}`));

// MAP
 const euroUSD = 1.2;

 const totalDepositUSD = (arr) => {
    return arr.filter(amountEL => amountEL > 0)
    .map(amountEL => amountEL * euroUSD)
    .reduce((accum, amountEL) => (accum + amountEL), 0);
};

console.log(totalDepositUSD(amounts));

 const euroEx = amounts.map(amountEL => amountEL * euroUSD);
 console.log(euroEx);    

 const euroEx2 = [];

// For off method
for (const euroEl of amounts) { 
   (euroEx2.push(euroEl * euroUSD));
}

// console.log(euroEx2);

/// FILTER

// const deposit = amounts.filter(amountEl => amountEl > 0);

// console.log(deposit);

// const withdrawal = amounts.filter(amountEL => amountEL < 0);

// console.log(withdrawal);

// for off method
// const deposit2 = [];
// for (const amountEL of amounts) {
//     amountEL > 0 ? deposit2.push(amountEL) : -1;
// }

// console.log(deposit2);

// REDUCE METHOD
// const totalAmount = amounts.reduce((accum, amountEL) => {
//     return accum + amountEL;
// }, 0);

// console.log(totalAmount);

// let totalAmount2 = 0;

// for (const amountEL of amounts) {
//     totalAmount2 = totalAmount2 += amountEL;
// }

// console.log(totalAmount2);

// const max = amounts.reduce((accum, amountEL) =>{
//     if (accum > amountEL) return accum;
//     else return amountEL;
// }, amounts[0]);

// console.log(max);

// const min = amounts.reduce((accum, amountEL) => {
//     if (accum < amountEL) return accum;
//     else return amountEL;
// }, amounts[0]);

// console.log(min);

// const incomeArr = [350, 870, 221, 82, 694, 15, 25];

// const calcAverage = (arr) => {
//     const avrg = arr.reduce((accum, el) => accum + el);
//     return Math.trunc(avrg / arr.length);
// }

// console.log(calcAverage(incomeArr));

// const calcDepositAvrg = (arr) => {
//     const deposit = arr.filter(el => el > 0);
//     const total = deposit.reduce((accum, el) => accum +el);
//     return total / deposit.length;
// }

// console.log(calcDepositAvrg(amounts));

//find method

// const firstWithdraw = amounts.find(el => el < 0);

// console.log(amounts.includes(3000));

// const higherEl = amounts.findIndex()


// // SOME
// const badArr = [203, 456, 107];
// // const amounts = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const positiveIntegers = badArr.some(el => el > 0);
// console.log(positiveIntegers);

// const nagativeIntegers = amounts.every(el => el >0);

// const depoMag = el => 0;
// console.log(amounts.filter(depoMag));
// console.log(amounts.some(depoMag));


// const d = new Date ();
// const today = new Date('Wed May 25 2022 13:09:55');
// const past = new Date(1963, 5, 12);
// const future = new Date(2040, 11, 21);
// console.log(d);
// console.log(today);
// console.log(past);
// console.log(future);

// future.setFullYear(2023);
// console.log(future);

// console.log(d.getTime());

// console.log(today.toISOString());

// console.log(new Date('2019-11-01T13:15:33.035Z'));

// const past = new Date(2022, 4, 14);
// const future = new Date(2022, 4, 27);

// console.log(past, future);

// const daysPassed = (day1, day2) => {
//     return Math.trunc(Math.abs((day2 - day1) / (1000 * 60 * 60 * 24)));
// }

// console.log(daysPassed(past, future));

// const todayDate =new Date();
// console.log(todayDate);

// console.log('US:', new Intl.DateTimeFormat('en-US').format(todayDate));

// console.log('Britain:', new Intl.DateTimeFormat('en-GB').format(todayDate));

// console.log('Germany:', new Intl.DateTimeFormat('de-DE').format(todayDate));

// console.log('Portugal:', new Intl.DateTimeFormat('pt-POR').format(todayDate));

// console.log('SYRIA', new Intl.DateTimeFormat('ar-SY').format(todayDate));



// const number = 123456.789;
// const option = {
//     style: 'currency',
//     currency: 'USD'
// }

// console.log('US:', new Intl.NumberFormat('en-US', option).format(number));

// console.log('Britain:', new Intl.NumberFormat('en-GB', option).format(number));

// console.log('Syria:', new Intl.NumberFormat('ar-SY', option).format(number));

// console.log('Germany:', new Intl.NumberFormat('de-DE', option).format(number));




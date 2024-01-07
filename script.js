'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-07-01T10:17:24.185Z',
    '2022-04-18T14:11:59.604Z',
    '2022-04-23T17:01:17.194Z',
    '2022-04-24T23:36:17.929Z',
    '2022-04-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2022-05-18T16:33:06.386Z',
    '2022-05-23T14:43:26.374Z',
    '2022-05-24T18:49:59.371Z',
    '2022-05-25T12:01:20.894Z'
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Sarah Smith',
  movements: [6500, 14000, -1850, -790, -3210, -1000, 28500, -560],
  interestRate: 1.4,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2022-05-18T16:33:06.386Z',
    '2022-05-23T14:43:26.374Z',
    '2022-05-24T18:49:59.371Z',
    '2022-05-25T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const accounts = [account1, account2, account3];
// console.log(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const formatMovementDate = function (newDate, acct)  {
  const calcDaysPassed = (day1, day2) => {
    return Math.trunc(Math.abs ((day2 - day1) / (1000 * 60 * 60 * 24)));
  }

  const daysPassed = calcDaysPassed(newDate, new Date());
  console.log(daysPassed);


  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
  //   const currDate = `${newDate.getDate()}`.padStart(2, '0');
  //   const currMonth = `${newDate.getMonth() +1}`.padStart(2, '0');
  //   const currYear = newDate .getFullYear();
  //   return `${currDate}/${currMonth}/${currYear}`;
  // }

  return new Intl.DateTimeFormat(acct.locale).format(newDate);
 } 
}

const formatCurrency = (value, acctLocale, currency) => {
  return new Intl.NumberFormat(acctLocale, { style: 'currency', currency}).format(value);
}


const displayMovements = (accts) => {
  containerMovements.innerHTML = '';

  accts.movements.forEach((movementEl, i) => {
    const movCurDate = new Date(accts.movementsDates[i]);
    
    const displayDate = formatMovementDate(movCurDate, accts.locale);
    console.log(displayDate)
    const movementType = movementEl > 0 ? 'deposit' : 'withdrawal'
    const movementHTML = `
    <div class="movements">
      <div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${i +1} ${movementType}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCurrency(movementEl, accts.locale, accts.currency)}</div>
      </div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', movementHTML);
  }) 
}


const calDisplayBalance = (accts) => {
  accts.balance =accts.movements.reduce((accum, bal) => accum + bal, 0);
  labelBalance.textContent = `${formatCurrency(accts.balance, accts.locale, accts.currency)}`;
  console.log(accts.balance);
  return accts.balance;
}



const calcDisplaySum = (account) => {
  const income = account.movements.filter(amountEl => amountEl > 0)
  .reduce((accum, el) => accum + el);
  labelSumIn.textContent = `${formatCurrency(income, account.locale, account.currency)}`;

  const expenses = account.movements.filter(exp => exp < 0)
  .reduce((accum, exp) => accum + exp, 0);
  labelSumOut.textContent = `${formatCurrency(Math.abs(expenses),account.locale, account.currency)}`;

  const interest = account.movements.filter(amountEl => amountEl > 0)
  .map(amountInt => (amountInt * account.interestRate) / 100)
  .reduce((accum, int) => accum + int, 0);
  labelSumInterest.textContent = `${formatCurrency(interest, account.locale, account.currency)}`;

  return expenses;
}

const updateUI = (accts) => {
  // Display balance
  calDisplayBalance(accts);

  // Display Movement
  displayMovements(accts);

  // Display Interest 
  calcDisplaySum(accts);
}


/////////////////////////////////////////////////
// const createUserName = (user) => {
//   const userName = user.toLowerCase().split(' ').map(nameEl => nameEl[0]).join('');
//   console.log(userName);
//   return userName;
// }
// createUserName(account4.owner);

const createUserName = (acctObj) => {
  acctObj.forEach(acct => {
    acct.username = acct.owner.toLowerCase().split(' ').map(nameEl => nameEl[0]).join('');
  });

   // const userName = acctObj.owner.toLowerCase().split(' ').map(nameEl => nameEl[0]).join('');
  // console.log(userName);
  // return userName;
 
}
createUserName(accounts);

const logOutTimer = () => {
  let time = 20;     // let's say 100sec

  const tikTok = () => {
    const min = String(Math.trunc(time / 60 )).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // Display Timer in the UI
    labelTimer.textContent = `${min}:${sec}`;
   
    if (time === 0) {
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }
    
    // Decrease the time
    time--    // time--

  }

  tikTok();
  const timer = setInterval(tikTok, 1000);

  return timer;
}



//////////////////////////////
// EVENT HANDLERS
////////////////////////////
let currentAcct, timer;

// currentAcct = account2;
// updateUI(currentAcct);
// containerApp.style.opacity = 1;


// // Experiment
// const todayDate = new Date(2022, 1, 23);
// const locale = navigator.language;



btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  currentAcct = accounts.find(acct => acct.username === inputLoginUsername.value)
  console.log(typeof +inputLoginPin.value);

  if (currentAcct.pin === +inputLoginPin.value) {
    console.log('you don login');

    // Display welcome message
    const user = currentAcct.owner.split(' ')[0];
    labelWelcome.textContent = `Welcome back, ${user}`;

    // Display Date and Time
    const currentDate = new Date();
    // const currDate = `${currentDate.getDate()}`.padStart(2, '0');
    // const currMonth =`${currentDate.getMonth() +1}`.padStart(2, '0');
    // // const currMonthFix = currMonth < 10 ? '0' + currMonth : currMonth;
    // const currYear = currentDate.getFullYear();
    // const currHours = `${currentDate.getHours()}`.padStart(2, '0');
    // const currMinute = `${currentDate.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${currDate}/${currMonth}/${currYear} ${currHours}:${currMinute}`;

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',   // short // long
      year: '2-digit',     // 2-digits  // short
      weekday: 'long'
    }
   
    
    labelDate.textContent = new Intl.DateTimeFormat(currentAcct.locale, options).format(currentDate);

    // Display UI
    containerApp.style.opacity = 100;

    // Clear Input Field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update User Interface
    updateUI(currentAcct);

    // Start Timer
    clearInterval(timer)
    timer = logOutTimer();

  }
  console.log(currentAcct);

  
});

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcct = accounts.find(acct => acct.username === inputTransferTo.value);

  inputTransferTo.value = inputTransferAmount.value = '';
   
  // if (amount > 0 && receiverAcct && currentAcct.balance >= amount && currentAcct.username !== receiverAcct.username) {
     
  //   currentAcct.movements.push(-amount);
  //   receiverAcct.movements.push(amount);

  //   // UpdateUI
  //   updateUI(currentAcct);

  // }

  if (amount > 0 && receiverAcct && currentAcct.username !== receiverAcct.username) {
    if (currentAcct.balance >= amount) {

      // 1. Remove amount from sender account
      currentAcct.movements.push(-amount);
      currentAcct.movementsDates.push(new Date().toISOString());

      // 2. Add amount to receiver account
      receiverAcct.movements.push(amount);
      currentAcct.movementsDates.push(new Date().toISOString());
  
      // 3. UpdateUI
      updateUI(currentAcct);

    // Start Timer
    clearInterval(timer)
    timer = logOutTimer();  

      console.log('Balance is sufficient....transfer done 🤙');
    }else {
      alert('Insufficient balance....Gettat 😛');
    }
    
  }else {
    console.log('Invalid transfer');
  }
   
});

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const loanAmount = +inputLoanAmount.value;
  const loanCondition = currentAcct.movements.some(acctEl => acctEl >= loanAmount * 0.1);

  if (loanAmount > 0 && loanCondition) {
    setTimeout(() => {
    currentAcct.movements.push(loanAmount);
    currentAcct.movementsDates.push(new Date().toISOString());

    // Clear Input feld
    inputLoanAmount.value = '';
    alert(`Congratulations...your loan has been approved! 🤙🥰`);
    updateUI(currentAcct);
    console.log('Loan approved', loanAmount);
    }, 3000)
    
   

  } else {
    console.log('loan disaproved!')
  }
  

});

btnClose.addEventListener('click', (e) => {
  e.preventDefault();


  if (currentAcct.username === inputCloseUsername.value && currentAcct.pin === +inputClosePin.value) {

    const index = accounts.findIndex(acct => acct.username === inputCloseUsername.value);
    console.log(index);
  
    accounts.slice(index, 1);
    
    // Hide UI
    containerApp.style.opacity = 0;

    // Clear Input feld
    inputCloseUsername.value = inputClosePin.value = '';

    labelWelcome.textContent = `Log in to get started`;

    console.log('you don click');
  } else {
    console.log('NOT Working');
  }
})

////////////////////////////////////
//////////////TEST//////////////////
////////////////////////////////////
// const accountJD = accounts.find(el => el.owner === 'Jessica Davis');
// const accountSS = accounts.find(el => el.username === 'ss');

//   // console.log(accountJD, accountSS) 

// for (const person of accounts) {
//   if (person.pin === 3333) console.log(person);

// }



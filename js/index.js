;(function() {

  const VALUE_FIRST_MONTH = 0;
  const VALUE_FIRST_DAY = 1;
  const INCREMENT_OF_YEAR = 1;
  const NUMBER_MILLISECONDS_IN_SECOND = 1000;
  const NUMBER_SECONDS_IN_MINUTE = 60;
  const NUMBER_MINUTES_IN_HOUR = 60;
  const NUMBER_HOURS_IN_DAY = 24;
  const TEN_DENOMINATOR = 10;
  const HUNDRED_DENOMINATOR = 100;
  const DELAY = 10000;
  const ARRAY_CASES = [
    ['День', 'Дня', 'Дней'],
    ['Час', 'Часа', 'Часов'],
    ['Минута', 'Минуты', 'Минут']
  ];

  const currentStateOfTimer = {
    hundredDay: 0,
    tenDay: 0,
    unitDay: 0,
    tenHour: 0,
    unitHour: 0,
    tenMinute: 0,
    unitMinute: 0
  };
  const segmentElems = {
    hundredDay: {
      segment: document.querySelector('.js-hundredDay'),
      top: document.querySelector('.js-hundredDayTop'),
      down: document.querySelector('.js-hundredDayDown')
    },
    tenDay: {
      segment: document.querySelector('.js-tenDay'),
      top: document.querySelector('.js-tenDayTop'),
      down: document.querySelector('.js-tenDayDown')
    },
    unitDay: {
      segment: document.querySelector('.js-unitDay'),
      top: document.querySelector('.js-unitDayTop'),
      down: document.querySelector('.js-unitDayDown')
    },

    tenHour: {
      segment: document.querySelector('.js-tenHour'),
      top: document.querySelector('.js-tenHourTop'),
      down: document.querySelector('.js-tenHourDown')
    },
    unitHour: {
      segment: document.querySelector('.js-unitHour'),
      top: document.querySelector('.js-unitHourTop'),
      down: document.querySelector('.js-unitHourDown')
    },

    tenMinute: {
      segment: document.querySelector('.js-tenMinute'),
      top: document.querySelector('.js-tenMinuteTop'),
      down: document.querySelector('.js-tenMinuteDown')
    },
    unitMinute: {
      segment: document.querySelector('.js-unitMinute'),
      top: document.querySelector('.js-unitMinuteTop'),
      down: document.querySelector('.js-unitMinuteDown')
    }
  };

  const descriptionElem = {
    day: document.querySelector('.js-descriptionDay'),
    hour: document.querySelector('.js-descriptionHour'),
    minute: document.querySelector('.js-descriptionMinute')
  }

  changeTimer( compareSateTimer(currentStateOfTimer, getNewTimerValue()) );
  setInterval(() => {
    changeTimer( compareSateTimer(currentStateOfTimer, getNewTimerValue()) );
  }, DELAY);

  function getNewTimerValue() {
    const currentTime = new Date();
    const dateOfNewYear = new Date(
      currentTime.getFullYear() + INCREMENT_OF_YEAR,
      VALUE_FIRST_MONTH,
      VALUE_FIRST_DAY
    );
    const timeUntilNewYear = dateOfNewYear - currentTime;

    const leftDay = Math.floor(
      timeUntilNewYear / 
      NUMBER_MILLISECONDS_IN_SECOND / 
      NUMBER_SECONDS_IN_MINUTE / 
      NUMBER_MINUTES_IN_HOUR / 
      NUMBER_HOURS_IN_DAY
    );
    const leftHour = Math.floor(
      timeUntilNewYear / 
      NUMBER_MILLISECONDS_IN_SECOND / 
      NUMBER_SECONDS_IN_MINUTE / 
      NUMBER_MINUTES_IN_HOUR % 
      NUMBER_HOURS_IN_DAY
    );
    const leftMinute = Math.floor(
      timeUntilNewYear / 
      NUMBER_MILLISECONDS_IN_SECOND / 
      NUMBER_SECONDS_IN_MINUTE % 
      NUMBER_MINUTES_IN_HOUR
    );

    return {
      hundredDay: Math.trunc(leftDay / HUNDRED_DENOMINATOR),
      tenDay: Math.trunc(leftDay % HUNDRED_DENOMINATOR / TEN_DENOMINATOR),
      unitDay: leftDay % TEN_DENOMINATOR,
      tenHour: Math.trunc(leftHour / TEN_DENOMINATOR),
      unitHour: leftHour % TEN_DENOMINATOR,
      tenMinute: Math.trunc(leftMinute / TEN_DENOMINATOR),
      unitMinute: leftMinute % TEN_DENOMINATOR
    }
  }

  function compareSateTimer(currentStateOfTimer, newStateOfTimer) {
    const diffStateOfTimer = {};

    for (elem in currentStateOfTimer) {
      
      if (currentStateOfTimer[elem] !== newStateOfTimer[elem]) {
        diffStateOfTimer[elem] = [currentStateOfTimer[elem], newStateOfTimer[elem]];
      }

    }

    return diffStateOfTimer;
  }

  function changeTimer(diffOfState) {

    for (elem in diffOfState) {
      const currentElem = elem;
      const nextDigit = new NextDigit( diffOfState[currentElem][0], diffOfState[currentElem][1] );

      nextDigit.render(segmentElems[currentElem].segment);
      segmentElems[currentElem].top.textContent = diffOfState[currentElem][1];
      currentStateOfTimer[currentElem] = diffOfState[currentElem][1];

      segmentElems[currentElem].segment.addEventListener(
        'animationend',
        () => {
          segmentElems[currentElem].down.textContent = diffOfState[currentElem][1];
          changeDescriptionOfSegments();
        },
        {
          once: true
        }
      );
    }

  }

  function changeDescriptionOfSegments() {
    descriptionElem.day.textContent = declOfNum( 
      (currentStateOfTimer.hundredDay * HUNDRED_DENOMINATOR + currentStateOfTimer.tenDay * TEN_DENOMINATOR + currentStateOfTimer.unitDay), 
      ARRAY_CASES[0] 
    );

    descriptionElem.hour.textContent = declOfNum( 
      (currentStateOfTimer.tenHour * TEN_DENOMINATOR + currentStateOfTimer.unitHour), 
      ARRAY_CASES[1] 
    );

    descriptionElem.minute.textContent = declOfNum( 
      (currentStateOfTimer.tenMinute * TEN_DENOMINATOR + currentStateOfTimer.unitMinute), 
      ARRAY_CASES[2] 
    );
  }

  function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }

})();
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const banners = document.querySelectorAll('.deadline-format h4')


let giveaway_date = new Date(2022, 5, 3, 11, 0, 0);
// make it always in the future
(() => {
  const current_date = new Date();
  while (giveaway_date < current_date   ){
    giveaway_date.setFullYear(giveaway_date.getFullYear()+1);
  }
})()


// post giveaway date
const year  = giveaway_date.getFullYear();
const day = weekdays[giveaway_date.getDay()];

giveaway.textContent = `giveaway ends on ${day}, 03 june ${year}, 11:00am`;


// future time in ms
const giveaway_time = giveaway_date.getTime();

const getDays = (time) => { 
  return {
    days: Math.floor(time/(24*60*60*1000)),
    remain: time%(24*60*60*1000)
  }
}
const getHours = (time) => { 
  return {
    hours: Math.floor(time/(60*60*1000)),
    remain: time%(60*60*1000)
  }
}
const getMinutes = (time) => { 
  return {
    minutes: Math.floor(time/(60*1000)),
    remain: time%(60*1000)
  }
}
const getSeconds = (time) => { 
  return {
    seconds: Math.floor(time/(1000)),
    remain: time%(1000)
  }
}

const get_remaining_time =  () => {
  const today = new Date().getTime();
  let remain = giveaway_time - today, days, hours, minutes, seconds;
  if(remain <= 0){
    // incase it's expired
    clearInterval(update_interval);
    deadline.innerHTML= `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
  ({days, remain} =  getDays(remain));
  ({hours, remain} =  getHours(remain));
  ({minutes, remain} =  getMinutes(remain));
  ({seconds, remain} =  getSeconds(remain));
  
  return {days, hours, minutes, seconds};
}

const format = (num) => {
  if(num>9){
    return String(num);
  }else if (num>0) {
    return`0${num}`;
  }else{
    return '0';
  }
};


const update_time = () => {
  const remain_time = get_remaining_time();

  banners.forEach((banner) => {
    banner.textContent = format(remain_time[banner.classList[0]]);
  })

}
let update_interval = setInterval(update_time, 1000);

update_time();


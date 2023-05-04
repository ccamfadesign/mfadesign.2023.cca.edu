const ColumnToStudentMap = {
  "one": ["ziyan","maria","qingyi","diya","spring","jordan","ruisen","hua"],
  "two": ["shane","jinyao","zahra","tracy","layla","taoyu","zhilin","shijia"],
  "three": ["saleem","wenwen","toni","jessie","devan","brenden","merhan",],
  "four": ["atharva","andrew","athene","anjni","qian","rosie","viola",],
  "five": ["anjana","savithri","vincy","michelle","xinyi","shuhan","yizhou"],
  "six": ["ziyan","maria","qingyi","diya","spring","jordan","ruisen","hua","shane","jinyao","zahra","tracy",],
  "seven": ["layla","taoyu","zhilin","shijia","saleem","wenwen","toni","jessie","devan","brenden","merhan","atharva",],
  "eight": [,"andrew","athene","anjni","qian","rosie","viola","anjana","savithri","vincy","michelle","xinyi","shuhan","yizhou"],
  "nine": ["ziyan","maria","qingyi","diya","spring","jordan","ruisen","hua","shane","jinyao","zahra","tracy","layla","taoyu","zhilin","shijia","saleem","wenwen","toni","jessie","devan","brenden","merhan","atharva","andrew","athene","anjni","qian","rosie","viola","anjana","savithri","vincy","michelle","xinyi","shuhan","yizhou"],
};

const HoverColors = [
  "#FD5ADC",
  "#1B32A7",
  "#00A95C",
  "#FF4352",
];

function scrollToTop() {
  for (const column in ColumnToStudentMap) {
    let columnElement = $('.' + column);
    columnElement.animate({
      scrollTop: 0
    });
  }
}

function scrollToStudentIndexSection() {
  for (const column in ColumnToStudentMap) {
    let columnElement = $('.' + column);
    let titleElement = columnElement.find('.student-index')[0];
    let titleOffsetTop = $(titleElement)[0].offsetTop;
    let containerOffsetTop = columnElement.offset().top;
    let containerOffsetHeight = columnElement.outerHeight();
    let titleElementOffsetHeight = titleElement.offsetHeight;
    columnElement.animate({
      scrollTop: titleOffsetTop - containerOffsetTop - containerOffsetHeight + titleElementOffsetHeight
    });
  }
}

function scrollToExhibitionSection() {
  for (const column in ColumnToStudentMap) {
    let columnElement = $('.' + column);
    let titleElement = columnElement.find('.exhibition')[0];
    let titleOffsetTop = $(titleElement)[0].offsetTop;
    let containerOffsetTop = columnElement.offset().top;
    let containerOffsetHeight = columnElement.outerHeight();
    let titleElementOffsetHeight = titleElement.offsetHeight;
    columnElement.animate({
      scrollTop: titleOffsetTop - containerOffsetTop - containerOffsetHeight + titleElementOffsetHeight
    });
  }
}

function scrollToStudent(target) {
  let id = target.id.toLowerCase();
  for (const column in ColumnToStudentMap) {
    if (!$('.' + column).is(":visible")) continue;
    let studentIds = ColumnToStudentMap[column];
    if (studentIds.includes(id)) {
      let columnElement = $('.' + column);
      let titleElement = columnElement.find('#' + id)[0];
      let titleOffsetTop = $(titleElement)[0].offsetTop;
      let containerOffsetTop = columnElement.offset().top;
      let containerOffsetHeight = columnElement.outerHeight();
      let titleElementOffsetHeight = titleElement.offsetHeight;
      columnElement.animate({
        scrollTop: titleOffsetTop - containerOffsetTop - containerOffsetHeight + titleElementOffsetHeight
      });
      return;
    }
  }
}

let openStudentId;
function toggleStudent(divSelector) {
  let id = divSelector.id.toLowerCase();
  if (openStudentId) {
    $(`.student-index-mobile > #${openStudentId}.student`).animate({height: "toggle"});
  }
  if (openStudentId === id) {
    openStudentId = undefined;
    return;
  }
  openStudentId = id;
  $(`.student-index-mobile > #${id}.student`).animate({height: "toggle"});
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function hoverListenerRegister() {
  $(document).ready(function() {
    $('.student h1, .bio, .links, .header-item, .student-index > p, a').hover(
      function(event) {
        let colorIndex = getRandomInt(HoverColors.length);
        $(this).css('color', HoverColors[colorIndex]);
      },
      function(event) {
        $(this).css('color', 'black');
      }
    );
  });
}

function interfere() {
  for (const column in ColumnToStudentMap) {
    if (column === 'nine') continue;
    let studentIds = ColumnToStudentMap[column];
    let randomStart = getRandomInt(studentIds.length);
    let sortedStudentIds = studentIds.slice(randomStart) + studentIds.slice(0, randomStart);
    let sortedStudentDivs = $('.' + column).find('.student').sort((a, b) => {
      return sortedStudentIds.indexOf(a.id) - sortedStudentIds.indexOf(b.id);
    });
    let indexDivs =  $('.' + column).find('.student-index');
    let exhibitionDivs =  $('.' + column).find('.exhibition');
    let extraDivs =  $('.' + column).find('.extras');
    $('.' + column).find('.student').remove();
    $('.' + column).find('.student-index').remove();
    $('.' + column).find('.exhibition').remove();
    $('.' + column).find('.extras').remove();
    $('.' + column).append(sortedStudentDivs);
    $('.' + column).append(extraDivs);
    $('.' + column).append(indexDivs);
    $('.' + column).append(exhibitionDivs);
    let studentIndexContainer = $('.' + column + ' .student-index');
  
    // sort student indexes too
    let sortedStudentIndexItems = studentIndexContainer.find('p').sort((a, b) => {
      return sortedStudentIds.indexOf(a.id.toLowerCase()) - sortedStudentIds.indexOf(b.id.toLowerCase());
    });
    studentIndexContainer.find('p').remove();
    studentIndexContainer.append(sortedStudentIndexItems);
  }
  hoverListenerRegister();
}

if (!$('.nine').is(":visible")) {
  interfere();
}

hoverListenerRegister();
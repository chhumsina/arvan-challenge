import Vue from 'vue';

/**
 *
 */
Vue.filter('stripHtml', (value) => {
  if (!process.browser) {
    return;
  }
  if (!value) {
    return;
  }
  const div = document.createElement('div');
  div.innerHTML = value;
  return div.textContent || div.textContent || '';
});

/**
 *
 */
Vue.filter('truncate', (value, length = 100, ending) => {
  if (ending == null) {
    ending = '...';
  }
  if (!value) {
    return;
  }
  if (value.length > length) {
    return value.substring(0, length - ending.length) + ending;
  } else {
    return value;
  }
});

/**
 *
 */
Vue.filter('persianDate', (value, type) => {
  if (!value) {
    return value;
  }

  const calendarType = 'fa-persian';

  let exportDate = '';
  let originDate = value.toString().split(' ');
  let date = new Date();

  if (originDate && originDate.length !== 0) {
    originDate = originDate[0];
    date = new Date(originDate);
    date.toDateString();
    date.toGMTString();
  }

  const weekday = (opt) => {
    return date.toLocaleDateString(calendarType, { weekday: opt });
  };
  const month = (opt) => {
    return date.toLocaleDateString(calendarType, { month: opt });
  };
  const year = (opt) => {
    return date.toLocaleDateString(calendarType, { year: opt });
  };
  const day = (opt) => {
    return date.toLocaleDateString(calendarType, { day: opt });
  };
  const hour = () => {
    const output = date.toLocaleString(calendarType, { hour: '2-digit' });
    if (output.length <= 1) {
      return '۰' + output;
    }
    return output;
  };
  const minute = () => {
    const output = date.toLocaleString(calendarType, { minute: '2-digit' });
    if (output.length <= 1) {
      return '۰' + output;
    }
    return output;
  };

  switch (type) {
    case 'time':
      exportDate = `${hour()}:${minute()}`;
      break;
    case 'date':
      exportDate = `${weekday('long')} ${day('2-digit')} ${month('long')}`;
      break;
    case 'date-with-year':
      exportDate = `${weekday('long')} ${day('2-digit')} ${month('long')}‌ ${year('numeric')}`;
      break;
    case 'date-without-weekday':
      exportDate = `${day('2-digit')} ${month('long')}‌ ${year('numeric')}`;
      break;
    case 'combo':
      exportDate = `${weekday('long')} ${day('2-digit')} ${month('long')} ${hour()}:${minute()}`;
      break;
    case 'combo-with-year':
      exportDate = `${weekday('long')} ${day('2-digit')} ${month('long')}‌ ${year('numeric')} ${hour()}:${minute()}`;
      break;
    case 'slash-combo':
      exportDate = `${year('2-digit')}/${month('2-digit')}/${day('2-digit')} ${hour()}:${minute()}`;
      break;
    case 'slash':
      exportDate = `${year('2-digit')}/${month('2-digit')}/${day('2-digit')}`;
      break;
    default:
      exportDate = `${weekday('long')}، ${day('2-digit')} ${month('long')}‌ ${year('numeric')}`;
      break;
  }

  const regDate = new RegExp('\w*(ه‍.ش)');
  if (regDate.exec(exportDate)) {
    exportDate.replace('ه‍.ش.', '');
  }
  return exportDate;
});

/**
 *
 */
Vue.filter('number', (value) => {
  if (!value) {
    return;
  }

  if (Number(value) === value && value % 1 !== 0) {
    value = Number(value).toFixed(2);
  }
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

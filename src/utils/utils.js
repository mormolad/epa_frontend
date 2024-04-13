export function formatDate(date) {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const parts = date.split('-');
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parts[0];
  return `${day} ${months[month]} ${year}`;
}

export function calculatePercentage(finePoints, totalPoints) {
  return (finePoints / totalPoints) * 100;
}

export function formPointsText(points) {
  const lastDigit = points % 10;
  const lastTwoDigits = points % 100;

  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return 'баллов';
  } else if (lastDigit === 1) {
    return 'балл';
  } else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
    return 'балла';
  } else {
    return 'баллов';
  }
}

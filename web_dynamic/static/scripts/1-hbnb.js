$(document).ready(function () {
const checked_amenities = {};
$('INPUT[type="checkbox"]').click(function () {
  if ($(this).prop('checked') === true) {
    checked_amenities[$(this).data-name] = $(this).data-id;
  } else {
    delete checked_amenities[$(this).data-name];
  }
  const s = '';
  for (const key in checked_amenities) {
    if (s !== '') s += ', ';
    s += checked_amenities[key];
  }
  $('h4').text(s);
});
});

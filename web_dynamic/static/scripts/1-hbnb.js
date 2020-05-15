$(document).ready(function () {
  const ca = {};
  const name = [];
  $('INPUT[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      ca[$(this).attr('data-name')] = $(this).attr('data-id');
      name.push($(this).attr('data-name'));
    } else {
      delete ca[$(this).attr('data-name')];
      name.splice(name.indexOf($(this).attr('data-name')), 1);
    }
    $('DIV.amenities h4').text(name.join(', '));
  });
});

$(document).ready(function () {
  const a_ids = [];
  const a_name = [];
  const s_ids = [];
  const s_name = [];
  const c_ids = [];
  const c_name = [];
  $('INPUT[type="checkbox"]').click(function () {
    if($(this).hasClass("a")) {
    if ($(this).prop('checked') === true) {
      a_ids.push($(this).attr('data-id'));
      a_name.push($(this).attr('data-name'));
    } else {
      a_ids.splice(a_ids.indexOf($(this).attr('data-id')), 1);
      a_name.splice(a_name.indexOf($(this).attr('data-name')), 1);
    }
    $('DIV.amenities h4').text(a_name.join(', '));
    }
    if($(this).hasClass("s")) {
    if ($(this).prop('checked') === true) {
      s_ids.push($(this).attr('data-id'));
      s_name.push($(this).attr('data-name'));
    } else {
      s_ids.splice(s_ids.indexOf($(this).attr('data-id')), 1);
      s_name.splice(s_name.indexOf($(this).attr('data-name')), 1);
    }
    const s_c = s_name.concat(c_name);
    $('DIV.locations h4').text(s_c.join(', '));
    }
    if($(this).hasClass("c")) {
    if ($(this).prop('checked') === true) {
      c_ids.push($(this).attr('data-id'));
      c_name.push($(this).attr('data-name'));
    } else {
      c_ids.splice(c_ids.indexOf($(this).attr('data-id')), 1);
      c_name.splice(c_name.indexOf($(this).attr('data-name')), 1);
    }
    const c_s = c_name.concat(s_name);
    $('DIV.locations h4').text(c_s.join(', '));
    }
 });
const url = 'http://0.0.0.0:5001/api/v1/status/';
$.getJSON(url, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
        $('DIV#api_status').removeClass('available');
    }
    });

function deliver_places (data) {
  for (let i = 0; i < data.length; i++) {
    const name = '<h2>' + data[i].name + '</h2>';
    const price_by_night = '<div class="price_by_night">' + data[i].price_by_night + '</div>';
    const title_box = '<div class="title_box">' + name + price_by_night + '</div>';
    let g = ' Guests';
    let b = ' Bedrooms';
    let th = ' Bathrooms';
    if (data[i].max_guest === 1) g = ' Guest';
    const guest = '<div class="max_guest">' + data[i].max_guest + g + '</div>';
    if (data[i].number_rooms === 1) b = ' Bedroom';
    const rooms = '<div class="number_rooms">' + data[i].number_rooms + b + '</div>';
    if (data[i].number_bathrooms === 1) th = ' Bathroom';
    const bathrooms = '<div class="number_bathrooms">' + data[i].number_bathrooms + th + '</div>';
    const ThreeD = guest + rooms + bathrooms;
    const info = '<div class="information">' + ThreeD + '</div>';
    let d = 'safe';
    if (data[i].description !== d) d = 'None';
    const description = '<div class="description">' + d + '</div>';
    const article = '<article>' + title_box + info + description + '</article>';
    $('section.places').html(article);
  }
}
$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST',
  data: '{}',
  contentType: 'application/json',
  success: function (data) {
  deliver_places(data);
    }
  });
let d = {};
$('button').click(function () {
d = {'amenities': a_ids, 'states': s_ids, 'cities': c_ids};
$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST',
  data: JSON.stringify(d),
  contentType: 'application/json',
  success: function (data) {
  $('section.places').html('');
  deliver_places(data);
  }
  });
});
});

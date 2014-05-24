var util = require('util'),
    request = require('request'),
    parser = require('xml2json'),
    calendar_id = '6fdnlo554822i949rj44aqafik@group.calendar.google.com',
    api_key = 'AIzaSyBQal2rNhP5SRkU5hZytY7Yb8nYc5Q1nrc',
    url = util.format('https://www.googleapis.com/calendar/v3/calendars/%s/events?maxResults=2500&key=%s', calendar_id, api_key);

request({url: url}, function(error, response, json){
  console.log(json);
  var data = JSON.parse(json),
      transformed = data.items.map(function(event){
        return {
          id: event.id,
          title: event.summary || '忙碌',
          start: event.start.dateTime,
          end: event.end.dateTime
        };
      });
  // console.log(JSON.stringify(transformed));
});

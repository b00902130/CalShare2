'use strict';

angular.module('calenshareApp')
.factory('ColorGenerator', function () {
  // 追加到40種顏色, 應該可以擋一陣?!
  var colors = [].concat(d3.scale.category10().range())
                 .concat(d3.scale.category20().range())
                 .concat(d3.scale.category20b().range())
                 .concat(d3.scale.category20c().range()),
      cnt = 0;
  return {
    generate: function(){
      return colors[cnt++ % 40];
    }
  };
});

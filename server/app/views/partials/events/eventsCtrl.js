angular.module('app').controller('eventsCtrl', function($scope) {
        this.tiles = buildGridModel({
            title: "Event Title",
            background: ""
        });
        function buildGridModel(tileTmpl){
            var it, results = [ ];
            for (var j=0; j<9; j++) {
                it = angular.extend({},tileTmpl);
                it.title = it.title;
                it.span  = { row : 1, col : 1 };
                switch(j+1) {
                    case 1:
                        it.background = "red";
                        it.span.row = it.span.col = 2;
                        break;
                }
                results.push(it);
            }
            return results;
        }
    });

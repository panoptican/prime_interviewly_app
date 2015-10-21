
/*
 Events controller
  */
app.controller('eventsCtrl', function($scope) {
        this.tiles = buildGridModel({
            title: "Event Title",
            background: ""
        });
        function buildGridModel(tileTmpl){
            var it, results = [ ];
                it = angular.extend({},tileTmpl);
                it.title = it.title;
                it.span  = { row : 1, col : 1 };
                it.background = "gray";
                it.span.row = it.span.col = 1;

                results.push(it);

            return results;
        }
    });

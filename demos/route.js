lolfun.register = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };

lolfun.asyncjs = function (js) {
    return ["$q", "$route", "$rootScope", function ($q, $route, $rootScope) {
        var deferred = $q.defer();
        var dependencies = angular.copy(js);
        if (Array.isArray(dependencies)) {
            for (var i = 0; i < dependencies.length; i++) {
                dependencies[i] += "?v=" + v;
            }
        } else {
            dependencies += "?v=" + v;//v是版本号
        }
        $script(dependencies, function () {
            $rootScope.$apply(function () {
                deferred.resolve();
            });
        });
        return deferred.promise;
    }];
}

.when('/:plugin', {
        templateUrl: function(rd) {
            return 'page/' + rd.plugin + '.html';
          },

        resolve: {
            load: function($q, $route, $rootScope) {

              var deferred = $q.defer();

              var dependencies = [
                'controllers/' + $route.current.params.plugin + 'Controller.js'
              ];

              $script(dependencies, function () {
                $rootScope.$apply(function() {
                  deferred.resolve();
                });
              });

            return deferred.promise;
            }
        }
    })
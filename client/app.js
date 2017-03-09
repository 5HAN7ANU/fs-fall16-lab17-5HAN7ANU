var app = angular.module('ReturnOfTheChirps', ['ngRoute']);

app.controller('WelcomeController', ['$scope', function($scope){
    
}]);

app.controller('ListController', ['$scope', '$http', function($scope, $http){
    $http.get('http://localhost:3000/api/users')
    .then (function(response){
        console.log('users acquired!');
        console.log(response);
        $scope.users = response.data;
    }, console.log);

    function getChirps(){
        $http.get('http://localhost:3000/api/chirps')
        .then(function(response){
            console.log('chirps acquired!');
            console.log(response);
            $scope.chirps = response.data;
        }, console.log);
    }

    getChirps();

    $scope.selectedUserId = '';
    $scope.chirpMessage = '';

    $scope.submitChirp = function(){
        var chirp = {
            message: $scope.chirpMessage,
            user: $scope.selectedUserId
        }

        $http({
            method: 'POST',
            url: 'http://localhost3000/api/chirps',
            data: chirp
        }).then(function(success){
            getChirps();
        }, console.log);
    }
}]);

app.controller('SingleChirpController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location)
{ 
    var id = $routeParams.id;

    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/chirps/' + $routeParams.id
    }).then(function(success){
        $scope.chirp = success.data;
    }, console.log);

    $scope.goToUpdate = function(){
        $location.path('/chirps/' + id + '/update');
    }

    $scope.promptDelete = function(){
        var shouldDelete = confirm('Are you sure you want to delete this chirp?');
        if(shouldDelete){
            $http({
                method: 'DELETE',
                url: 'http://localhost:3000/api/chirps/' + id
            }).then(function(success){
                $location.path('/chirps');
            }, console.log);
        }
    }
}]);

app.controller('UpdateSingleController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
    var id = $routeParams.id;
    $http({
        method: 'GET',
        url: 'http://localhost:3000/api/chirps/' + id
    }).then(function(success){
        $scope.chirp = success.data;
    });

    $scope.update = function(){
        var chirpUpdate = {
            message: $scope.chirp.message
        }
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/api/chirps/' + id,
            data: chirpUpdate
        }).then(function(success){
            $location.path('/chirps');
        }, console.log);
    }
}])

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: '/welcome.html',
        controller: 'WelcomeController'
    })
    .when('/chirps', {
        templateUrl: '/list.html',
        controller: 'ListController'
    })
    .when('/chirps/:id/update', {
        templateUrl: '/single_update.html',
        controller: 'UpdateSingleController'
    })
    .when('/chirps/:id', {
        templateUrl: '/single_view.html',
        controller: 'SingleChirpController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);






































// app.factory('Chirp', ['$resource', function($resource){
//     var r = $resource('http://localhost:3000/api/chirps/:id', { id: '@id' }, {
//         'update': { method: 'PUT'}
//     });
//     return r;
// }]);

// app.factory('Users', ['$resource', function($resource){
//     var r = $resource('http://localhost:3000/api/users');
//     return r;
// }])











// var app = angular.module('ReturnOfTheChirps', ['ngResource']);

// app.factory('Chirp', ['$resource', function($resource){
//     var r = $resource('http://localhost:3000/api/chirps/:id', { id: '@id'}, {
//         'update': { method: 'PUT'}
//     });
//     return r;
// }]);


// app.controller('WelcomeController', ['$scope', function($scope){

// }]);

// app.config(['$routeProvider', function($routeProvider){
//     $routeProvider
//     .when('/', {
//         templateUrl: '/welcome.html',
//         controller: 'WelcomeController'
//     })
// //     .when('/chirps', {
// //         templateUrl: '/list.html',
// //         controller: 'ListController'
// //     })
// //     .otherwise({
// //         redirectTo: '/'
// //     });
// }]);

    // $.ajax({
    //     method: 'GET',
    //     url: 'http://localhost:3000/api/users',
    //     contentType: 'application/json'
    // }).then(function(data){
    //     console.log('users acquired!');
    //     $scope.users = data;
    // });

    // $.ajax({
    //     method: 'GET',
    //     url: 'http://localhost:3000/api/chirps',
    //     contentType: 'application/json'
    // }).then(function(data){
    //     console.log('chirps acquired!');
    //     $scope.chirps = data;
    // }); 
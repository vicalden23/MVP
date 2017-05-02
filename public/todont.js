angular.module('todo')
  .controller('todontCtrl', function($scope, $http, $window) {
    $scope.myTodonts = [];
    $scope.responses = ['I love you!', 'You are amazing!', 'Great job, champ!', 'You are one impressive human being.', 'You\'re the best!'];

    $http({
      method: 'GET',
      url: 'http://127.0.0.1:2023/todont',
      headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }).then(function successCallback(response) {
      for (var i = 0; i < response.data.length; i++) {
        $scope.myTodonts.push(response.data[i].task);
      }
    }, function errorCallback(response) {
      console.log(response);
    });

    $scope.addTodont = function(newTodont) {
      var req = {
        method: 'POST',
        url: 'http://127.0.0.1:2023/todont',
        headers: {'Content-Type':'application/json'},
        data: {task: $scope.newTodont}
      }
      $http(req).then(function(res) {
        $scope.myTodonts.push(res.data.task);
        $scope.newTodont = '';
      }), function(err) {
        $scope.newTodont = '';
        console.log(err);
      }
    };

    $scope.removeMessages = function() {
      $window.location.reload();
    };

    $scope.shuffle = function(array) {
      if(!array) {
        array = $scope.myTodonts;
      }
      var currentIndex = array.length, temporaryValue, randomIndex;
      while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

  })
  .directive('todontList', function($http) {
    return {
      scope: {
        todonts: '<',
        messages: '<'
      },
      restrict: 'E',
      controllerAs: 'props',
      bindToController: true,
      controller: function() {
        this.removeTodont = function(index) {
          $http({
            method: 'DELETE',
            url: 'http://127.0.0.1:2023/todont',
            headers: {'Content-Type':'application/json'},
            data: {task: this.todonts[index]}
          })
          .then(function(response) {
            console.log("REMOVED TODONT")
          }), function(rejection) {
            console.log(rejection.data)
          }
          var generateRandomNumber = Math.floor(Math.random() * this.messages.length);
          this.todonts.splice(index, 1, this.messages[generateRandomNumber]);
       }
      },
      template: `
        <ul>
          <li
            ng-click="props.removeTodont($index)"
            ng-repeat="todont in props.todonts track by $index">
            {{todont}}
          </li>
        </ul
      `
    }
  })
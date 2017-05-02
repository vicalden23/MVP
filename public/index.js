angular.module('todo', [])
  .controller('todoCtrl', function($scope, $http, $window) {
    $scope.myTodos = [];
    $scope.responses = ['I love you!', 'You are amazing!', 'Great job, champ!', 'You are one impressive human being.', 'You\'re the best!'];

    $http({
      method: 'GET',
      url: 'http://127.0.0.1:2023/list',
      headers: {'Content-Type':'application/x-www-form-urlencoded'}
    }).then(function successCallback(response) {
      for (var i = 0; i < response.data.length; i++) {
        $scope.myTodos.push(response.data[i].task);
      }
    }, function errorCallback(response) {
      console.log(response);
    });

    $scope.addTodo = function(newTodo) {
      var req = {
        method: 'POST',
        url: 'http://127.0.0.1:2023/list',
        headers: {'Content-Type':'application/json'},
        data: {task: $scope.newTodo}
      }
      $http(req).then(function(res) {
        $scope.myTodos.push(res.data.task);
        $scope.newTodo = '';
      }), function(err) {
        $scope.newTodo = '';
        console.log(err);
      }
    };

    $scope.removeMessages = function() {
      $window.location.reload();
    };

    $scope.shuffle = function(array) {
      if(!array) {
        array = $scope.myTodos;
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

    // $scope.removeFromList = function(index) {
    // }
    //take remove todo out of the controller and add a second parameter $mytodos[index]

  })
  .directive('todoList', function($http) {
    return {
      scope: {
        todos: '<',
        messages: '<'
      },
      restrict: 'E',
      controllerAs: 'props',
      bindToController: true,
      controller: function() {
        this.removeTodo = function(index) {
          $http({
            method: 'DELETE',
            url: 'http://127.0.0.1:2023/list',
            headers: {'Content-Type':'application/json'},
            data: {task: this.todos[index]}
          })
          .then(function(response) {
            console.log("REMOVED TODO")
          }), function(rejection) {
            console.log(rejection.data)
          }
          var generateRandomNumber = Math.floor(Math.random() * this.messages.length);
          this.todos.splice(index, 1, this.messages[generateRandomNumber]);
       }
      },
      template: `
        <div class="list">
          <ul>
            <li
              ng-click="props.removeTodo($index)"
              ng-repeat="todo in props.todos track by $index">
              {{todo}}
            </li>
          </ul
        </div>
      `
    }
  })
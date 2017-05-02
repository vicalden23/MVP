angular.module('todo', [])
  .controller('todoCtrl', function($scope, $http) {
    $scope.myTodos = [];

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
    }

    // $scope.removeFromList = function(index) {
    // }
    //take remove todo out of the controller and add a second parameter $mytodos[index]

  })
  .directive('todoList', function($http) {
    return {
      scope: {
        todos: '<'
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
        this.todos.splice(index, 1);
        }
      },
      template: `
        <ul>
          <li
            ng-click="props.removeTodo($index)"
            ng-repeat="todo in props.todos track by $index">
            {{todo}}
          </li>
        </ul
      `
    }
  })
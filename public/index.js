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

    $scope.removeTodo = function(todo) {
      $http({
        method: 'DELETE',
        url: 'http://127.0.0.1:2023/list',
        headers: {'Content-Type':'application/json'},
        data: {task: todo}
      })
    }
  })
  .directive('todoList', function() {
    return {
      scope: {
        todos: '<'
      },
      restrict: 'E',
      controllerAs: 'props',
      bindToController: true,
      controller: function() {
      },
      template: `
        <ul>
          <li ng-repeat="todo in props.todos track by $index">
            {{todo}}
          </li>
        </ul
      `
    }
  })
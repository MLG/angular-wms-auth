'use strict';

angular.module('mlgWmsAuth', [])
  .service('Auth', function Auth($http) {
    var Model = {
      authenticate: function (init_path, auth_path) {
        $http.get(init_path)
          .success(function (response) {
            if (!angular.isUndefined(response.session_user_name)) {
              Model.session = {user_name: response.session_user_name};
              Model.is_authenticated = true;
              Model.employee_id = response.employee_id
            }
          })
          .error(function (data, status, headers) {
            if (status === 0 || (status > 299 && status < 500)) {
              window.location.href = (headers('Location') || auth_path);
            }
          });
      },
      session: {},
      employee_id: null,
      is_authenticated: false
    };
    return Model;
  })
  .directive('wmsAuthRequest', function () {
    return {
      restrict: 'AEC',
      scope:{
        authPath: '@',
        initPath: '@'
      },
      controller: function ($scope, Auth) {
        Auth.authenticate($scope.initPath, $scope.authPath);
      }
    }
  });
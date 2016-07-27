myApp.factory('usersFactory', function($http) {
  var usersFactory = function(){
    this.login = function(data,callback,errback){
      $http.post('/login',data).then(callback,errback);
    }
    this.index = function(callback){
      $http.get('/').then(callback);
    }
    this.register = function(data,callback,errback){
      $http.post('/register',data).then(callback,errback);
    }

  }
  return new usersFactory;
});

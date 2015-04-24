var app = angular.module('marvel',['ui.router']);

app.config(function($stateProvider) {
	$stateProvider
		.state('index', {
			url: '',
			controller: 'MainCtrl',
			templateUrl: 'js/templates/mainTemplate.html'
		})
		.state('creator', {
			url: '/creator/:id',
			controller: 'CreatorCtrl',
			templateUrl: 'js/templates/creatorTemplate.html'
		})
		.state('character', {
			url: '/character/:id',
			controller: 'CharacterCtrl',
			templateUrl: 'js/templates/characterTemplate.html',
		})
		.state('character.detail', {
			url: '',
			views: {
				"detail": {
					templateUrl: 'js/templates/charTemplate.html'
				}
			}
		})
		.state('event', {
			url: '/event/:id',
			controller: 'EventCtrl',
			templateUrl: 'js/templates/eventTemplate.html'
		});
});


app.controller('MainCtrl', function($scope,dataFactory) {

	dataFactory.getCharacters().then(function(data) {
		$scope.characters = data.data.results;
	});

	dataFactory.getCreators().then(function(data) {
		$scope.creators = data.data.results;
	});

	dataFactory.getEvents().then(function(data) {
		$scope.events = data.data.results;
	});
});

app.controller('CreatorCtrl', function($scope,dataFactory,$stateParams) {
	$scope.loading = true;
	dataFactory.getCreator($stateParams.id).then(function(data) {
		$scope.loading = false;
		$scope.creator = data.data.results[0];
	});
});

app.controller('CharacterCtrl', function($scope,dataFactory,$stateParams, $state) {
	$scope.loading = true;

	dataFactory.getCharacter($stateParams.id).then(function(data) {
		$scope.loading = false;
		$scope.character = data.data.results[0];
		console.log($scope.character);
		$state.go('character.detail');
	});
});

app.controller('EventCtrl', function($scope,dataFactory,$stateParams) {
	$scope.loading = true;
	dataFactory.getEvent($stateParams.id).then(function(data) {
		$scope.loading = false;
		$scope.event = data.data.results[0];
	});
});

app.factory('dataFactory', function($http,$q) {
	var publicKey = '?apikey=f1da2ae2dc487b462dc04513dea9eac1';
	var baseUrl = 'http://gateway.marvel.com/v1/';
	return {
		getCharacters: function() {
			var def = $q.defer();

			$http.get(baseUrl + 'public/characters' + publicKey)
				.success(def.resolve)
				.error(def.reject)

			return def.promise;
		},
		getCharacter: function(id) {
			var def = $q.defer();

			$http.get(baseUrl + 'public/characters/' + id + publicKey)
				.success(def.resolve)
				.error(def.reject);

			return def.promise;
		},
		getCreators: function() {
			var def = $q.defer();

			$http.get(baseUrl + 'public/creators' + publicKey)
				.success(def.resolve)
				.error(def.reject);

			return def.promise;
		},
		getCreator: function(id) {
			var def = $q.defer();

			$http.get(baseUrl + 'public/creators/'+ id + publicKey)
				.success(def.resolve)
				.error(def.reject);

			return def.promise;
		},
		getEvents: function() {
			var def = $q.defer();

			$http.get(baseUrl + 'public/events'+ publicKey)
				.success(def.resolve)
				.error(def.reject);

			return def.promise;
		},
		getEvent: function(id) {
			var def = $q.defer();

			$http.get(baseUrl + 'public/events/' + id + publicKey)
				.success(def.resolve)
				.error(def.reject);

			return def.promise;
		}
	};
});
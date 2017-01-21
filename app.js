var myApp = angular.module('helloworld', ['ui.router']);


//CONGFIG
myApp.config(function($stateProvider) {

	var helloState = {

		name: 'hello',
		url: '/hello',
		component: 'test'
	
	}


	var aboutState = {

		name: 'about',
		url: '/about',
		template: '<h3> About <h3>'

	}

	var peopleState = {

		name: 'people',
		url: '/people',
		component: 'people',
		resolve: {
			people: function(myService){
				return myService.getAllPeople()
			}
		}
	}



	var personState = {

		name: 'person',
		url: '/people/{personId}',
		component: 'person',
		resolve: {

			person: function(myService, $transition$){
					console.log(myService.getPerson($transition$.params().personId).id);

					return myService.getPerson($transition$.params().personId);
			
			}
		}
	}



	$stateProvider.state(helloState);
	$stateProvider.state(aboutState);
	$stateProvider.state(peopleState);
	$stateProvider.state(personState);
})



//COMPONENTS

myApp.component('test', {
  template:  '<h3>{{$ctrl.greeting}} Solar System!</h3>' +
             '<button ng-click="$ctrl.toggleGreeting()">toggle greeting</button>',
           
  controller: function() {
    this.greeting = 'hello';
  	console.log(this.greeting);
    this.toggleGreeting = function() {
      this.greeting = (this.greeting == 'hello') ? 'whats up' : 'hello'
    }
  }
})

myApp.component('people', {
	bindings: {people: '<'},

	template:'<h3>Some people:</h3>' +
            '<ul>' +
            '  <li ng-repeat="person in $ctrl.people">' +
            '    <a ui-sref="person({ personId: person.id })">' +
            '      {{person.name}}<br>' +
            '      {{person.id}}' +
            '    </a>' +
            '  </li>' +
            '</ul>'

})

myApp.component('person', {

	bindings: {person: '<'},

	template: '<h3> {{ $ctrl.person.id }} </h3>'
})

//SERVICES

myApp.service('myService', function(){
	
	var self = this;

    self.people = [
    
	        {        
	            id: '0',
	            name: 'John Doe',
	            address: '91 Ash Str.',
	            city: 'Waltham',
	            state: 'MA',
	            zip: '11111'
	        },
	        {       
	        	id: '1',
	            name: 'Marc Doe',
	            address: '91 Ash Str.',
	            city: 'New York',
	            state: 'NY',
	            zip: '22222'
	        },    
	        {
	        	id: '2',        
	            name: 'Marc Burt',
	            address: '91 Ash Str.',
	            city: 'Chicago',
	            state: 'IL',
	            zip: '33333'
	        }       
    ]

    self.getAllPeople = function(){

    	return self.people;

    }

    self.getPerson = function(person) {
    	
    		console.log (self.people[person])
    		return self.people[person];
    
    }



})
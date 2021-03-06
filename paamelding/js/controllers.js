'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('Registrer', ['$scope', '$http', function($scope, $http) {

$scope.registrationIsOpen = false;
var registrationIsOpenUrl = '../backend/get/registrationisopen.php';
$http.get(registrationIsOpenUrl).success(function(data) {
	$scope.registrationIsOpen = JSON.parse(data);
}).error(function(data) {
	$scope.showfeedback = true;
	$scope.enFeilHarSkjedd = true;
});


$scope.showfeedback = false;
$scope.participant = {}; 
$scope.participant.isFormerMember = false;

$scope.numberOfCourses = 1;
$scope.maxNumberOfCourses = 3;

$scope.fillInPartnerId = [false, false, false];

$scope.roles = [{english: "Follow", displayText: "Følger"}, {english: "Lead", displayText: "Fører"}];

var getCoursesUrl = '../backend/get/getcourses.php';
$http.get(getCoursesUrl).success(function(data){
	$scope.courses = data;

	$scope.chosenCourses = [];
	for (var j = 0; j < $scope.maxNumberOfCourses; j++) { 
		$scope.chosenCourses[j] = {courseInfo: $scope.courses[0], 
								   priority:j+1, 
								   role:"Follow", 
								   partnerName:"", 
							  	   hasPartner: false};
	}

}).error();



function removeUnnessesaryCourseInformation(chosenCourse) {
	var tmpChosenCourse = angular.copy(chosenCourse);
	var courseId = tmpChosenCourse.courseInfo.id;

	delete tmpChosenCourse.courseInfo;
	tmpChosenCourse.courseId = courseId;
	return tmpChosenCourse;
}

$scope.registrerParticipant = function(participant) {

	$scope.participant.courses = [];
	for(var i=0; i<$scope.numberOfCourses; i++) {
		var chosenCourseInfoToBeSent = removeUnnessesaryCourseInformation($scope.chosenCourses[i]);
		$scope.participant.courses[i] = chosenCourseInfoToBeSent;
	}


	var url = "../backend/modify/register.php";


	$http.post(url, participant).
		success(function(data){
			$scope.showfeedback = true;
			$scope.feedback = data;
			$scope.enFeilHarSkjedd = false;

		}).
		error(function(data){
			$scope.showfeedback = true;
			$scope.feedback = data;
			$scope.enFeilHarSkjedd = true;
	});

};

$scope.updateHasPartner = function(i) {
	$scope.fillInPartnerId[i] = $scope.chosenCourses[i].hasPartner;
};

$scope.updateHasPartnerFirstChoice = function() {
	$scope.fillInPartnerId.firstChoice = $scope.firstChoiceCourse.hasPartner;
};

$scope.updateHasPartnerSecondChoice = function() {
	$scope.fillInPartnerId.secondChoice = $scope.secondChoiceCourse.hasPartner;
};

$scope.updateHasPartnerThirdChoice = function() {
	$scope.fillInPartnerId.thirdChoice = $scope.thirdChoiceCourse.hasPartner;
};

$scope.addOneMoreCourse = function() {
	$scope.numberOfCourses++;
};
$scope.removeOneCourse = function() {
	$scope.numberOfCourses--;
};

  	

  }])
  .controller('MyCtrl2', ['$scope', function($scope) {

  }]);

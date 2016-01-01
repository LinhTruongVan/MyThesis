﻿'use strict';

angular.module('progress.bar', [])
	.directive('ngProgressbar', function ($timeout) {
	    return {

	        restrict: 'E',
	        template: "<div class='progress'><div class='progress-bar progress-bar-{{type}} progress-bar-striped' role='progressbar' style='width:{{percent_complete}}%;'>{{current}} / {{max}} Thời gian mô phỏng</div></div>",
	        replace: true,
	        scope: {
	            max: '@',
	            start: '@',
	            type: '@',
	            onStop: '&'
	        },

	        controller: ['$scope', '$timeout', function ($scope, $timeout) {
	            $scope.onTimeout = function () {
	                $scope.startAt++;
	                $scope.current = $scope.startAt;
	                $scope.mytimeout = $timeout($scope.onTimeout, 1000);
	                if ($scope.startAt >= $scope.max) {
	                    $scope.stop();
	                    $scope.onStop();
	                }
	                $scope.percent_complete = Number(100 * $scope.current / $scope.max);
	            }

	            $scope.stop = function () {
	                $timeout.cancel($scope.mytimeout);
	            }
	        }],

	        link: function (scope, elem, attrs, ctrl) {

	            attrs.$observe('start', function (value) {
	                if (value === 'true') {
	                    scope.startAt = 0;
	                    scope.mytimeout = $timeout(scope.onTimeout, 400);
	                } else if (value === 'false') {
	                    scope.stop();
	                }
	            });
	        }
	    }
	});
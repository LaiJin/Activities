/**
 * Created with JetBrains RubyMine.
 * User: xyooyy
 * Date: 14-1-2
 * Time: 下午2:23
 * To change this template use File | Settings | File Templates.
 */
function CreateActivityController($scope, $navigate, $http) {

    $scope.jump_to_activity_list_view = function() {

        $navigate.go('/activity_list_view', 'slide')
    }

//    $scope.input_activity_name = " ";

    $scope.jump_to_activity_sign_up_view = function() {

        $navigate.go('/activity_sign_up_view', 'slide')

//        if($scope.input_activity_name != "") {

//           $scope
//        }

    }

}
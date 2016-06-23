(function () {
    function LoginCtrl(User, $scope, $rootScope, $location, $mdToast) {
        $rootScope.currentPageTitle = "Login";
        var vm = this;
        if($rootScope.currentUser) {
            $location.url('/profile');
        }
        vm.user = {
            username: '',
            password: ''
        }

        vm.login = login;

        function login() {
            User
                .login(vm.user)
                .then(
                    function (response) {
                        $location.url('/profile');
                    },
                    function (error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Could not log in. Error: ' + error.data.message)
                                .hideDelay(3000)
                        );
                    }
                );
        }
    }

    angular.module('Arcus')
        .controller('LoginCtrl', ['User', '$scope', '$rootScope', '$location', '$mdToast', LoginCtrl])
})
();
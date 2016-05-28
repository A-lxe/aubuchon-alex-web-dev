(function() {
    var MenuCtrl = function () {
        var originatorEv;
        this.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        }
    };

    angular.module("App")
        .controller('MenuCtrl', MenuCtrl);
})();
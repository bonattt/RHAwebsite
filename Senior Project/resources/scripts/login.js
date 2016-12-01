$(document).ready(function () {
    const registryToken = "c8950f98-0c9c-485a-b0af-754208d11d08";
    $("#login-button").click(function () {
        console.log("clicking button :)");
        Rosefire.signIn(registryToken, function (error, rosefireUser) {
            if (error) {
                console.log("Error communicating with Rosefire", error);
                return;
            }
            //window.location.replace('/homepage.html?authorization=' + rosefireUser.token);
            var userData = JSON.stringify(rosefireUser);
            sessionStorage.setItem("userData", userData);
            location.reload();
            // $.ajax({
            //     url: "http://localhost:8000/foobar",
            //     type: 'POST',
            //     data: rosefireUser,
            //     dataType: 'JSON',
            //     success: function (data) {
            //         if(data) {
            //             var userData = JSON.stringify(data);
            //             sessionStorage.setItem("userData", userData);
            //             window.location.href = "./home.html";
            //             return false;
            //         } else {
            //             console.log('could not be verify rosefire');
            //         }
            //     },
            //     error: function (request, status, error) {
            //         console.log(error, status, request);
            //     }
            // });
            return;
        })
    });
});
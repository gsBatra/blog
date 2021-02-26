$(document).ready(function() {
    var num_results;
    $('#submitResults').click(function() {
        num_results = $('#num').val();
        $('#num').val('');
        $('.posts').empty();
        fetchPosts();
        return false;
    });

    $(".posts").on('click','.card', function() {
        let id = $(this).attr('id');
        $('.num_posts').hide();
        $('.posts').hide();
        $('.comments').empty();
        $('.comments_heading').show();
        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/posts/'+id+'/comments',
            type: "GET",
            datatype: "json",
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                console.log(response);
                for(let i = 0; i < response.length; i++){
                    let comment = `<div class="card">
                                <div class="card-header">
                                    <h4>${response[i].name}</h4>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">${response[i].email}</p>
                                    <p class="card-text">${response[i].body}</p>
                                </div>
                            </div>
                            <br>`;
                    $("#comments").append(comment);
                }
            }
        });
        return false;
    });

    $('.goback').click(function() {
        $('.num_posts').show();
        $('.comments_heading').hide();
        $('.posts').show();
        $('.comments').empty();
    });

    function fetchPosts() {
        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/posts',
            type: "GET",
            datatype: "json",
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                for(let i = 1; i <= num_results; i++){
                    let post = `<div id=${i} class="card">
                                <div class="card-header">
                                    <h4>${response[i-1].title}</h4>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">${response[i-1].body}</p>
                                    <div class="text-center">
                                        <a href="#" class="btn btn-primary">View Post</a>
                                    </div>
                                </div>
                            </div>
                            <br>`;
                    $("#posts").append(post);
                }
            }
        })
    }
    return false;
});
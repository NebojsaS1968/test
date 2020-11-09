$(document).ready(() => {
    // delete one film
    $('#deleteOne').on('click', (e) => {
        target = $(e.target);
        const id = target.attr('dataId');
        $.ajax({
            type: 'DELETE',
            url: '/api/v1/filmovi/' + id,
            success: (res) => {
                alert("Film deleted.");
                window.location.href = '/api/v1/filmovi';
            }, 
            error: (err) => {
                console.log(err)
            }
        })
    })

    // delete all films
    $('#deleteAll').on('click', (e) => {
        $.ajax({
            type: 'DELETE',
            url: '/api/v1/filmovi',
            success: (res) => {
                alert("All films deleted!");
                window.location.href = '/api/v1/filmovi';
            },
            error: (err) => {
                console.log(err)
            }
        })
    })
})
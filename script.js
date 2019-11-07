// change nav color on scroll
// https://stackoverflow.com/questions/23706003/changing-nav-bar-color-after-scrolling
$(document).ready(function () {
    var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();
    $(document).scroll(function () {
        scroll_start = $(this).scrollTop();
        if (scroll_start > offset.top) {
            $('#navbar').css('background-color', '#000000');
        } else {
            $('#navbar').css('background-color', 'transparent');
        }
    });
});
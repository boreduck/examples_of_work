$(document).ready(function(){
    $('.nav_link').click(function (){
        let text = $(this).text()
        let pageRef
        switch (text) {
            case 'Me' : pageRef = 'main.html'; break;
            case 'About' : pageRef = '../html/about.html'; break;
            case 'Images' : pageRef = 'images.html'; break;
            case 'Contacts' : pageRef = 'contacts.html'; break;
            case 'Students' :
                let url = "get_students";
                $('#students').load(url);
                pageRef = 'students.html';
                break;
            default: pageRef = 'main.html'; break;
        }
        if(text !== 'Me'){
            $('#header').addClass('fixed')
            $('#content').removeClass('main_page')
        }
        else{
            $('#header').removeClass('fixed')
            if(!$('#content').hasClass('main_page'))
                $('#content').addClass('main_page')
        }
        $('#content').load(pageRef, '', function () {
            $('#content').show()
        })
        return false
    })
})

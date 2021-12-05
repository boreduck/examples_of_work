let sort_asc = [false, false, false, false, false, false, false, false]

$(document).on('keyup', '.search', function () {
  var input_sur = $('#search_surname').val().toUpperCase(),
      input_name = $('#search_name').val().toUpperCase(),
      input_pat = $('#search_patronymic').val().toUpperCase()

  $("table tr").each(function(index) {
    if (index != 0) {

      $row = $(this);

      let td_sur = $row.find("td:eq(1)").text().toUpperCase(),
          td_name = $row.find("td:eq(2)").text().toUpperCase(),
          td_pat = $row.find("td:eq(3)").text().toUpperCase()

      if ((td_sur.indexOf(input_sur) == 0 || input_sur == "") &&
          (td_name.indexOf(input_name) == 0 || input_name == "") &&
          (td_pat.indexOf(input_pat) == 0 || input_pat == "")) {
        $(this).show();
      }
    else{
        $(this).hide();
      }
    }
  });
});


function sortTable(eq) {
  let asc   = !sort_asc[eq],
      tbody =  $('#students > tbody')

  tbody.find('tr:has(td)').sort(function(a, b) {
    if (asc) {
      return $(`td:eq(${eq})`, a).text().localeCompare($(`td:eq(${eq})`, b).text())
    } else {
      return $(`td:eq(${eq})`, b).text().localeCompare($(`td:eq(${eq})`, a).text())
    }
  }).appendTo(tbody);
}


$(document).on('click', 'th', function () {
  let th = jQuery(this),
      eq = 0
  switch (th.text()){
    case 'ID number': eq = 0; break;
    case 'Surname': eq = 1; break;
    case 'Name': eq = 2; break;
    case 'Patronymic': eq = 3; break;
    case 'Birthday': eq = 4; break;
    case 'Group number': eq = 5; break;
    case 'email': eq = 6; break;
    case 'Info': eq = 7; break;
  }
  sortTable(eq)
  $('#students > tbody').find('th').css('background', 'none')
  if(sort_asc[eq]) {
    th.css('background-image', 'url(\'../img/up.png\')')
    th.css('background-position', '10px 15px')
    th.css('background-repeat', 'no-repeat')
  }
  else {
    th.css('background-image', 'url(\'../img/down.png\')')
    th.css('background-position', '10px 18px')
    th.css('background-repeat', 'no-repeat')
  }
  sort_asc[eq] = !sort_asc[eq]
})


function openForm() {
  document.getElementById("new_student").style.display = "block";
}

function closeForm() {
  document.getElementById("new_student").style.display = "none";
}

function closeSelf () {
  let id_number = document.getElementById("id_number").value,
      surname = document.getElementById("surname").value,
      name = document.getElementById("name").value,
      patronymic = document.getElementById("patronymic").value,
      birthday = document.getElementById("birthday").value,
      group_number = document.getElementById("group_number").value,
      email = document.getElementById("email").value,
      info = document.getElementById("info").value,
      table = document.getElementById("students"),
      new_row = table.insertRow(-1),
      cell1 = new_row.insertCell(0),
      cell2 = new_row.insertCell(1),
      cell3 = new_row.insertCell(2),
      cell4 = new_row.insertCell(3),
      cell5 = new_row.insertCell(4),
      cell6 = new_row.insertCell(5),
      cell7 = new_row.insertCell(6),
      cell8 = new_row.insertCell(7)
  cell1.appendChild(document.createTextNode(id_number))
  cell2.appendChild(document.createTextNode(surname))
  cell3.appendChild(document.createTextNode(name))
  cell4.appendChild(document.createTextNode(patronymic))
  cell5.appendChild(document.createTextNode(birthday))
  cell6.appendChild(document.createTextNode(group_number))
  cell7.appendChild(document.createTextNode(email))
  cell8.appendChild(document.createTextNode(info))

  document.getElementById( 'new_student' ).style.display = 'none';

}

$(document).on('click', '#submit', function () {
  var $myForm = $('#myForm');

  if($myForm[0].checkValidity()) {

    var formData = {
      id_number: $("#id_number").val(),
      surname: $("#surname").val(),
      name: $("#name").val(),
      patronymic: $("#patronymic").val(),
      birthday: $("#birthday").val(),
      group_number: $("#group_number").val(),
      email: $("#email").val(),
      info: $("#info").val()
    };
    $.ajax({
      url: '#',
      type: 'post',
      dataType: 'text',
      data: formData,
      success: function (data) {
        closeSelf()
      }
    });
  }
  else{
    $myForm[0].reportValidity()
  }
});
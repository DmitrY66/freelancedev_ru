let pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
let email = $("#mail");
let name = $("#name");
let message = $("#message");

$(function () {
  $("#form").submit(function () {
    var errors = false;

    $(this).find("span").empty();

    $(this)
      .find(email)
      .each(function () {
        if (!pattern.test($(this).val())) {
          errors = true;
          $(this).next().text("email incorrect");
        }
      });

    $(this)
      .find(name)
      .each(function () {
        if ($.trim($(this).val()) == "") {
          errors = true;
          $(this).next().text("Please fill...");
        }
      });

    $(this)
      .find(message)
      .each(function () {
        if ($.trim($(this).val()) == "") {
          errors = true;
          $(this).next().text("Please fill...");
        }
      });

    if (!errors) {
      var data = $("#form").serialize();
      $.ajax({
        url: "../php/mail.php",
        type: "POST",
        data: data,
        beforeSend: function () {
          $("#submit").next().text("Sending...");
        },
        success: function (res) {
          if (res == 1) {
            $("#form").find("input, textarea").val("");
            $("#submit").next().empty();
            alert("Email sent");
          } else {
            $("#submit").next().empty();
            alert("Send error!");
          }
        },
        error: function () {
          $("#submit").next().empty();
          alert("Script error!");
        },
      });
    }

    return false;
  });
});

jQuery(document).ready(function($){
  "use strict";
  /* setting the url ro submit the mail */
  var yourdomain = "http://innovatetoday.co/";
  //form validation rules
  /* Error List to be displayed when recieved error via AJAX */
  var full_name_error = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>Please specify your name.</div>',
      email_error = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>We need your email address to contact you.</div>',
      invalid_email_error = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>Your email address must be in the format of name@domain.com.</div>',
      message_error = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>Enter your message.</div>',
      mail_error = '<div class="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>Your message has not been sent. Please try again later!</div>',
      mail_success = '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>Your message has been sent. Thank you!</div>';

  jQuery.validator.addMethod("alphaspace", function(value, element) {
    return this.optional(element) || /^[a-zA-Z ]+$/.test(value);
  }, "Make sure you have entered aplhabets and spaces");

  $(".contact_form form").validate({
    rules: {
      full_name: {
        required: true,
        alphaspace: true

      },
      email: {
        required: true,
        email: true
      },
      message: "required",
    },
    messages: {
      full_name: {
        required: "Please specify your name",
      },
      email: {
        required: "We need your email address to contact you",
        email: "Your email address must be in the format of name@domain.com"
      },
      message: "Enter your message"
    },
    submitHandler: function() {
      //alert('form_submit');
      var form = $('.contact_form form');
      var full_name = form.find('[name="full_name"]').val();
      var email = form.find('[name="email"]').val();
      var message = form.find('[name="message"]').val();
      ContactAjax(full_name, email, message);
    }
  });

  var ContactAjax = function($full_name, $email, $message){
    $.ajax({
      type: "POST",
      url: yourdomain + "contact_send.php",	//@TODO CHange to Live
      //dataType: "json" ,
      data: { full_name : $full_name, email : $email, message : $message},
      success: function(data) {
        console.log(data);
        var response = jQuery.parseJSON(data);
        $(".contact_form form .result .alert").slideUp().remove();
        var contact_form = $('.contact_form form');
        if(response.success)
        {   contact_form.slideUp().height('0');
          contact_form.parent().append(mail_success);
        }else{
          var i;
          for(i=0; i<response.errors.length; i++){
            if(response.errors[i].error == 'empty_name')  {
              contact_form.find('[name="full_name"]').parent().append(full_name_error);
            }
            if(response.errors[i].error == 'empty_email')  {
              contact_form.find('[name="email"]').parent().append(email_error);
            }
            if(response.errors[i].error == 'empty_message')  {
              contact_form.find('[name="message"]').parent().append(message_error);
            }
            if(response.errors[i].error == 'invalid'){
              contact_form.find('[name="email"]').parent().append(invalid_email_error);
            }
            if(response.errors[i].error == 'mail_error'){
              contact_form.append(mail_error);
            }
          }
        }
        jQuery('button.close').click(function(){
          if(jQuery(this).data('dismiss')==='alert'){
            jQuery(this).parent().remove();
          }
        });

      }
    });
  };

});
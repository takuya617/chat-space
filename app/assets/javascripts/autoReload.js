$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Right-side__message-room" data-message-id=${message.id}>
          <div class="Right-side__messageInfo">
            <div class="messageInfo__name">
              ${message.user_name}
            </div>
            <div class="messageInfo__day">
              ${message.created_at}
            </div>
          </div>
          <div class="Right-side__text">
            <p class="text__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Right-side__message-room" data-message-id=${message.id}>
        <div class="Right-side__messageInfo">
          <div class="messageInfo__name">
            ${message.user_name}
          </div>
          <div class="messageInfo__day">
            ${message.created_at}
          </div>
        </div>
        <div class="Right-side__text">
          <p class="text__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Right-side__message-room:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Right-side__main-list').append(insertHTML);
        $('.Right-side__main-list').animate({ scrollTop: $('.Right-side__main-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
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

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Right-side__main-list').append(html);
      $('form')[0].reset();
      $('.Right-side__main-list').animate({ scrollTop: $('.Right-side__main-list')[0].scrollHeight});
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    return false
  });
});
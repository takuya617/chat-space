class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end

    def edit
    end
  
    def update 
      if current_group.update(group_params)
        redirect_to　root_path
      else
        render :edit
      end
    end
  end

 private

 def message_params
   params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
 end

 def group_params
   params.require(:group).permit(:name)
 end

 def set_group
   @group = Group.find(params[:group_id])
 end
end
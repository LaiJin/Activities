
var native_accessor = {

    send_sms: function (phone, message) {
        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    },

    process_received_message: function(json_message) {

        process_message(json_message)
//        var message = json_message.messages[0]
//        message.content = trim(message.content)
//        if(message.content.substring(0, 2).toUpperCase() == "BM") {
//            var sign_up_person_name = message.content.substring(2, message.content.length)
//            sign_up_person_name = trim(sign_up_person_name)
//            console.log(sign_up_person_name)
//        } else if (message.content.substring(0, 2).toUpperCase() == "JJ") {
//            var bid_price = message.content.substring(2, message.content.length)
//            bid_price = trim(bid_price)
//            bid_price = left_trim(bid_price)
//            console.log(bid_price)
//        }

    }

};

function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
//    notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj5","phone":"181717833"}]})
}
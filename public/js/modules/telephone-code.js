/**
 * Created by lrh on 16/6/15.
 */
define(function(require, exports, module) {
    // 通过 require 引入依赖
    require('jquery');
    var codes = new Array();
    var codeKey = $('#code-key').val();
    $('.code').on('input',function(){
        var target = $(this);
        var index = target.attr('name').split('-')[1];
        var code = target.val();
        codes[index] = target.val();
        var codeStr='';
        codes.forEach(function(item){
            if(item&&item.trim() != ''){
                codeStr +=item;
            }
        });
        if(codeStr.trim().length == 4){
            $.ajax({
                type:'post',
                url:API_HOST+'/api/msg/code/verify',
                dataType:'jsonp',
                data:{code:codeStr,key:codeKey},
                success:function(data){
                    if(data.err_code == '0'){
                        window.location.href='/register/register-passwd';
                    }else{
                        alert(data.err_msg);
                    }
                }
            });
        }
    });

    $('#repetSend').click(function(){
        $.ajax({
            type:'post',
            url:host+'/api/msg/code',
            dataType:'jsonp',
            data:{telephone:'13867445646',key:codeKey},
            success:function(data){
                alert(data.err_msg);
            },
            error: function (data) {

            }
        });
    });
});
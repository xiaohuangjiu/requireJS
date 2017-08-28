/**
 * 网站中的ajax请求
 * Author:Wilbert
 *   Date:2017/8/20
 */
define(["jquery"],function($){
    var obj={
        ajax:function(url,type,data,callback){
            $.ajax({
                url:"/api/"+url,
                type:type,
                data:data,
                success:function(res){
                    if(res.code!=200) throw new Error(res.msg);

                    //成功了就执行回调函数
                    callback && callback(res);

                    // if(callback){
                    //     callback();
                    // }

                },
                error:function(res){
                    throw new Error(res);
                }
            })
        }
    }


    "post,get".split(",").forEach(function(v){
        //v：get/post：方法名
        obj[v]=function(url,data,callback){
            this.ajax(url,v,data,callback);
        }
    })

    return obj;
})
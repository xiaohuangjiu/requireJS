/**
 * 个人中心模块
 * Author:Wilbert
 *   Date:2017/8/25
 */
define(["jquery","text!tpls/personalCenter.html","common/api","template","ueAll"],function($,personalCenterTpl,api,template){


    return function(){
        api.get("teacher/profile",{},function(res){
            //把res.result中的数据渲染到模板中
            var personalCenter=template.render(personalCenterTpl,res.result);


            //弹出模态框？

            $("#modalPersonalCenter").remove();

            var $personalCenter=$(personalCenter).on("submit","form",function(e){
                e.preventDefault();

                //获取数据
                var formData=$(this).serialize();//表单元素都应该具有name属性

                api.post("teacher/modify",formData,function(){

                    //隐藏模态框
                    $personalCenter.modal("hide");

                    //刷新页面
                    // location.href="/";//  /都表示网站根目录
                    // location.href="/index.html";
                    location.reload();//重新加载

                })


                //通过ajax请求提交到服务器中

            }).appendTo("body").modal();

            //UEditor一定要在添加到页面中之后才能去渲染
            var ue = UE.getEditor('ueContainer');
            ue.ready(function(){

                //把自我介绍预加载到编辑器中
                ue.setContent(res.result.tc_introduce);

            });
        })




    }
})
/**
 * 讲师列表模块
 * Author:Wilbert
 *   Date:2017/8/17
 */
define(["jquery","text!tpls/teacherList.html","template","teacher/show","teacher/add","teacher/edit"],function($,teacherListTpl,template,teacherShow,teacherAdd,teacherEdit){
    //正常情况下，如果能够读取到该模板，那么同样的可以通过依赖注入（形参）获取模板内容：字符串格式

    // var html=template.render("hi,{{value}}",{value:100});
    // console.log(html);//"hi,100"

    return function fn(){
        // var fn=arguments.callee;

        //以后博学谷项目除了登录页面的2个接口可以直接访问之外，其他接口都必须要先登录才能访问(服务器端的限制)
        $.ajax({
            url:"/api/teacher",
            type:"get",
            success:function(res){
                //res.result：返回的讲师的相关数据

                //把数据放在表格中-->模板引擎arttemplate
                var teacherList=template.render(teacherListTpl,res);


                var $teacherList=$(teacherList)
                    //查看讲师
                    .on("click",".btn-show",function(){
                    var tc_id=$(this).parent().attr("tc_id");

                    teacherShow(tc_id);
                })
                    //添加讲师
                    .on("click",".btn-add",function(){
                    //单元测试：事件有没有绑定成功
                    //alert(1);

                    teacherAdd();
                })
                    //编辑讲师
                    .on("click",".btn-edit",function(){
                    //点击了编辑讲师按钮
                    // //单元测试
                    // alert(1);
                    
                    //获取父元素中的tc_id-->编辑讲师用的
                    var tc_id=$(this).parent().attr("tc_id");

                    //调用编辑讲师模块
                    teacherEdit(tc_id,function(){

                        //刷新讲师管理模块的逻辑？
                        fn();       //递归调用
                    });
                })
                    //注销/启用讲师
                    .on("click",".btn-status",function(){
                        // //测试：事件有没有绑定成功？
                        // alert("1");
                        var $btnStatus=$(this);

                        // 1、 修改该讲师服务器中
                        $.ajax({
                            url:"/api/teacher/handle",
                            type:"post",
                            data:{
                                tc_id:$(this).parent().attr("tc_id"),//讲师id
                                tc_status:$(this).parent().attr("tc_status")//讲师原来的状态
                            },
                            success:function(res){
                                if(res.code!=200) throw new Error(res.msg);

                                // 2、 修改表格中显示的指定的列的文本，以及按钮的文本
                                var tc_status=res.result.tc_status;
                                //2.1、找到用户状态列
                                $btnStatus.parent().siblings(".td-status").text(tc_status==0?"启用":"注销");
                                //2.2、找到表示用户状态的按钮
                                $btnStatus.text(tc_status==0?"注销":"启用");

                                //2.3、千万、一定、必须修改父元素中的状态值
                                $btnStatus.parent().attr("tc_status",tc_status);
                                
                            }
                        })

                    });

                //把存有真实数据的表格放到页面中
                $(".panel-content .panel-body").html($teacherList);// 以上代码等同于：$(".panel-content .panel-body").empty().append($teacherList);
            }
        })


    }
})
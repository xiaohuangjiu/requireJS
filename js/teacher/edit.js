/**
 * 编辑讲师
 * Author:Wilbert
 *   Date:2017/8/20
 */
define(["jquery","text!tpls/teacherEdit.html","template"],function($,teacherEditTpl,template){

    /**
     * @param id  讲师的id
     * @param callback 接受了edit入口函数的第二个实参
     */
    return function(id,callback){
        //根据id获取讲师原来的基本信息？
        $.ajax({
            url:"/api/teacher/edit",
            type:"get",
            data:{tc_id:id},
            success:function(res){
                //排错处理
                if(res.code!=200) throw new Error(res.msg);

                //获取了讲师的数据-->把数据放到模态框模板中-->artemplate编译模板
                var teacherEdit=template.render(teacherEditTpl,res.result);

                //清除之前的模态框-->通过id找到模态框
                $("#modalEditTeacher").remove();

                //通过jquery操作把字符串放到body中，并且以模态框的形式呈现出来
                var $teacherEdit=$(teacherEdit).on("submit","form",function(){
                    //1、获取表单数据
                    var formData=$(this).serialize();

                    //2、把表单数据通过ajax提交到服务器中
                    $.ajax({
                        url:"/api/teacher/update",
                        type:"post",
                        data:formData,
                        success:function(res){
                            if(res.code!=200) throw new Error(res.msg);

                            //数据已经成功的提交到服务器中
                            //a、隐藏模态框
                            $teacherEdit.modal("hide");
                            //b、刷新讲师管理模块
                            callback();
                            
                            // $(".left .list-group .teacher-manager").trigger("click");//触发讲师管理菜单的click事件
                        }
                    })

                    return false;//阻止页面跳转

                }).appendTo("body").modal();
            }
        })
        

        // //单元测试
        // alert("加载了编辑讲师模块");
        


    }
})
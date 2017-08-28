/**
 * 查看讲师
 * Author:Wilbert
 *   Date:2017/8/19
 */
define(["jquery","text!tpls/teacherShow.html","template"],function($,teacherShowTpl,template){


    /**
     * @param id 讲师id
     */
    return function(id){
        $.ajax({
            url:"/api/teacher/view",
            type:"get",
            data:{ tc_id:id },
            success:function(res){
                // //单元测试：查看数据有没有获取成功
                // console.log(res);

                // if(res.code==200){
                //     //数据成功获取-->把数据渲染到模态框中
                //
                //
                //     var $teacherShowTpl=$(teacherShowTpl);
                //     console.log($teacherShowTpl);
                //
                //     $("#modalShowTeacher").remove();
                //
                //     $teacherShowTpl.appendTo("body").modal();
                //
                // }else{
                //     //数据获取失败？-->打印错误日志
                //     console.log(res.msg);
                // }



                // //简化1：
                // if(res.code!=200){
                //     console.log(res.msg);
                //     return;
                // }
                //
                // //数据成功获取-->把数据渲染到模态框中
                //
                //
                // var $teacherShowTpl=$(teacherShowTpl);
                // console.log($teacherShowTpl);
                //
                // $("#modalShowTeacher").remove();
                //
                // $teacherShowTpl.appendTo("body").modal();


                //简化2：
                if(res.code!=200)   return console.log(res.msg);

                //数据成功获取-->把数据渲染到模态框中

                var teacherShow=template.render(teacherShowTpl,res.result);

                var $teacherShow=$(teacherShow);
                //      console.log($teacherShow);

                $("#modalShowTeacher").remove();

                $teacherShow.appendTo("body").modal();
            }
        })
        
        
        //alert(teacherShowTpl);


        // $("body").append(teacherShowTpl);
        // $("#modalShowTeacher").modal();


    }
})
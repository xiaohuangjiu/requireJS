/**
 * 图表统计首页
 * Author:Wilbert
 *   Date:2017/8/25
 */
define(["text!tpls/chart.html","echarts","common/api"],function(chartTpl,echarts,api){


    return function(){
        //统计出讲师列表中男女比例
        var count=[
            {name:"男",value:0},
            {name:"女",value:0}
        ]

        //1、计算出男女数量
        api.get("teacher",{},function(res){
            //根据数据中tc_gender的值来进行判断
            res.result.forEach(function(v){
                //v：一个对象，包含了该讲师相关信息
                if(v.tc_gender==0){
                    count[0].value++;
                }else{
                    count[1].value++;
                }

            });
            console.log(count);

            //2、把统计结果放到图表中呈现-->数据可视化


            var $chart=$(chartTpl);
            $(".panel-content .panel-body").html($chart);


            //页面渲染完成之后加载echarts
            var domMain=$chart.find(".main")[0];

            var myChart = echarts.init(domMain);

            // 指定图表的配置项和数据
            var option = {
                //标题
                title : {
                    text: '网站中男女比例',
                    subtext: '仅供参考\n上面是假的',
                    x:'center'      //水平居中
                },

                //提示框
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                //图例
                legend: {
                    top:30,
                    right:30,
                    orient: 'horizontal',   //图例的对齐方式  并排/一排一个
                    data: count.map(function(v){
                        //v:{name:"",value:""}

                        return v.name;

                    })
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:count,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        });


    }
})
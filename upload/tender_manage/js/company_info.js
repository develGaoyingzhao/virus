
var status=1808;

var addCarFlag=1; //设置是否是添加车辆信息

var truck_id;

var truck_number;


//获取承运商信息
$.ajax({
    url: serverUrl + "shipper",
    type: 'get',
    //async: false,
    dataType: "json",
    beforeSend: function(request) {
        request.setRequestHeader("token",userObj.token);
    },
    success: function (data) {
        console.log(JSON.stringify(data));
        status=data.code;
        if(data.code==1800)
        {


            $("#b_account").val(data.b_account);
            $("#b_bank").val(data.b_bank);
            $("#buss_id").val(data.buss_id);
            $("#buss_money").val(data.buss_money);
            $("#com_about").val(data.com_about);
            $("#com_name").val(data.com_name);
            $("#contact_cid").val(data.contact_cid);
            $("#contact_depart").val(data.contact_depart);
            $("#contact_email").val(data.contact_email);
            $("#contact_home").val(data.contact_home);
            $("#contact_name").val(data.contact_name);
            $("#contact_phone").val(data.contact_phone);
            $("#contact_postion").val(data.contact_postion);
            $("#email").val(data.email);
            $("#entp_id").val(data.entp_id);
            $("#legalp_cid").val(data.legalp_cid);
            $("#legalp_email").val(data.legalp_email);
            $("#legalp_home").val(data.legalp_home);
            $("#legalp_name").val(data.legalp_name);
            $("#legalp_phone").val(data.legalp_phone);
            $("#tax_id").val(data.tax_id);
            $("#trans_id").val(data.trans_id);

            if(data.url_audit_report!="")
            {
                if(data.url_audit_report)
                {
                    $("#url_audit_report_span").html("<img src="+data.url_audit_report+"/>");
                }
                $("#audit-report").prop("checked",true);
                $("#auditReportForm").show();
                $("#taxReportForm").hide();

            }
            else {
                if(data.url_addtax)
                {
                    $("#url_addtax_span").html("<img src="+data.url_addtax+"/>");
                }
                if(data.url_profit)
                {
                    $("#url_profit_span").html("<img src="+data.url_profit+"/>");
                }
                if(data.url_property)
                {
                    $("#url_property_span").html("<img src="+data.url_property+"/>");
                }
                $("#tax-report").prop("checked",true);
                $("#auditReportForm").hide();
                $("#taxReportForm").show();
            }


            if(data.url_b_passport)
            {
                $("#url_b_passport_span").html("<img src="+data.url_b_passport+"/>");
            }
            if(data.url_b_taxer)
            {
                $("#url_b_taxer_span").html("<img src="+data.url_b_taxer+"/>");
            }

            if(data.url_bcid)
            {
                $("#url_bcid_span").html("<img src="+data.url_bcid+"/>");
            }
            if(data.url_buss_id)
            {
                $("#url_buss_id_span").html("<img src="+data.url_buss_id+"/>");
            }
            if(data.url_entp_id)
            {
                $("#url_entp_id_span").html("<img src="+data.url_entp_id+"/>");
            }
            if(data.url_fcid)
            {
                $("#url_fcid_span").html("<img src="+data.url_fcid+"/>");
            }
            if(data.url_insurance)
            {
                $("#url_insurance_span").html("<img src="+data.url_insurance+"/>");
            }
            if(data.url_tax)
            {
                $("#url_tax_span").html("<img src="+data.url_tax+"/>");
            }
            if(data.url_trans_id)
            {
                $("#url_trans_id_span").html("<img src="+data.url_trans_id+"/>");
            }




            $("#url_b_passport").val(data.url_b_passport);
            $("#url_b_taxer").val(data.url_b_taxer);
            $("#url_bcid").val(data.url_bcid);
            $("#url_buss_id").val(data.url_buss_id);
            $("#url_entp_id").val(data.url_entp_id);
            $("#url_fcid").val(data.url_fcid);
            $("#url_insurance").val(data.url_insurance);
            $("#url_tax").val(data.url_tax);
            $("#url_trans_id").val(data.url_trans_id);

            $("#url_audit_report").val(data.url_audit_report);
            $("#url_profit").val(data.url_profit);
            $("#url_property").val(data.url_property);
            $("#url_addtax").val(data.url_addtax);



        }


    }
});

//获取车辆信息
/*$.ajax({
    url: serverUrl + "trucks",
    type: 'get',
    //async: false,
    dataType: "json",
    beforeSend: function(request) {
        request.setRequestHeader("token",userObj.token);
    },
    success: function (data) {
        console.log("车辆列表"+JSON.stringify(data));
        if(data.code==1800)
        {
            for(var i=0;i<data.data.length;i++)
            {
                if(i%2==0)
                {
                    $("#carCount").append("<tr class='odd'><td class='number'>"+parseInt(i+1)+"</td><td>"+data.data[i].plate+"</td> <td>"+data.data[i].brand+"</td> <td>是</td> <td>"+data.data[i].length+"</td> <td>"+data.data[i].power+"</td> <td>"+data.data[i].volume+"</td> <td>"+new Date(data.data[i].flic_date).Format("yyyy-MM-dd")+"</td> <td>"+new Date(data.data[i].blic_date).Format("yyyy-MM-dd")+"</td> <td>"+new Date(data.data[i].insurance_from).Format("yyyy-MM-dd")+"-"+new Date(data.data[i].insurance_end).Format("yyyy-MM-dd")+"</td> <td>"+data.data[i].insurance_com+"</td> <td>"+data.data[i].insurance_amount+"</td> <td> "+data.data[i].line_type+" </td> <td>"+data.data[i].line+"</td> <td><input type='hidden' value="+data.data[i].url_truck_lic+"#"+data.data[i].url_truck_yy+"#"+data.data[i].url_truck_dj+"#"+data.data[i].url_truck_jqx+"#"+data.data[i].url_truck_syx+"/> <span class='view-detail'>查看详情</span> <span class='edit'>修改</span><input type='hidden' value='"+data.data[i].truck_id+"'/></td> </tr>");

                }
                else {
                    $("#carCount").append("<tr><td class='number'>"+parseInt(i+1)+"</td><td>"+data.data[i].plate+"</td> <td>"+data.data[i].brand+"</td> <td>是</td> <td>"+data.data[i].length+"</td> <td>"+data.data[i].power+"</td> <td>"+data.data[i].volume+"</td> <td>"+new Date(data.data[i].flic_date).Format("yyyy-MM-dd")+"</td> <td>"+new Date(data.data[i].blic_date).Format("yyyy-MM-dd")+"</td> <td>"+new Date(data.data[i].insurance_from).Format("yyyy-MM-dd")+"-"+new Date(data.data[i].insurance_end).Format("yyyy-MM-dd")+"</td> <td>"+data.data[i].insurance_com+"</td> <td>"+data.data[i].insurance_amount+"</td> <td> "+data.data[i].line_type+" </td> <td>"+data.data[i].line+"</td> <td><input type='hidden' value="+data.data[i].url_truck_lic+"#"+data.data[i].url_truck_yy+"#"+data.data[i].url_truck_dj+"#"+data.data[i].url_truck_jqx+"#"+data.data[i].url_truck_syx+"/> <span class='view-detail'>查看详情</span> <span class='edit'>修改</span><input type='hidden' value='"+data.data[i].truck_id+"'/></td> </tr>");

                }
            }

            $("#car-info").delegate(".view-detail","click",function() {

                    var childTd=$(this).parent().parent().children("td");

                    $("#view-car").show();
                    $(".shadow").show();

                    $("#v_plate").text($(childTd[1]).text());
                    $("#v_brand").text($(childTd[2]).text());
                    $("#v_truck_type").text($(childTd[3]).text());
                    $("#v_length").text($(childTd[4]).text());
                    $("#v_power").text($(childTd[5]).text());
                    $("#v_size").text($(childTd[6]).text());
                    $("#v_flic_date").text($(childTd[7]).text());
                    $("#v_blic_date").text($(childTd[8]).text());
                    $("#v_insurance_from").text($(childTd[9]).text().substr(0,10));
                    $("#v_insurance_end").text($(childTd[9]).text().substr(11,10));
                    $("#v_insurance_com").text($(childTd[10]).text());
                    $("#v_insurance_amount").text($(childTd[11]).text());
                    $("#v_line_type").text($(childTd[12]).text());
                    $("#v_line").text($(childTd[13]).text());

                    $("#carCertificate").attr("src",$(this).prev().val().split("#")[0]);
                    $("#carOperation").attr("src",$(this).prev().val().split("#")[1]);
                    $("#carRegisterPic").attr("src",$(this).prev().val().split("#")[2]);
                    $("#carForcePolicy").attr("src",$(this).prev().val().split("#")[3]);
                    $("#carCommercePolicy").attr("src",$(this).prev().val().split("#")[4]);

            });
            $("#car-info").delegate(".edit","click",function() {

                    addCarFlag=0;

                    $("#add-car").show();
                    $(".shadow").show();

                    var childTd=$(this).parent().parent().children("td");

                    truck_number=$(childTd[0]).text();

                    truck_id=$(this).next().val();

                    //$("#plate").val($(childTd[1]).text());

                    $("#province").val($(childTd[1]).text().substr(0,1));
                    $("#carNo").val($(childTd[1]).text().substr(1,6));

                    $("#brand").val($(childTd[2]).text());
                    $("#truck_type").val($(childTd[3]).text());
                    $("#length").val($(childTd[4]).text());
                    $("#power").val($(childTd[5]).text());
                    $("#volume").val($(childTd[6]).text());
                    $("#flic_date").val($(childTd[7]).text());
                    $("#blic_date").val($(childTd[8]).text());
                    $("#insurance_from").val($(childTd[9]).text().substr(0,10));
                    $("#insurance_end").val($(childTd[9]).text().substr(11,10));
                    $("#insurance_com").val($(childTd[10]).text());
                    $("#insurance_amount").val($(childTd[11]).text());
                    $("#line_type").val($(childTd[12]).text());
                    $("#line").val($(childTd[13]).text());

                    console.log($(this).prev().prev().val());

                    $("#url_truck_lic_span").html("<img src="+$(this).prev().prev().val().split("#")[0]+"/>");
                    $("#url_truck_yy_span").html("<img src="+$(this).prev().prev().val().split("#")[1]+"/>");
                    $("#url_truck_dj_span").html("<img src="+$(this).prev().prev().val().split("#")[2]+"/>");
                    $("#url_truck_jqx_span").html("<img src="+$(this).prev().prev().val().split("#")[3]+"/>");
                    $("#url_truck_syx_span").html("<img src="+$(this).prev().prev().val().split("#")[4]+"/>");

                    $("#url_truck_lic").val($(this).prev().prev().val().split("#")[0]);
                    $("#url_truck_yy").val($(this).prev().prev().val().split("#")[1]);
                    $("#url_truck_dj").val($(this).prev().prev().val().split("#")[2]);
                    $("#url_truck_jqx").val($(this).prev().prev().val().split("#")[3]);
                    $("#url_truck_syx").val($(this).prev().prev().val().split("#")[4]);

            });








        }

    }
});*/


$("iframe").each(function(index)
{
    $(this).attr("src",serverUrl+"uploader?flag="+$(this).attr("flag")+"&token="+userObj.token);
    console.log($(this).attr("src"));
});


$("#contact_email").on('input',function(e){
    //console.log($("#regEmail").val().toLowerCase());
    $("#contact_email").val($("#contact_email").val().toLowerCase());
});

$("#contact_email").on('propertychange',function(e){
    //console.log("change");
    $("#contact_email").val($("#contact_email").val().toLowerCase());
});

$("#legalp_email").on('input',function(e){
    //console.log($("#regEmail").val().toLowerCase());
    $("#legalp_email").val($("#legalp_email").val().toLowerCase());
});

$("#legalp_email").on('propertychange',function(e){
    //console.log("change");
    $("#legalp_email").val($("#legalp_email").val().toLowerCase());
});


$("#tax-report").click(function()
{
    $("#url_audit_report_span").empty();
    $("#url_audit_report").val("");
});

$("#audit-report").click(function()
{
    $("#url_profit_span").empty();
    $("#url_profit").val("");
    $("#url_addtax_span").empty();
    $("#url_addtax").val("");
    $("#url_property_span").empty();
    $("#url_property").val("");
});

$("#newCertificate").click(function()
{

    $("#secondCertificate").hide();
    $("#thirdCertificate").hide();
    $("#entp_id").val("");
    $("#url_entp_id_span").empty();
    $("#url_entp_id").val("");
    $("#tax_id").val("");
    $("#url_tax_span").empty();
    $("#url_tax").val("");

});

$("#threeCertificate").click(function()
{

    $("#secondCertificate").show();
    $("#thirdCertificate").show();

});

$(document).ready(function() {

    $("#companyForm").validate({
        rules: {
            com_name:{
                required:true
            },
            buss_id:{
                required:true
            },
            url_buss_id:{
                required:true
            },
            buss_money:{
                required:true
            },


            entp_id:{
                required:{
                    depends:function(){
                        return ($("#threeCertificate").prop("checked"));
                    }
                }
            },
            url_entp_id:{
                required:{
                    depends:function(){
                        return ($("#threeCertificate").prop("checked"));
                    }
                }
            },
            tax_id:{
                required:{
                    depends:function(){
                        return ($("#threeCertificate").prop("checked"));
                    }
                }
            },
            url_tax:{
                required:{
                    depends:function(){
                        return ($("#threeCertificate").prop("checked"));
                    }
                }
            },


            trans_id:{
                required:true
            },
            url_trans_id:{
                required:true
            },
            url_insurance:{
                required:true
            },
            legalp_name:{
                required:true
            },
            legalp_home:{
                required:true
            },
            legalp_cid:{
                required:true
            },
            legalp_phone:{
                required:true
            },
            legalp_email:{
                required:true
            },
            url_fcid:{
                required:true
            },
            url_bcid:{
                required:true
            },
            b_account:{
                required:true
            },
            b_bank:{
                required:true
            },
            b_account:{
                required:true
            },
            url_b_passport:{
                required:true
            },
            url_b_taxer:{
                required:true
            },
            url_profit:{
                required:{
                    depends:function(){
                        return ($("#tax-report").prop("checked"));
                    }
                }
            },
            url_addtax:{
                required:{
                    depends:function(){
                        return ($("#tax-report").prop("checked"));
                    }
                }
            },
            url_property:{
                required:{
                    depends:function(){
                        return ($("#tax-report").prop("checked"));
                    }
                }
            },
            url_audit_report:{
                required:{
                    depends:function(){
                        return ($("#audit-report").prop("checked"));
                    }
                }
            },
            url_b_passport:{
                required:true
            },
            url_b_taxer:{
                required:true
            },
            contact_name:{
                required:true
            },
            contact_cid:{
                required:true
            },
            contact_home:{
                required:true
            },
            contact_phone:{
                required:true
            },
            contact_email:{
                required:true
            }
        },
        messages:{
            com_name:{
                required:'请输入公司全称'
            },
            buss_id:{
                required:'请输入营业执照注册号'
            },
            url_buss_id:{
                required:'请上传营业执照照片'
            },
            buss_money:{
                required:'请输入注册资本'
            },
            entp_id:{
                required:'请输入组织机构代码号'
            },
            url_entp_id:{
                required:'请上传组织机构代码证照片'
            },
            trans_id:{
                required:'请输入道路运输许可证号'
            },
            url_trans_id:{
                required:'请上传道路运输许可证照片'
            },
            url_insurance:{
                required:'请上传物流责任险保单'
            },
            legalp_name:{
                required:'请输入企业负责人姓名'
            },
            legalp_home:{
                required:'请输入籍贯'
            },
            legalp_cid:{
                required:'请输入法人身份证号'
            },
            legalp_phone:{
                required:'请输入联系方式'
            },
            legalp_email:{
                required:'请输入邮箱'
            },
            url_fcid:{
                required:'请上传法人身份证照片（正面）'
            },
            url_bcid:{
                required:'请上传法人身份证照片（反面）'
            },
            tax_id:{
                required:'请输入税务登记号'
            },
            url_tax:{
                required:'请上传税务登记证照片'
            },
            b_account:{
                required:'请输入银行账号'
            },
            b_bank:{
                required:'请输入开户银行'
            },
            url_b_passport:{
                required:'请上传开户许可证照片'
            },
            url_b_taxer:{
                required:'请上传一般纳税人证明照片'
            },
            url_profit:{
                required:'请上传利润表照片'
            },
            url_audit_report:{
                required:'请上传年度审计报告'
            },
            url_addtax:{
                required:'请上传增值税纳税申报表照片'
            },
            url_property:{
                required:'请上传资产负债表照片'
            },
            contact_name:{
                required:'请输入姓名'
            },
            contact_cid:{
                required:'请输入身份证号'
            },
            contact_home:{
                required:'请输入籍贯'
            },
            contact_phone:{
                required:'请输入联系电话'
            },
            contact_email:{
                required:'请输入邮箱'
            }
        },
        errorPlacement: function(error, element) {

                error.appendTo(element.parent());

        },

        submitHandler:function(form)
        {
            companyInfoSave("0");
        }
    });


    function companyInfoSave(tempFlag)
    {
        if(status==1800)
        {
            var methodType='put';
        }
        else if(status==1808)
        {
            var methodType='post';
        }
        $.ajax({
            url: serverUrl + "shipper",
            type: methodType,
            dataType: "json",
            data:{
                com_name:$("#com_name").val(),
                com_about:$("#com_about").val(),
                buss_id:$("#buss_id").val(),
                url_buss_id:$("#url_buss_id").val(),
                buss_money:$("#buss_money").val(),
                entp_id:$("#entp_id").val(),
                url_entp_id:$("#url_entp_id").val(),
                trans_id:$("#trans_id").val(),
                url_trans_id:$("#url_trans_id").val(),
                url_insurance:$("#url_insurance").val(),
                legalp_name:$("#legalp_name").val(),
                legalp_home:$("#legalp_home").val(),
                legalp_cid:$("#legalp_cid").val(),
                legalp_phone:$("#legalp_phone").val(),
                legalp_email:$("#legalp_email").val(),
                url_fcid:$("#url_fcid").val(),
                url_bcid:$("#url_bcid").val(),
                tax_id:$("#tax_id").val(),
                url_tax:$("#url_tax").val(),
                b_account:$("#b_account").val(),
                b_bank:$("#b_bank").val(),
                url_b_passport:$("#url_b_passport").val(),
                url_b_taxer:$("#url_b_taxer").val(),
                url_profit:$("#url_profit").val(),
                url_audit_report:$("#url_audit_report").val(),
                url_addtax:$("#url_addtax").val(),
                url_property:$("#url_property").val(),
                contact_name:$("#contact_name").val(),
                contact_cid:$("#contact_cid").val(),
                contact_home:$("#contact_home").val(),
                contact_phone:$("#contact_phone").val(),
                contact_email:$("#contact_email").val(),
                contact_postion:$("#contact_postion").val(),
                contact_depart:$("#contact_depart").val()
            },
            beforeSend: function(request) {
                request.setRequestHeader("token", userObj.token);
            },
            success: function (data) {
                console.log(JSON.stringify(data));
                if(data.code==1800)
                {

                    status=1800;

                    if(tempFlag==1)
                    {
                       alert("临时保存成功！");
                    }
                    else
                    {
                        alert("保存成功！");
                        status=1800;
                        $("#step1").hide();
                        $("#step2").hide();
                        $("#step3").hide();
                        $("#step4").show();
                        $("#tab1").removeClass("active1");
                        $("#tab2").removeClass("active2");
                        $("#tab3").removeClass("active2");
                        $("#tab4").addClass("active3");
                        //获取需要审核的信息
                        getDetail();
                    }

                }
                else
                {
                    alert("保存失败！");
                }

            }
        });
    }

    //步骤一
    $("#agreementNext").click(function()
    {

        if($("#checkbox").prop("checked"))
        {
            $("#step1").hide();
            $("#step2").show();
            $("#step3").hide();
            $("#step4").hide();
            $("#tab1").removeClass("active1");
            $("#tab2").addClass("active2");
            $("#tab3").removeClass("active2");
            $("#tab4").removeClass("active3");
        }
        else {
            $(".cus-tip").show();
        }
    });

    //步骤二
    $("#btnNext2").click(function()
    {
        $("#step1").show();
        $("#tab1").addClass("active1");

        $("#tab2").removeClass("active2");
        $("#tab3").removeClass("active2");
        $("#tab4").removeClass("active4");

        $("#step2").hide();
        $("#step3").hide();
        $("#step4").hide();
    });

    $("#btnStep2").click(function()
    {


        $("#companyForm").submit();



    });

    $("#btnTemp").click(function()
    {

       /* $("#companyForm").validate({
            submitHandler:function(form){
                alert("提交事件!");
                companyInfoSave("1");

            }
        });*/

        companyInfoSave("1");

    });



    //步骤三
    $("#btnNext3").click(function()
    {
        $("#step2").show();
        $("#tab2").addClass("active2");

        $("#tab1").removeClass("active1");
        $("#tab3").removeClass("active2");
        $("#tab4").removeClass("active3");

        $("#step1").hide();
        $("#step3").hide();
        $("#step4").hide();
    });

    $("#btnStep3").click(function()
    {
        if($("#carCount tr").length>=20)
        {
            $("#step4").show();
            $("#tab4").addClass("active3");

            $("#tab1").removeClass("active1");
            $("#tab2").removeClass("active2");
            $("#tab3").removeClass("active2");

            $("#step1").hide();
            $("#step2").hide();
            $("#step3").hide();
            //获取需要审核的信息
            getDetail();
        }
        else {
            alert("您的车辆少于20辆");
        }
    });


    //步骤四
    $("#btnStep4").click(function()
    {

        $.ajax({
            url: serverUrl + "result",
            type: 'post',
            dataType: "json",
            beforeSend: function(request) {
                request.setRequestHeader("token", userObj.token);
            },
            success: function (data) {

                console.log(JSON.stringify(data));

                if(data.code==1800)
                {

                    alert("提交成功！");
                    window.location.href="overview.html";
                }
                else
                {
                    alert("提交失败！");
                }
            }
        });



    });

    $("#btnPrev4").click(function()
    {
        $("#step2").show();
        $("#tab2").addClass("active2");

        $("#tab1").removeClass("active1");
        $("#tab3").removeClass("active2");
        $("#tab4").removeClass("active3");

        $("#step1").hide();
        $("#step3").hide();
        $("#step4").hide();
    });


    //添加车辆
    $("#saveCar").click(function()
    {
        $("#carForm").submit();
    });
    $("#carForm").validate({
        rules: {
            url_truck_lic:{
                required:true
            },
            url_truck_yy:{
                required:true
            },
            url_truck_dj:{
                required:true
            },
            url_truck_jqx:{
                required:true
            },
            url_truck_syx:{
                required:true
            }

        },
        messages:{

            url_truck_lic:{
                required:"不能为空！"
            },
            url_truck_yy:{
                required:"不能为空！"
            },
            url_truck_dj:{
                required:"不能为空！"
            },
            url_truck_jqx:{
                required:"不能为空！"
            },
            url_truck_syx:{
                required:"不能为空！"
            }
        },
        errorPlacement: function(error, element) {

                error.appendTo(element.parent());

        },

        submitHandler:function(form)
        {
            if(addCarFlag==1)
            {
                //添加车辆信息
                $.ajax({
                    url: serverUrl + "truck",
                    type: 'post',
                    dataType: "json",
                    data:{
                        plate:$("#province").val()+$("#carNo").val(),
                        brand:$("#brand").val(),
                        truck_type:$("#truck_type").val(),
                        power:$("#power").val(),
                        length:$("#length").val(),
                        volume:$("#volume").val(),
                        flic_date:$("#flic_date").val(),
                        blic_date:$("#blic_date").val(),
                        insurance_from:$("#insurance_from").val(),
                        insurance_end:$("#insurance_end").val(),
                        insurance_com:$("#insurance_com").val(),
                        insurance_amount:$("#insurance_amount").val(),
                        line_type:$("#line_type").val(),
                        line:$("#line").val(),
                        url_truck_lic:$("#url_truck_lic").val(),
                        url_truck_yy:$("#url_truck_yy").val(),
                        url_truck_dj:$("#url_truck_dj").val(),
                        url_truck_jqx:$("#url_truck_jqx").val(),
                        url_truck_syx:$("#url_truck_syx").val()
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader("token", userObj.token);
                    },
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        if(data.code==1800)
                        {
                            alert("添加成功！");
                            $("#carCount").append("<tr><td class='number'>"+parseInt($('#carCount tr').length+1)+"</td><td>"+$('#province').val()+$('#carNo').val()+"</td> <td>"+$('#brand').val()+"</td> <td>是</td> <td>"+$('#length').val()+"</td> <td>"+$('#power').val()+"</td> <td>"+$('#volume').val()+"</td> <td>"+$('#flic_date').val()+"</td> <td>"+$('#blic_date').val()+"</td> <td>"+$('#insurance_from').val()+"-"+$('#insurance_end').val()+"</td> <td>"+$('#insurance_com').val()+"</td> <td>"+$('#insurance_amount').val()+"</td> <td> "+$('#line_type').val()+" </td> <td>"+$('#line').val()+"</td> <td><input type='hidden' value="+$("#url_truck_lic").val()+"#"+$("#url_truck_yy").val()+"#"+$("#url_truck_dj").val()+"#"+$("#url_truck_jqx").val()+"#"+$("#url_truck_syx").val()+"/><span class='view-detail'>查看详情</span> <span class='edit'>修改</span><input type='hidden' value='"+data.truck_id+"'/></td> </tr>");
                            $(".dialog").hide();
                            $(".shadow").hide();
                        }



                    }
                });
            }
            else
            {
                //修改车辆信息
                console.log("修改车辆信息");
                console.log(truck_id);

                $.ajax({
                    url: serverUrl + "truck",
                    type: 'put',
                    dataType: "json",
                    data:{
                        truck_id:truck_id,
                        plate:$("#province").val()+$("#carNo").val(),
                        brand:$("#brand").val(),
                        truck_type:$("#truck_type").val(),
                        power:$("#power").val(),
                        length:$("#length").val(),
                        volume:$("#volume").val(),
                        flic_date:$("#flic_date").val()+" 00:00:00",
                        blic_date:$("#blic_date").val()+" 00:00:00",
                        insurance_from:$("#insurance_from").val()+" 00:00:00",
                        insurance_end:$("#insurance_end").val()+" 00:00:00",
                        insurance_com:$("#insurance_com").val(),
                        insurance_amount:$("#insurance_amount").val(),
                        line_type:$("#line_type").val(),
                        line:$("#line").val(),
                        url_truck_lic:$("#url_truck_lic").val(),
                        url_truck_yy:$("#url_truck_yy").val(),
                        url_truck_dj:$("#url_truck_dj").val(),
                        url_truck_jqx:$("#url_truck_jqx").val(),
                        url_truck_syx:$("#url_truck_syx").val()
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader("token", userObj.token);
                    },
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        if(data.code==1800)
                        {
                            alert("修改成功！");


                            $("#carCount .number").each(function()
                            {
                               if(truck_number==$(this).text())
                               {
                                   var tdChild=$(this).parent().children("td");

                                   var inputChild=$($(this).parent().children("td")[14]).children("input")[0];

                                   $(tdChild[1]).text($("#province").val()+$("#carNo").val());
                                   $(tdChild[2]).text($("#brand").val());
                                   $(tdChild[3]).text($("#truck_type").val());
                                   $(tdChild[4]).text($("#power").val());
                                   $(tdChild[5]).text($("#length").val());
                                   $(tdChild[6]).text($("#volume").val());
                                   $(tdChild[7]).text($("#flic_date").val());
                                   $(tdChild[8]).text($("#blic_date").val());

                                   $(tdChild[9]).text($("#insurance_from").val()+"-"+$("#insurance_end").val());
                                   $(tdChild[10]).text($("#insurance_com").val());
                                   $(tdChild[11]).text($("#insurance_amount").val());
                                   $(tdChild[12]).text($("#line_type").val());
                                   $(tdChild[13]).text($("#line").val());


                                   inputChild.value=$("#url_truck_lic").val()+"#"+$("#url_truck_yy").val()+"#"+$("#url_truck_dj").val()+"#"+$("#url_truck_jqx").val()+"#"+$("#url_truck_syx").val();

                               }
                            });


                            $(".dialog").hide();
                            $(".shadow").hide();
                        }



                    }
                });
            }


        }
    });



    $("#addCarBtn").click(function()
    {

        addCarFlag=1;
        $("#add-car").show();
        $(".shadow").show();

        document.getElementById("carForm").reset();
        $("#url_truck_lic_span").html("");
        $("#url_truck_yy_span").html("");
        $("#url_truck_dj_span").html("");
        $("#url_truck_jqx_span").html("");
        $("#url_truck_syx_span").html("");



    });


    $("#checkbox").click(function()
    {
        if($("#checkbox").prop("checked"))
        {
            $(".cus-tip").hide();
        }

    });




    //tab切换
   /* $(".tab li").click(function()
    {

        var childId=$(this).attr("child-id");
        $(".main-step").hide();
        $("#"+childId).show();

        $(".tab li").removeClass("active1");
        $(".tab li").removeClass("active2");
        $(".tab li").removeClass("active3");

        if(childId=="step1")
        {
            $(this).addClass("active1");
        }
        else if(childId=="step2"||childId=="step3")
        {
            $(this).addClass("active2");
        }
        else {
            $(this).addClass("active3");
        }

    });*/

    $(".close-icon").click(function()
    {

        $(".dialog").hide();
        $(".shadow").hide();
    });


    //报表类型切换
    $("#tax-report").click(function()
    {
        $("#taxReportForm").show();
        $("#auditReportForm").hide();
    });
    $("#audit-report").click(function()
    {
        $("#taxReportForm").hide();
        $("#auditReportForm").show();
    });


});


function uploadImg(url,flag)
{
    var imgUrl=url+"?time="+new Date().getTime();
    $("#"+flag+"_span").html("<img src="+imgUrl+" />");
    $("#"+flag).next(".error").remove();
    $("#"+flag).val(url);
}


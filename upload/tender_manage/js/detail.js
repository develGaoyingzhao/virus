function getDetail()
{
    $("#getFullname").text($("#com_name").val());
    $("#getIntro").text($("#com_about").val());
    $("#getLicenseNo").text($("#buss_id").val());
    $("#getCapital").text($("#buss_money").val());
    $("#getOrganizationCode").text($("#entp_id").val());

    if($("#entp_id").val()=="")
    {
        $("#secondCertificate").hide();
        $("#thirdCertificate").hide();
        $("#secondCertificate2").hide();
        $("#thirdCertificate2").hide();
    }

    $("#getWayPermitCode").text($("#trans_id").val());
    $("#getLegalPersonName").text($("#legalp_name").val());
    $("#getLegalPersonPlace").text($("#legalp_home").val());
    $("#getLegalPersonIdNo").text($("#legalp_cid").val());
    $("#getLegalPersonPhone").text($("#legalp_phone").val());
    $("#getLegalPersonEmail").text($("#legalp_email").val());
    $("#getTaxRegistration").text($("#tax_id").val());
    $("#getBankNo").text($("#b_account").val());
    $("#getDepositBank").text($("#b_bank").val());
    $("#getName").text($("#contact_name").val());
    $("#getIdNo").text($("#contact_cid").val());
    $("#getNativePlace").text($("#contact_home").val());
    $("#getPhoneNo").text($("#contact_phone").val());
    $("#getEmail").text($("#contact_email").val());
    $("#getPosition").text($("#contact_postion").val());
    $("#getDepartment").text($("#contact_depart").val());

    $("#getLicensePic img").attr("src",$("#url_buss_id").val());
    $("#getOrganizationPic img").attr("src",$("#url_entp_id").val());
    $("#getWayPermitPic img").attr("src",$("#url_trans_id").val());
    $("#getLogisticsPolicy img").attr("src",$("#url_insurance").val());
    $("#getIdCardPhotoFront img").attr("src",$("#url_fcid").val());
    $("#getIdCardPhotoContrary img").attr("src",$("#url_bcid").val());
    $("#getTaxPhoto img").attr("src",$("#url_tax").val());
    $("#getPermitLicence img").attr("src",$("#url_b_passport").val());


    $("#getTaxpayersInfo img").attr("src",$("#url_b_taxer").val());

    if($("#url_audit_report").val()=="")
    {
        $("#getProfit img").attr("src",$("#url_profit").val());
        $("#getTaxeTable img").attr("src",$("#url_addtax").val());
        $("#getDebtTable img").attr("src",$("#url_property").val());
        $("#getAuditReport").parent().hide();
    }
        else {
        $("#getAuditReport img").attr("src",$("#url_audit_report").val());
        $("#getProfit").parent().hide();
        $("#getTaxeTable").parent().hide();
        $("#getDebtTable").parent().hide();
    }


    /*$.ajax({
        url: serverUrl + "trucks",
        type: 'get',
        dataType: "json",
        beforeSend: function(request) {
            request.setRequestHeader("token",userObj.token);
            request.setRequestHeader("shipper_id",1);
        },
        success: function (data) {
            console.log("车辆列表"+JSON.stringify(data));
            status=data.code;
            if(data.code==1800)
            {
                for(var i=0;i<data.data.length;i++)
                {
                    if(i%2==0)
                    {
                        $("#carCountInfo").append("<tr class='odd'><td>"+parseInt(i+1)+"</td><td>"+data.data[i].plate+"</td> <td>"+data.data[i].brand+"</td> <td>是</td> <td>"+data.data[i].length+"</td> <td>"+data.data[i].power+"</td> <td>"+data.data[i].volume+"</td> <td>"+new Date(data.data[i].flic_date).Format("yyyy-MM-dd")+"</td> <td>"+new Date(data.data[i].blic_date).Format("yyyy-MM-dd")+"</td> <td>"+new Date(data.data[i].insurance_from).Format("yyyy-MM-dd")+"-"+new Date(data.data[i].insurance_end).Format("yyyy-MM-dd")+"</td> <td>"+data.data[i].insurance_com+"</td> <td>"+data.data[i].insurance_amount+"</td> <td> "+data.data[i].line_type+" </td> <td>"+data.data[i].line+"</td></tr>");

                    }
                    else {
                        $("#carCountInfo").append("<tr><td>"+parseInt(i+1)+"</td><td>"+data.data[i].plate+"</td> <td>"+data.data[i].brand+"</td> <td>是</td> <td>"+data.data[i].length+"</td> <td>"+data.data[i].power+"</td> <td>"+data.data[i].volume+"</td> <td>"+new Date(data.data[i].flic_date).Format("yyyy-MM-dd")+"</td> <td>"+new Date(data.data[i].blic_date).Format("yyyy-MM-dd")+"</td> <td>"+new Date(data.data[i].insurance_from).Format("yyyy-MM-dd")+"-"+new Date(data.data[i].insurance_end).Format("yyyy-MM-dd")+"</td> <td>"+data.data[i].insurance_com+"</td> <td>"+data.data[i].insurance_amount+"</td> <td> "+data.data[i].line_type+" </td> <td>"+data.data[i].line+"</td></tr>");

                    }
                }

                $(".view-detail").click(function()
                {

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

                $(".edit").click(function()
                {

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


}

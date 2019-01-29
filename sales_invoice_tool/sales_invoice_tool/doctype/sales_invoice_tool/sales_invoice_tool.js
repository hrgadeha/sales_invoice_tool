// Copyright (c) 2019, Hardik Gadesha and contributors
// For license information, please see license.txt

frappe.ui.form.on('Sales Invoice Tool', {
	"additional_discount_type": function(frm) {
		frm.set_value("additional_discount_amount", "");
		frm.set_value("additional_discount_percentage", "");
	}
});

frappe.ui.form.on('Sales Invoice Tool', {
	"additional_discount_percentage": function(frm) {
		var additional_discount_amount = frm.doc.additional_discount_amount;
		var additional_discount_percentage = frm.doc.additional_discount_percentage;
		var total = frm.doc.total;
	
	if(frm.doc.additional_discount_type == "Amount"){
		var net_total = total - additional_discount_amount;
		frm.set_value("net_total", net_total);
		frm.set_value("temp_total", net_total);		
	}
	if(frm.doc.additional_discount_type == "Percentage"){
		var net_total = total - (additional_discount_percentage / 100) * total;
		frm.set_value("net_total", net_total);	
		frm.set_value("temp_total", net_total);	
	}
	}
});

frappe.ui.form.on('Sales Invoice Tool', {
	"additional_discount_amount": function(frm) {
		var additional_discount_amount = frm.doc.additional_discount_amount;
		var additional_discount_percentage = frm.doc.additional_discount_percentage;
		var total = frm.doc.total;
	
	if(frm.doc.additional_discount_type == "Amount"){
		var net_total = total - additional_discount_amount;
		frm.set_value("net_total", net_total);
		frm.set_value("temp_total", net_total);		
	}
	if(frm.doc.additional_discount_type == "Percentage"){
		var net_total = total - (additional_discount_percentage / 100) * total;
		frm.set_value("net_total", net_total);
		frm.set_value("temp_total", net_total);		
	}
	}
});


cur_frm.add_fetch("item_code","item_name","item_name")
cur_frm.add_fetch("item_code","description","description")
cur_frm.add_fetch("item_code","standard_rate","rate")
cur_frm.add_fetch("item_code","stock_uom","uom")
cur_frm.add_fetch("item_code","standard_rate","rate")
cur_frm.add_fetch("item_code","standard_rate","rate")
cur_frm.add_fetch("item_code","standard_rate","rate")



frappe.ui.form.on("Sales Invoice Tool Item", {
	"qty": function(frm, cdt, cdn) {	
		cur_frm.refresh();
		cur_frm.refresh_fields();
		var d = locals[cdt][cdn];
		frappe.model.set_value(d.doctype, d.name, "amount", (d.qty * d.rate));
		var total = 0;
		var sales_invoice = frm.doc.sales_invoice_tool_item;

   	for(var i in sales_invoice) {
		total = total + sales_invoice[i].amount;
        	frm.set_value("total", total);
		frm.set_value("net_total", total);
		frm.set_value("temp_total", total);
	}
	}
});

frappe.ui.form.on("Sales Invoice Tool Item", {
	"rate": function(frm, cdt, cdn) {
		cur_frm.refresh();
		cur_frm.refresh_fields();
		var d = locals[cdt][cdn];
		frappe.model.set_value(d.doctype, d.name, "amount", (d.qty * d.rate));
		var total = 0;
		var sales_invoice = frm.doc.sales_invoice_tool_item;

   	for(var i in sales_invoice) {
		total = total + sales_invoice[i].amount;
        	frm.set_value("total", total);
		frm.set_value("net_total", total);
		frm.set_value("temp_total", total);
	}
}
});

frappe.ui.form.on("Sales Invoice Tool Item", {
	"sales_invoice_tool_item_remove": function(frm, cdt, cdn) {
		cur_frm.refresh();
		cur_frm.refresh_fields();
		var d = locals[cdt][cdn];
		var total = 0;
		var sales_invoice = frm.doc.sales_invoice_tool_item;
		console.log(total)

   	for(var i in sales_invoice) {
		total = total + sales_invoice[i].amount;
        	frm.set_value("total", total);
		frm.set_value("net_total", total);
		frm.set_value("temp_total", total);
	}
}
});

frappe.ui.form.on("Sales Invoice Tool Item",{
	"item_code" : function (frm, cdt, cdn){
	var d2 = locals[cdt][cdn];
	if(d2.warehouse){
	frappe.call({
		"method": "sales_invoice_tool.sales_invoice_tool.doctype.sales_invoice_tool.sales_invoice_tool.getStockBalance",
		args: {
			item_code: d2.item_code,
			warehouse: d2.warehouse
		},
		callback:function(r){
		var myJSON = JSON.stringify(r);
		var myJSONnew = myJSON.match(/\d+/g).map(Number);
		msgprint(d2.item_code+ " has Stock QTY : " +myJSONnew+ " in Warehouse : " +d2.warehouse)
;}
});
}
}
});

frappe.ui.form.on("Sales Invoice Tool Item",{
	"warehouse" : function (frm, cdt, cdn){
	var d2 = locals[cdt][cdn];
	if(d2.item_code){
	frappe.call({
		"method": "sales_invoice_tool.sales_invoice_tool.doctype.sales_invoice_tool.sales_invoice_tool.getStockBalance",
		args: {
			item_code: d2.item_code,
			warehouse: d2.warehouse
		},
		callback:function(r){
		var myJSON = JSON.stringify(r);
		var myJSONnew = myJSON.match(/\d+/g).map(Number);
		msgprint(d2.item_code+ " has Stock QTY : " +myJSONnew+ " in Warehouse : " +d2.warehouse)
;}
});
}
}
});

frappe.ui.form.on("Sales Invoice Tool", {
    "taxes": function(frm) {
		var total_taxes_and_charges = 0;
		var net_total = frm.doc.net_total;
		var grand_total = 0;
	if (frm.doc.taxes!= ""){
        	frappe.model.with_doc("Sales Taxes and Charges Template", frm.doc.taxes, function() {
		cur_frm.clear_table("sales_taxes_and_charges");
            		var tabletransfer= frappe.model.get_doc("Sales Taxes and Charges Template", frm.doc.taxes)
            		$.each(tabletransfer.taxes, function(index, row){
                		var d = frm.add_child("sales_taxes_and_charges");
                		d.charge_type = row.charge_type;
				d.account_head = row.account_head;
				d.rate = row.rate;
				d.tax_amount = (row.rate / 100) * frm.doc.net_total;
				d.total = d.tax_amount + frm.doc.temp_total;
				d.cost_center = row.cost_center;
				d.description = row.description;
				total_taxes_and_charges += d.tax_amount;
			frm.set_value("total_taxes_and_charges", total_taxes_and_charges);
				grand_total = net_total + total_taxes_and_charges;
			frm.set_value("grand_total", grand_total);
			frm.set_value("temp_total", d.total);
                	frm.refresh_field("sales_taxes_and_charges");
            });
        });
    }
}
});

frappe.ui.form.on("Sales Invoice Tool", {
    "additional_discount_amount": function(frm) {
		var total_taxes_and_charges = 0;
		var net_total = frm.doc.net_total;
		var grand_total = 0;
	if (frm.doc.taxes != ""){
        	frappe.model.with_doc("Sales Taxes and Charges Template", frm.doc.taxes, function() {
		cur_frm.clear_table("sales_taxes_and_charges");
            		var tabletransfer= frappe.model.get_doc("Sales Taxes and Charges Template", frm.doc.taxes)
            		$.each(tabletransfer.taxes, function(index, row){
                		var d = frm.add_child("sales_taxes_and_charges");
                		d.charge_type = row.charge_type;
				d.account_head = row.account_head;
				d.rate = row.rate;
				d.tax_amount = (row.rate / 100) * frm.doc.net_total;
				d.total = d.tax_amount + frm.doc.temp_total;
				d.cost_center = row.cost_center;
				d.description = row.description;
				total_taxes_and_charges += d.tax_amount;
			frm.set_value("total_taxes_and_charges", total_taxes_and_charges);
				grand_total = net_total + total_taxes_and_charges;
			frm.set_value("grand_total", grand_total);
			frm.set_value("temp_total", d.total);
                	frm.refresh_field("sales_taxes_and_charges");
            });
        });
    }
}
});

frappe.ui.form.on("Sales Invoice Tool", {
    "additional_discount_percentage": function(frm) {
		var total_taxes_and_charges = 0;
		var net_total = frm.doc.net_total;
		var grand_total = 0;
	if (frm.doc.taxes != ""){
        	frappe.model.with_doc("Sales Taxes and Charges Template", frm.doc.taxes, function() {
		cur_frm.clear_table("sales_taxes_and_charges");
            		var tabletransfer= frappe.model.get_doc("Sales Taxes and Charges Template", frm.doc.taxes)
            		$.each(tabletransfer.taxes, function(index, row){
                		var d = frm.add_child("sales_taxes_and_charges");
                		d.charge_type = row.charge_type;
				d.account_head = row.account_head;
				d.rate = row.rate;
				d.tax_amount = (row.rate / 100) * frm.doc.net_total;
				d.total = d.tax_amount + frm.doc.temp_total;
				d.cost_center = row.cost_center;
				d.description = row.description;
				total_taxes_and_charges += d.tax_amount;
			frm.set_value("total_taxes_and_charges", total_taxes_and_charges);
				grand_total = net_total + total_taxes_and_charges;
			frm.set_value("grand_total", grand_total);
			frm.set_value("temp_total", d.total);
                	frm.refresh_field("sales_taxes_and_charges");
            });
        });
    }
}
});

frappe.ui.form.on("Sales Invoice Tool", {
  "gate_sales_invoice_list": function(frm) {
	cur_frm.refresh();
	cur_frm.clear_table("created_sales_invoice_table");
	cur_frm.refresh_fields();
	
    frappe.call({
    "method": "sales_invoice_tool.sales_invoice_tool.doctype.sales_invoice_tool.sales_invoice_tool.insert_data",
args: {
doctype: "Sales Invoice",
name: frm.doc.name
},
callback:function(r){
	var len=r.message.length;
	console.log(r)
	for (var i=0;i<len;i++){
	        var row = frm.add_child("created_sales_invoice_table");
		row.sales_invoice = r.message[i][0];
		row.bill_amount = r.message[i][1];
	}
		cur_frm.refresh();
	}
    });
}
});

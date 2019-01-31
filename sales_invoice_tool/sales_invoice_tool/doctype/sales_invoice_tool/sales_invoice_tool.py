# -*- coding: utf-8 -*-
# Copyright (c) 2019, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe import msgprint
from frappe.model.document import Document
from frappe.utils import money_in_words

class SalesInvoiceTool(Document):
	def validate(self):
		items = []
		for d in self.sales_invoice_tool_item:
			item_li = {"item_code": d.item_code,"qty": d.qty,"rate": d.rate,"warehouse":d.warehouse}
			items.append(item_li)
		sales_invoice = frappe.get_doc({
		"doctype": "Sales Invoice", 
		"customer": self.customer_name, 
		"posting_date": self.posting_date,
		"base_discount_amount":self.additional_discount_amount,
		"additional_discount_percentage":self.additional_discount_percentage,
		"apply_discount_on":"Net Total",
		"total":self.total,
		"taxes_and_charges":self.taxes,
		"created_from":self.name,
		"items": items
		})
		sales_invoice.insert(ignore_permissions=True)
		sales_invoice.save()

@frappe.whitelist(allow_guest=True)
def getStockBalance(item_code, warehouse):
	balance_qty = frappe.db.sql("""select qty_after_transaction from `tabStock Ledger Entry`
		where item_code=%s and warehouse=%s and is_cancelled='No'
		order by posting_date desc, posting_time desc, name desc
		limit 1""",(item_code,warehouse))
	return balance_qty[0][0] if balance_qty else 0.0

@frappe.whitelist(allow_guest=True)
def insert_data(doctype, name):
	query="select name, grand_total from `tabSales Invoice` where created_from = '"+str(name)+"';"
	li=[]
	dic=frappe.db.sql(query, as_dict=True)
	for i in dic:
		name,grand_total=i['name'],i['grand_total']
		li.append([name,grand_total])
	return li

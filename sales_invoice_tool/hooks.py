# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "sales_invoice_tool"
app_title = "Sales Invoice Tool"
app_publisher = "Hardik Gadesha"
app_description = "Application for creating multiple invoice from 1 tool"
app_icon = "octicon octicon-file-directory"
app_color = "'black'"
app_email = "hardikgadesha@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/sales_invoice_tool/css/sales_invoice_tool.css"
# app_include_js = "/assets/sales_invoice_tool/js/sales_invoice_tool.js"

# include js, css files in header of web template
# web_include_css = "/assets/sales_invoice_tool/css/sales_invoice_tool.css"
# web_include_js = "/assets/sales_invoice_tool/js/sales_invoice_tool.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "sales_invoice_tool.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "sales_invoice_tool.install.before_install"
# after_install = "sales_invoice_tool.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "sales_invoice_tool.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

#doc_events = {
#	"Sales Invoice": {
#		"on_update": "erpnext.controllers.taxes_and_totals.calculate_taxes_and_totals",
#	}
#}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"sales_invoice_tool.tasks.all"
# 	],
# 	"daily": [
# 		"sales_invoice_tool.tasks.daily"
# 	],
# 	"hourly": [
# 		"sales_invoice_tool.tasks.hourly"
# 	],
# 	"weekly": [
# 		"sales_invoice_tool.tasks.weekly"
# 	]
# 	"monthly": [
# 		"sales_invoice_tool.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "sales_invoice_tool.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "sales_invoice_tool.event.get_events"
# }


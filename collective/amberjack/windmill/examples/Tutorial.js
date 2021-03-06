// Generated by the windmill services transformer
var test_Tutorial = new function() {
    this.test_actions = [
{"params": {"descStep": "<p>Folders are one of the most fundamental content types in Plone. You can use a folder to organize your documents much like you already do on your desktop computer. You can also use folders to create new sections of your website.</p>", "nameStep": "Create_a_new_folder", "url": "http://localhost:8080/Plone", "titleTut": "Add publish page&folder", "locators": "", "description": "If you don't want to perform the indicated step yourself, just click the '>>' link and it will be automatically done by your browser."}, "method": "highlight"},
{"params": {"xpath": "//dl[@id='plone-contentmenu-factories']/dt/a/span[1]", "nameStep": "Create_a_new_folder", "description": "Click the [Add new...] drop-down menu."}, "method": "click"},
{"params": {"xpath": "//a[@id='folder']/span", "nameStep": "Create_a_new_folder", "description": "Select [Folder] from the menu."}, "method": "click"},
{"params": {"nameStep": "Create_a_new_folder", "timeout": "20000", "description": ""}, "method": "waits.forPageLoad"},
{"params": {"descStep": "", "nameStep": "Fill_out_the_fields", "url": "http://localhost:8080/Plone/portal_factory/Folder/folder.2010-06-11.9668720453/edit", "text": "new folder", "titleTut": "Add publish page&folder", "id": "title", "description": "In the [Title] field, type 'new folder'."}, "method": "type"},
{"params": {"text": "a folder", "description": "In the [Description] field, type 'a folder'.", "nameStep": "Fill_out_the_fields", "id": "description"}, "method": "type"},
{"params": {"description": "Now click the [Save] button at the bottom of the page to save your new folder.", "nameStep": "Fill_out_the_fields", "name": "form.button.save"}, "method": "click"},
{"params": {"nameStep": "Fill_out_the_fields", "timeout": "20000", "description": ""}, "method": "waits.forPageLoad"},
{"params": {"xpath": "//dl[@id='plone-contentmenu-workflow']/dt/a/span[2]", "descStep": "<p>You have now created a Folder for your Plone website. Before this folder can be viewed by anonymous site visitors, you must publish it.</p>", "nameStep": "publish_folder", "url": "http://localhost:8080/Plone/new-folder/", "titleTut": "Add publish page&folder", "description": "Click the [State] drop-down menu."}, "method": "click"},
{"params": {"description": "Select [Publish] from the menu.", "nameStep": "publish_folder", "id": "workflow-transition-publish"}, "method": "click"},
{"params": {"nameStep": "publish_folder", "timeout": "20000", "description": ""}, "method": "waits.forPageLoad"},
{"params": {"descStep": "<p>You now have a folder on your Plone website.</p>", "nameStep": "folder_create", "url": "http://localhost:8080/Plone/new-folder/", "titleTut": "Add publish page&folder", "locators": "", "description": ""}, "method": "highlight"},
{"params": {"nameStep": "folder_create", "timeout": "20000", "description": ""}, "method": "waits.forPageLoad"},
{"params": {"xpath": "//dl[@id='plone-contentmenu-factories']/dt/a/span[1]", "descStep": "<p>Now you'll create a new Page and publish it on your Plone-powered website.</p>", "nameStep": "Add_and_publish_a_Page", "url": "http://localhost:8080/Plone/new-folder/", "titleTut": "Add publish page&folder", "description": "Click the [Add new...] drop-down menu."}, "method": "click"},
{"params": {"xpath": "//a[@id='document']/span", "nameStep": "Add_and_publish_a_Page", "description": "Select [Page] from the menu."}, "method": "click"},
{"params": {"nameStep": "Add_and_publish_a_Page", "timeout": "20000", "description": ""}, "method": "waits.forPageLoad"},
{"params": {"descStep": "<p>Now that you selected the Page content type, you need to supply some information about it.</p>", "nameStep": "Add_a_Page", "url": "http://localhost:8080/Plone/new-folder/portal_factory/Document/document.2010-06-11.0514121006/edit", "text": "new page", "titleTut": "Add publish page&folder", "id": "title", "description": "Provide a [Title]: New page."}, "method": "type"},
{"params": {"text": "a page", "description": "Provide a [Description]: a page.", "nameStep": "Add_a_Page", "id": "description"}, "method": "type"},
{"params": {"description": "", "nameStep": "Add_a_Page", "timeout": "40000", "id": "text"}, "method": "waits.forElement"},
{"params": {"nameStep": "Add_a_Page", "description": "Add some page content in the [Body Text] field ", "editor": "<p>body text</p>", "id": "text"}, "method": "editor"},
{"params": {"nameStep": "Add_a_Page", "description": "highlight 'body'", "bookmark": "{\"start\":0,\"end\":4,\"scrollX\":0,\"scrollY\":0,\"beg\":true}", "text": "body", "id": "text"}, "method": "editorSelect"},
{"params": {"description": "click the [bold button]", "nameStep": "Add_a_Page", "id": "text_bold"}, "method": "click"},
{"params": {"description": "[Save] the page.", "nameStep": "Add_a_Page", "name": "form.button.save"}, "method": "click"},
{"params": {"nameStep": "Add_a_Page", "timeout": "20000", "description": ""}, "method": "waits.forPageLoad"},
{"params": {"xpath": "//dl[@id='plone-contentmenu-workflow']/dt/a", "descStep": "<p>You have now created a Page for your Plone website. Before this page can be viewed by anonymous site visitors, you must publish it.</p>", "nameStep": "Publish_the_page", "url": "http://localhost:8080/Plone/new-folder/new-page", "titleTut": "Add publish page&folder", "description": "Click the [State] drop-down menu."}, "method": "click"},
{"params": {"description": "Select [Publish] from the menu.", "nameStep": "Publish_the_page", "id": "workflow-transition-publish"}, "method": "click"}
    ];
}

$(document).ready(function () {
    var submit_btn = $('.input-new-task .submit_btn');
    submit_btn.click(add_new_task);

    $('.toggle-done').change(function(){
        $(this).parent().toggleClass("task-done");
    });
});

function add_new_task() 
{
    var input_box = $('.input-new-task input');
    var task_list = $('#todo-list');
    
    new_task = input_box.val();
    if(new_task != '' && new_task != " " && new_task != null && new_task != undefined)
    {
        no_of_tasks = $('.todo-list-item').length;
        new_task_id = "task_"+(no_of_tasks+1);
        delete_icon = "<span onclick=remove_task(" + "'" + new_task_id + "'" + ") class='del_icon'><i class='fa fa-trash'></i></span>";
        task_list.append("<li class='todo-list-item' id="+new_task_id+">" + new_task + delete_icon + "</li>");
        input_box.val(null);
        input_box.attr("placeholder", "New Task");
    }
}

function remove_task(task_id)
{
    task_to_be_removed = $('#'+task_id);
    task_to_be_removed.fadeOut("slow", 0, task_to_be_removed.remove());
}
$(document).ready(function () {

    var tools = {
        pluralize: function (element, word) {
            return element > 1 ? word + 's' : word;
        },
        showHide: function (trigger, element) {
            return !trigger.length ? element.fadeOut() : element.fadeIn();
        }
    };

    var App = {

        init: function () {
            this.getElements();
            this.events();
        },

        getElements: function () {
            form = $('.app-todo');
            add = $('.add-todo');
            list = $('.list');
            options = $('.options');
            items = $('.items');
            clear = $('.clear');
            close = $('.close');
            check = $('.done-todo');
            task = ({
                template: function (desc) {
                    return '<li class="li-todo"><input name="done-todo" type="checkbox" class="done-todo"><p class="desc" style="width: 70%;">' + desc + '</p> <span class="close">X</span></li>';
                }
            });
            numOfTasks = $('.tasks');
            getTasks = 0;
        },

        events: function () {
            form.submit(this.create);
            check.live('click', this.toggleDone);
            $('.close').live('click', this.toggleDoneClose);
            clear.click(this.clearCompleted);
            $('.desc').live('dblclick', this.edit);
        },


        //what happens when we create a new task
        create: function (e) {
            e.preventDefault();
            //insert the 'li' that represent the new task
            list.prepend(task.template(add.val()));
            //clean the input
            add.val('');
            getTasks++;

            App.render();
        },

        toggleDone: function () {
            $(this).next().toggleClass('checked');
            $(this).next().hasClass('checked') ? getTasks-- : getTasks++;

            App.render();
        },

        toggleDoneClose: function () {
            $(this).parent().remove();
            $(this).next().toggleClass('close');
            $(this).next().hasClass('close') ? getTasks++ : getTasks--;

            App.render();
        },

        clearCompleted: function () {
            listItems.find('input:checked').parent().remove();

            App.render();
        },

        edit: function () {
            $(this).next().show()
                .parent().addClass('white');
            $(this).attr('contentEditable', 'true').focus().keypress(function (event) {
                //$(".white").css("border","1px solid #ccc");
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode == '13') {
                    //when editing and press enter, take off contenteditable attr and set outline none to take the focus off
                    event.target.blur();
                    $(this).attr('contenteditable', 'false').parent().removeClass('white');
                    $('.close').show();
                }
            });
        },

        render: function () {
            listItems = $('.list li');
            //get task or tasks
            items.html(tools.pluralize(getTasks, 'task'));
            //show the number of tasks created
            numOfTasks.html(getTasks);
            //call the method that show options and clear option
            tools.showHide(listItems.find('input:checked'), clear);
            tools.showHide(listItems, options);
        }
    };

    App.init();
});
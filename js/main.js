const $   = require("jquery");
const app = require("./class/App");


app.loadEventsFromDb();



app.$form.submit(function(event){
    event.preventDefault();


    if (app.editedEvent){

        app.updateEvent();
    }

    else {
        app.addEvent();
        void window.location.reload();
    }
});

app.$event_container.on("click", ".remove, .edit", function(){

    const $parent   = $(this).parent();
    const $this     = $(this);
    const $events    = app.$event_container.find(".event");
    const position  = $events.index($parent);

    if($this.hasClass("remove")) {

        app.removeEventAtIndex(position);
        // app.resetForm();
    }

    else{
        app.editEventAtIndex(position);

    }
});




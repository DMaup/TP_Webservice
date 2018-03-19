const $             = require("jquery");
const Event         = require("./Event");
const Service       = require("./Service");
const API_BASE_URL  = "http://localhost/APIS/TP_Webservice/";

class App{
    constructor(){
        this.$form              = $("#form-event");
        this.$event_title       = $("#event_title");
        this.$description       = $("#description");
        this.$address           = $("#address");
        this.$date              = $("#date");
        this.$time              = $("#time");
        this.$category          = $("#category");
        this.$event_container   = $("#events");

        this.$submit            = this.$form.find("input[type='submit']");

        this.events = [];

        this.editedEvent = false;

        this.service = new Service();
    };

    resetForm() {
        this.$event_title.val("");
        this.$description.val("");
        this.$address.val("");
        this.$date="";
        this.$category.val("");
        this.$submit.val("Ajouter");
        this.editedEvent = false;
    };

    addEvent(){

        const event_title   = this.$event_title.val();
        const description   = this.$description.val();
        const address       = this.$address.val();
        const date          = this.$date.val() + " " + this.$time.val() + ":00";
        const time          = this.$time.val();

        //const category      = this.$category.val();



        if(!event_title || !description || !address || !date) return false;
        const create_data = {
            event_title: event_title,
            description: description,
            address: address,
            date: date
            //category: category
        };
        console.log(create_data);



        this.service.createEvent(
            create_data,
            (response) => {
                if (response.success) {
                    const event = new Event(event_title, description, address, new Date());
                    event.event_id = response.event_id;

                    this.events.push(event);
                    event.render(this.$event_container);
                    this.resetForm();
                    console.log("L'évènement a été créé!");
                }
                else {
                    console.log("L'évènement ne peut pas être créé!");
                }
            }
        )
    };

    removeEventAtIndex(position){

        const event = this.events[ position ];
        this.service.removeEvent(
            event.event_id,
            (response)=> {
                if (response.success) {

                    event.remove();
                    this.events.splice(position, 1);
                    void window.location.reload();
                }
            }
        )

    };

    editEventAtIndex(position){
        this.editedEvent = this.events[ position ];
        this.day = this.editedEvent.date.getDate();
        if(this.day<10){
            this.day = '0' + this.day;
        }
        this.month = this.editedEvent.date.getMonth();
        this.month = this.month + 1;
        if(this.month < 10){
            this.month = '0' + this.month;
        }
        this.year = this.editedEvent.date.getFullYear();
        this.hour = this.editedEvent.date.getHours();
        if(this.hour<10){
            this.hour = '0' + this.hour;
        }
        this.min = this.editedEvent.date.getMinutes();
        if(this.min<10){
            this.min = '0' + this.min;
        }

        this.$submit.val("Editer");
        this.$event_title.val(this.editedEvent.event_title);
        this.$description.val(this.editedEvent.description);
        this.$address.val(this.editedEvent.address);
        this.$date.val(this.year + "-" + this.month + "-" + this.day);
        this.$time.val(this.hour + ":" + this.min + ":00");
        //this.$date.val(this.editedEvent.date);
        this.$category.val(this.editedEvent.category);
    };


    updateEvent(){
        const event_title   = this.$event_title.val();
        const description   = this.$description.val();
        const address       = this.$address.val();
        const date          = this.$date.val() + " " + this.$time.val();
        //const category      = this.$category.val();
        console.log(date);

        if(!event_title || !description) return false;
        const update_data = {
            event_title: event_title,
            description: description,
            address: address,
            date: date
            //category: category
        };

        this.service.updateEvent(
            update_data,
            this.editedEvent.event_id,
            (response)=> {
                if(response.success) {
                    this.editedEvent.event_title = event_title;
                    this.editedEvent.description = description;
                    this.editedEvent.address = address;
                    this.editedEvent.date = new Date();
                    //this.editedEvent.category = category;
                    this.editedEvent.update();
                    this.resetForm();
                    void window.location.reload();
                    console.log("Evènement mis à jour!");

                }
                else{
                    console.log("Edition impossible!");
                }
            });

        return true;
    };

    loadEventsFromDb(){
        this.service.getAllEvents((response)=>{

            if(response.success){
                this.generateEvents(response.events);

            }

            else {
                this.events = [];
            }
        });

    };

    toJSON(){
        return{
            event_title: this.$event_title,
            description: this.$description,
            address: this.$address,
            date: this.$date,
            category: this.$category
        }
    };

    generateEvents(json_events){
        for (let json_event of json_events){
            const date = new Date( json_event.date);
            const event = new Event( json_event.event_title, json_event.description, json_event.address, date, json_event.category);
            event.event_id = json_event.event_id;
            this.events.push(event);

            event.render(this.$event_container);
        }
    };

}

module.exports =new App();
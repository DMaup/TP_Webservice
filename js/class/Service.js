const $             = require("jquery");
const API_BASE_URL  = "http://localhost/APIS/TP_Webservice/";

class Service {

    getAllEvents(callback){
        $.ajax({
            url: API_BASE_URL + "event",
            dataType: "json",
            method: "GET",

            success: callback,

            error: function (error) {
                console.log(error);
            }

        });
    }

    createEvent(data, callback){
        $.ajax({
            url: API_BASE_URL + "event",
            method: "POST",
            data: data,
            dataType:"json",
            success: callback,
            error: (err)=>{
                console.log(err);
            }
        });
    }

    updateEvent(data, id, callback){
        $.ajax({
            url: API_BASE_URL + "event/" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType:"json",
            success: callback,
            error: (err)=>{
                console.log(err);
            }
        });
    }

    removeEvent(id, callback){
        $.ajax({
            url: API_BASE_URL + "event/" + id,
            method: "DELETE",
            dataType:"json",
            success: callback,
            error: (err)=>{
                console.log(err);
            }
        });
    }
}

module.exports = Service;
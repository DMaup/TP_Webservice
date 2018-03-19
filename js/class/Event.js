const $ = require("jquery");

class Event {

    constructor( event_title, description, address, date, category){
        this.$dom           = null;
        this.$id            = null;
        this.$event_title   = null;
        this.$description   = null;
        this.$address       = null;
        this.$date          = null;
        this.$category      = null;
        this.event_id       = 0;
        this.event_title    = event_title;
        this.description    = description;
        this.address        = address;
        this.date           = date;
        this.category       = category;
    }

    render( $parent ){

        let html = "<div class='event'>";
        html += "<div class='edit'>📝</div>";
        html += "<div class='remove'>🚽</div>";
        html += "</div>";

        this.$dom           = $( html );

        this.$event_title   = $("<h4>" + this.event_title + "</h4>");
        this.$description   = $("<p>" + this.description + "</p>");
        this.$address       = $("<p>A : " + this.address + "</p>");
        this.$date          = $("<p>Le " + this.date.toLocaleString("fr") + "</p>");
        this.$category      = $("<p>" + this.category + "</p><br>");

        //Créer un élément (dom) dynamiquement

        this.$dom.append( this.$event_title );
        this.$dom.append( this.$description );
        this.$dom.append( this.$address);
        this.$dom.append( this.$date );
        this.$dom.append( this.$category );

        //On ajoute l'élement dans le dom parent
        $parent.append( this.$dom );
    }

    remove(){
        this.$dom.remove();
    }

    update(){
        this.$event_title.html( this.event_title );
        this.$description.html( this.description );
        this.$address.html(this.address);
        this.$date.html(this.date);
        this.$category.html(this.category);
    }

    toJSON(){
        return{
            event_title: this.event_title,
            description: this.description,
            date: this.date,
            address: this.address,
            category: this.category
        }
    }

}

module.exports = Event;
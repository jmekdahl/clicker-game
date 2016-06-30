rivets.configure({
    handler: function (target, event, binding){
        this.call(binding.model, target, event, binding);
    }
});

rivets.formatters.propertyList = function(obj){
    return(
        function(){
            var properties=[];
            for(var key in obj){
                properties.push({key:key,value:obj[key]});
            }
            return properties;
        }
    )();
};


var SpellClicker = SpellClicker || {};
SpellClicker.game = {};

SpellClicker.Spell = function(name, damage, image){
    this.name = name;
    this.damage = damage;
    this.image = "/clicker-game/assets/img/spell-icons/" + image;
    this.cast = function(){
        var rem_index = SpellClicker.game.spellQueue.indexOf(this);
        SpellClicker.game.spellQueue.splice(rem_index, 1);
    };
};

SpellClicker.game.spellQueue = [];

SpellClicker.Spells = {
    'lightning1': new SpellClicker.Spell('Lightning Bolt', 10, "lighting-blue-1.png"),
    'frost1': new SpellClicker.Spell('Ice Lance', 2, "ice-blue-1.png"),
    'fire1': new SpellClicker.Spell('Fire Bolt', 15, "fireball-red-1.png")
};

SpellClicker.getSpell = function(obj){
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
}

SpellClicker.tick = function(){
    if(SpellClicker.game.spellQueue.length < 6 ){
        var newSpell = Object.create(SpellClicker.getSpell(SpellClicker.Spells));
        SpellClicker.game.spellQueue.push(newSpell);
    } else {
        SpellClicker.game.spellQueue[0].cast();
    }
};

SpellClicker.loop = setInterval(SpellClicker.tick, 1000);

$(document).ready( function() {
    rivets.bind($('#game'), SpellClicker.game);
});

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

// Spell Management And Pool
var SpellClicker = SpellClicker || {};
SpellClicker.game = {};

SpellClicker.Spell = function(name, damage, image, multiplier){
    this.name = name;
    this.damage = damage;
    this.image = "/clicker-game/assets/img/spell-icons/" + image;
    this.multiplier = ( typeof multiplier === 'undefined') ? this.multiplier = 0.25 : multiplier;
    this.cast = function(){
        SpellClicker.Roll(this);

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
};

// Player
SpellClicker.Player = function(name){
    this.name = name;
    this.critical = 0.05;
    this.accuracy = 0.8;
};

SpellClicker.game.Player = Object.create(Player("Player 1"));

// Damage Roll
SpellClicker.Roll = function(spell){
    var spellHits = Math.random() > (1 - SpellClicker.game.Player.accuracy),
        spellCrits = Math.random() > (1- SpellClicker.game.Player.critical),
        damageDone = 0;

    if ( spellHits ) {
        damageDone = spell.damage;
        if ( spellCrits ) {
            damageDone = damageDone * 1.5;
        }
    }

    outcome = damageDone === 0 ? "Fizzle!" : damageDone;
    console.log(outcome);
};


// Game Loop
SpellClicker.tick = function(){
    if(SpellClicker.game.spellQueue.length >= 6 ){
        SpellClicker.game.spellQueue[0].cast();
    }
    
    var newSpell = Object.create(SpellClicker.getSpell(SpellClicker.Spells));
    SpellClicker.game.spellQueue.push(newSpell);
};

SpellClicker.loop = setInterval(SpellClicker.tick, 1000);

$(document).ready( function() {
    rivets.bind($('#game'), SpellClicker.game);
});

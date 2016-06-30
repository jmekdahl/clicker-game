var SpellClicker = SpellClicker || {};

SpellClicker.Spell = function(name, damage, image){
    this.name = name;
    this.damage = damage;
    this.image = "/assets/img/spell-icons/" + image;
    this.cast = function(){
        console.log("cast event");
    };
};

SpellClicker.Spells = {
    'lightning1': new SpellClick.Spell('Lightning Bolt', 10, "lighting-blue-1.png")
};

SpellClicker.game.spellQueue = [
    Object.clone(SpellClicker.SpellPool.lightning1)
];



// rivets.formatters.propertyList = function(obj){
//     return(
//         function(){
//             var properties=[];
//             for(var key in obj){
//                 properties.push({key:key,value:obj[key]});
//             }
//             return properties;
//         })();
// };

// rivets.formatters.or = function(value,args){
//     return value||args;
// };
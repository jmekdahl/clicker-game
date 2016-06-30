<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Spell Clicker Game</title>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <script src="http://code.jquery.com/jquery-3.0.0.min.js"></script>
        <script src="/clicker-game/assets/vendor/rivets/rivets.0.8.0.bundled.min.js"></script>
        <script src="/clicker-game/assets/js/spellClicker.js"></script>

        <link href='https://fonts.googleapis.com/css?family=Cinzel:400,700,900' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="/clicker-game/assets/css/normalize.css">
        <link rel="stylesheet" type="text/css" href="/clicker-game/assets/css/styles.css">
    </head>
    <body>
        <div id="game">
            <ul class="enemies">
                <li rv-each-enemy="Enemies">{enemy.name}:{enemy.hitpoints}</li>
            </ul>
            <ul class="spell-bar">
                <li rv-each-spell="spellQueue" rv-on-click="spell.cast"> <img rv-src="spell.image" /></li>
            </ul>
        </div>
    </body>
</html>
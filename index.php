<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="http://code.jquery.com/jquery-3.0.0.min.js"></script
        <script src="/clicker-game/assets/vendor/rivets/rivets.0.8.0.bundled.min.js"></script>
        <script src="/clicker-game/assets/js/spellClicker.js"></script>
    </head>
    <body>
        <div id="game">
            <ul>
                <li rv-each-spell="spellQueue" rv-on-click="spell.cast"> <img src="{spell.image}" />{spell.name} </li>
            </ul>
        </div>
    </body>
</html>
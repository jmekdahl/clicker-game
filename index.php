<html>
    <head>
        <script src="/clicker-game/assets/vendor/rivets/rivets.0.8.0.bundled.min.js"></script>
        <script src="/clicker-game/assets/js/spellClicker.js"></script>
        <script type="text/javascript">
            document.addEventListener("DOMContentLoaded", function(event) { 
                rivets.bind($('#game'), SpellClicker.game);
            });
        </script>
    </head>
    <body>
        <div id="game">
            <ul>
                <li rv-each-spell="spellQueue" rv-on-click="spell.cast"> {spell.name} </li>
            </ul>
        </div>
    </body>
</html>
{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- MountainGoats implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------

    mountaingoats_mountaingoats.tpl
    
    This is the HTML template of your game.
    
    Everything you are writing in this file will be displayed in the HTML page of your game user interface,
    in the "main game zone" of the screen.
    
    You can use in this template:
    _ variables, with the format {MY_VARIABLE_ELEMENT}.
    _ HTML block, with the BEGIN/END format
    
    See your "view" PHP file to check how to set variables and control blocks
    
    Please REMOVE this comment before publishing your game on BGA
-->


This is your game interface. You can edit this HTML in your ".tpl" file.

<div id="board">
    <div id="board_5_0" class="board_tiles" style="left: 0px; top: 0px;"></div>
    <div id="board_5_1" class="board_tiles" style="left: 0px; top: 120px;"></div>
    <div id="board_5_2" class="board_tiles" style="left: 0px; top: 240px;"></div>
    <div id="board_5_3" class="board_tiles" style="left: 0px; top: 360px;"></div>

    <div id="board_6_0" class="board_tiles" style="left: 120px; top: 0px;"></div>
    <div id="board_6_1" class="board_tiles" style="left: 120px; top: 120px;"></div>
    <div id="board_6_2" class="board_tiles" style="left: 120px; top: 240px;"></div>
    <div id="board_6_3" class="board_tiles" style="left: 120px; top: 360px;"></div>

    <div id="board_7_0" class="board_tiles" style="left: 240px; top: 0px;"></div>
    <div id="board_7_1" class="board_tiles" style="left: 240px; top: 120px;"></div>
    <div id="board_7_2" class="board_tiles" style="left: 240px; top: 240px;"></div>

    <div id="board_8_0" class="board_tiles" style="left: 360px; top: 0px;"></div>
    <div id="board_8_1" class="board_tiles" style="left: 360px; top: 120px;"></div>
    <div id="board_8_2" class="board_tiles" style="left: 360px; top: 240px;"></div>

    <div id="board_9_0" class="board_tiles" style="left: 480px; top: 0px;"></div>
    <div id="board_9_1" class="board_tiles" style="left: 480px; top: 120px;"></div>

    <div id="board_10_0" class="board_tiles" style="left: 600px; top: 0px;"></div>
    <div id="board_10_1" class="board_tiles" style="left: 600px; top: 120px;"></div>
    
</div>


<script type="text/javascript">

// Javascript HTML templates

/*
// Example:
var jstpl_some_game_item='<div class="my_game_item" id="my_game_item_${MY_ITEM_ID}"></div>';

*/

</script>  

{OVERALL_GAME_FOOTER}

{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- MountainGoats implementation : © Joseph Utecht <joseph@utecht.co>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------
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
jstpl_goat='<div class="goat" id="player_${PLAYER_ID}_goat_${GOAT_ID}"></div>';
jstpl_point_token='<div class="point_token point_token_${TOKEN_NUMBER}" id="point_token_${TOKEN_NUMBER}_${TOKEN_ID}"></div>';
jstpl_bonus_token='<div class="bonus_token bonus_token_${BONUS_NUMBER}" id="bonus_token_${BONUS_NUMBER}"></div>';
jstpl_die='<div class="die die_${DIE_NUMBER}" id="die_${DIE_INDEX}"></div>';

</script>  

{OVERALL_GAME_FOOTER}

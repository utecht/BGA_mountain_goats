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

<div id="my_play_area">

    <div id="board">
        <div class="point_tokens" style="grid-area: 1/1/2/2"><span id="point_token_5_counter">10x</span><div id="points_5" class="point_token point_token_5"></div></div>
        <div id="board_5_0" class="board_tile"></div>
        <div id="board_5_1" class="board_tile"></div>
        <div id="board_5_2" class="board_tile"></div>
        <div id="board_5_3" class="board_tile"></div>
        <div id="goat_start_5" class="goat_start" style="grid-area: 6 / 1 / 7 / 2"></div>

        <div class="point_tokens" style="grid-area: 1/2/2/3"><span id="point_token_6_counter">9x</span><div id="points_6" class="point_token point_token_6"></div></div>
        <div id="board_6_0" class="board_tile"></div>
        <div id="board_6_1" class="board_tile"></div>
        <div id="board_6_2" class="board_tile"></div>
        <div id="board_6_3" class="board_tile"></div>
        <div id="goat_start_6" class="goat_start" style="grid-area: 6 / 2 / 7 / 3"></div>

        <div class="point_tokens" style="grid-area: 1/3/2/4"><span id="point_token_7_counter">8x</span><div id="points_7" class="point_token point_token_7"></div></div>
        <div id="board_7_0" class="board_tile"></div>
        <div id="board_7_1" class="board_tile"></div>
        <div id="board_7_2" class="board_tile"></div>
        <div id="goat_start_7" class="goat_start" style="grid-area: 5 / 3 / 6 / 4"></div>

        <div class="point_tokens" style="grid-area: 1/4/2/5"><span id="point_token_8_counter">7x</span><div id="points_8" class="point_token point_token_8"></div></div>
        <div id="board_8_0" class="board_tile"></div>
        <div id="board_8_1" class="board_tile"></div>
        <div id="board_8_2" class="board_tile"></div>
        <div id="goat_start_8" class="goat_start" style="grid-area: 5 / 4 / 6 / 5"></div>

        <div class="point_tokens" style="grid-area: 1/5/2/6"><span id="point_token_9_counter">6x</span><div id="points_9" class="point_token point_token_9"></div></div>
        <div id="board_9_0" class="board_tile"></div>
        <div id="board_9_1" class="board_tile"></div>
        <div id="goat_start_9" class="goat_start" style="grid-area: 4 / 5 / 5 / 6"></div>
        <div id="change_dice_area" class="dice_area hidden" style="grid-area: 5 / 5 / 6 / 7"></div>

        <div class="point_tokens" style="grid-area: 1/6/2/7"><span id="point_token_10_counter">5x</span><div id="points_10" class="point_token point_token_10"></div></div>
        <div id="board_10_0" class="board_tile"></div>
        <div id="board_10_1" class="board_tile"></div>
        <div id="goat_start_10" class="goat_start" style="grid-area: 4 / 6 / 5 / 7"></div>
        <div id="dice_area" class="dice_area" style="grid-area: 6 / 5 / 7 / 7"></div>

        <div id="bonus_tiles" style="grid-area: 1 / 7 / 3 / 8"></div>
        
    </div>

</div>

<script type="text/javascript">

// Javascript HTML templates
jstpl_goat='<div class="goat" id="player_${owner}_goat_${goat_num}" style="background-color:#${color}"></div>';
jstpl_point_token='<div class="point_token point_token_${token_number}" id="point_token_${token_number}_${token_id}"></div>';
jstpl_player_tokens='<div id="player_tokens_${player_id}" class="player_tokens"><span>${point_token_5}x</span><div class="mini_point_token mini_point_token_5"></div><span>${point_token_6}x</span><div class="mini_point_token mini_point_token_6"></div><span>${point_token_7}x</span><div class="mini_point_token mini_point_token_7"></div><span>${point_token_8}x</span><div class="mini_point_token mini_point_token_8"></div><span>${point_token_9}x</span><div class="mini_point_token mini_point_token_9"></div><span>${point_token_10}x</span><div class="mini_point_token mini_point_token_10"></div></div>';
jstpl_bonus_token='<div class="bonus_token bonus_token_${bonus_number}" id="bonus_token_${bonus_number}"></div>';
jstpl_die='<div class="die die_${die_number}" id="die_${die_index}" data-n="${die_number}"></div>';

</script>  

{OVERALL_GAME_FOOTER}

<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * MountainGoats implementation : © Joseph Utecht <joseph@utecht.co>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 * 
 * states.inc.php
 *
 * MountainGoats game states description
 *
 */

//    !! It is not a good idea to modify this file when a game is running !!
// define contants for state ids
if (!defined('STATE_END_GAME')) { // guard since this included multiple times
   define("STATE_PLAYER_TURN", 2);
   define("STATE_GAME_TURN", 3);
   define("STATE_END_GAME", 99);
}
 
$machinestates = array(

    // The initial state. Please do not modify.
    1 => array(
        "name" => "gameSetup",
        "description" => "",
        "type" => "manager",
        "action" => "stGameSetup",
        "transitions" => array( "" => STATE_GAME_TURN )
    ),

    STATE_GAME_TURN => array(
        "name" => "gameTurn",
        "description" => clienttranslate('Switching to next player'),
        "type" => "game",
        "action" => "stGameTurn",
        "updateGameProgression" => true,
        "transitions" => ( "endGame" => STATE_END_GAME, "nextPlayer" => STATE_PLAYER_TURN )
    ),
    
    STATE_PLAYER_TURN => array(
    		"name" => "playerTurn",
    		"description" => clienttranslate('${actplayer} must move a goat'),
    		"descriptionmyturn" => clienttranslate('${you} must move a goat'),
    		"type" => "activeplayer",
            "args" => "argPlayerTurn",
    		"possibleactions" => array( "moveGoats", "changeDice" ),
    		"transitions" => array( "moveGoats" => STATE_GAME_TURN, "changeDice" => STATE_PLAYER_TURN )
    ),
   
    // Final state.
    // Please do not modify (and do not overload action/args methods).
    STATE_END_GAME => array(
        "name" => "gameEnd",
        "description" => clienttranslate("End of game"),
        "type" => "manager",
        "action" => "stGameEnd",
        "args" => "argGameEnd"
    )

);

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
  * mountaingoats.game.php
  *
  * This is the main file for your game logic.
  *
  * In this PHP file, you are going to defines the rules of the game.
  *
  */


require_once( APP_GAMEMODULE_PATH.'module/table/table.game.php' );


class MountainGoats extends Table{
	function __construct( ){
        // Your global variables labels:
        //  Here, you can assign labels to global variables you are using for this game.
        //  You can use any number of global variables with IDs between 10 and 99.
        //  If your game has options (variants), you also have to associate here a label to
        //  the corresponding ID in gameoptions.inc.php.
        // Note: afterwards, you can get/set the global variables with getGameStateValue/setGameStateInitialValue/setGameStateValue
        parent::__construct();
        
        self::initGameStateLabels( array( 
            //    "my_first_global_variable" => 10,
            //    "my_second_global_variable" => 11,
            //      ...
            //    "my_first_game_variant" => 100,
            //    "my_second_game_variant" => 101,
            //      ...
        ) );        
	}
	
    protected function getGameName( ){
		// Used for translations and stuff. Please do not modify.
        return "mountaingoats";
    }	

    protected function setupNewGame( $players, $options = array() ){    
        // Set the colors of the players with HTML color code
        // The default below is red/green/blue/orange/brown
        // The number of colors defined here must correspond to the maximum number of players allowed for the gams
        $gameinfos = self::getGameinfos();
        $default_colors = $gameinfos['player_colors'];
 
        // Create players
        // Note: if you added some extra field on "player" table in the database (dbmodel.sql), you can initialize it there.
        $sql = "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar) VALUES ";
        $values = array();
        foreach( $players as $player_id => $player ){
            self::DbQuery("insert into goat (owner) values ('".$player_id."')");
            $color = array_shift( $default_colors );
            $values[] = "('".$player_id."','$color','".$player['player_canal']."','".addslashes( $player['player_name'] )."','".addslashes( $player['player_avatar'] )."')";
        }
        $sql .= implode( $values, ',' );
        self::DbQuery( $sql );
        self::reattributeColorsBasedOnPreferences( $players, $gameinfos['player_colors'] );
        self::reloadPlayersBasicInfos();

        self::DbQuery("insert into dice (id) values (0),(1),(2),(3)");
        $sql = "insert into token (kind) values ";
        $tokens = array();
        foreach($this->point_tokens as $point_token){
            $count = $point_token['count'];
            $tokens = array_merge($tokens, array_fill(0, $count, "('point_token_".$point_token['id']."')"));
        }
        $tokens[] = "('bonus_token_15')";
        $tokens[] = "('bonus_token_12')";
        $tokens[] = "('bonus_token_9')";
        $tokens[] = "('bonus_token_6')";
        $sql .= implode($tokens, ',');
        self::DbQuery($sql);


        /************ Start the game initialization *****/

        // Init global values with their initial values
        //self::setGameStateInitialValue( 'my_first_global_variable', 0 );
        
        // Init game statistics
        // (note: statistics used in this file must be defined in your stats.inc.php file)
        //self::initStat( 'table', 'table_teststat1', 0 );    // Init a table statistics
        //self::initStat( 'player', 'player_teststat1', 0 );  // Init a player statistics (for all players)

        // TODO: setup the initial game situation here
       

        // Activate first player (which is in general a good idea :) )
        $this->activeNextPlayer();

        /************ End of the game initialization *****/
    }

    /*
        getAllDatas: 
        
        Gather all informations about current game situation (visible by the current player).
        
        The method is called each time the game interface is displayed to a player, ie:
        _ when the game starts
        _ when a player refreshes the game page (F5)
    */
    protected function getAllDatas(){
        $result = array();
    
        $current_player_id = self::getCurrentPlayerId();    // !! We must only return informations visible by this player !!
    
        // Get information about players
        // Note: you can retrieve some extra field you added for "player" table in "dbmodel.sql" if you need it.
        $sql = "SELECT player_id id, player_score score FROM player ";
        $result['players'] = self::getCollectionFromDb( $sql );
        $result['goats'] = self::getObjectListFromDb("select * from goat");
        $result['dice'] = self::getObjectListFromDb("select * from dice");
        $result['tokens'] = self::getObjectListFromDb("select * from token");
        $result['my_id'] = $current_player_id;

        return $result;
    }

    /*
        getGameProgression:
        
        Compute and return the current game progression.
        The number returned must be an integer beween 0 (=the game just started) and
        100 (= the game is finished or almost finished).
    
        This method is called each time we are in a game state with the "updateGameProgression" property set to true 
        (see states.inc.php)
    */
    function getGameProgression(){
        // TODO: compute and return the game progression

        return 0;
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Utility functions
////////////    

    function checkMoves($moves){
        $legal_moves = array();
        for($i = 0; $i < count($moves); $i++){
            $legal_move = array();
            for($s = 0; $s < count($moves[$i]); $s++){
                $val = $moves[$i][$s];
                if($val >= 5 && $val <= 10){
                    $legal_move[] = $val;
                } 
            }
            if(count($legal_move) > 0) $legal_moves[] = join(',', $legal_move);
        }
        return array_unique($legal_moves);
    }

    /*
        In this space, you can put any utility methods useful for your game logic
    */
    function allMoves( $dice ) {
        // returns currently legal moves
        $result = array();

        //pick one
        if(count($dice) == 1){
            $result[] = [array_sum($dice)];
        } else {
            for($d = 0; $d < count($dice); $d++){
                $picked = $dice[$d];
                $remaining = array_values(array_diff_key($dice, [$d=>0]));
                $more = self::allMoves($remaining);
                for($i = 0; $i < count($more); $i++){
                    $result[] = array_merge([$picked], $more[$i]);
                }
            }
        }

        //pick two
        if(count($dice) == 2){
            $result[] = [array_sum($dice)];
        } elseif (count($dice) > 2) {
            for($d1= 0; $d1 < count($dice); $d1++){
                for($d2= 0; $d2 < count($dice); $d2++){
                    if($d1 != $d2){
                        $picked = $dice[$d1] + $dice[$d2];
                        $remaining = array_values(array_diff_key($dice, [$d1=>0, $d2=>0]));
                        $more = self::allMoves($remaining);
                        for($i = 0; $i < count($more); $i++){
                            $result[] = array_merge([$picked], $more[$i]);
                        }
                    }
                }
            }
        }

        //pick three
        if(count($dice) == 3){
            $result[] = [array_sum($dice)];
        } elseif (count($dice) > 3) {
            for($d1= 0; $d1 < count($dice); $d1++){
                for($d2= 0; $d2 < count($dice); $d2++){
                    for($d3= 0; $d3 < count($dice); $d3++){
                        if($d1 != $d2 && $d1 != $d3 && $d2 != $d3){
                            $picked = $dice[$d1] + $dice[$d2] + $dice[$d3];
                            $remaining = array_values(array_diff_key($dice, [$d1=>0, $d2=>0, $d3=>0]));
                            $more = self::allMoves($remaining);
                            for($i = 0; $i < count($more); $i++){
                                $result[] = array_merge([$picked], $more[$i]);
                            }
                        }
                    }
                }
            }
        }

        //pick four
        if(count($dice) == 4){
            $result[] = [array_sum($dice)];
        }

        // All single die combos

        return $result;
    }

    function legalMoves($dice){
        $allMoves = self::allMoves($dice);
        $legalMoves = self::checkMoves($allMoves);
        return $legalMoves;
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Player actions
//////////// 

    function moveGoat( $move_string ) {
        self::checkAction("moveGoat");
        $player_name = self::getActivePlayerName();
        $player_id = self::getActivePlayerId();
        $moves = explode(',', $move_string);

        $res = self::getCollectionFromDb("select * from dice");
        $dice = array();
        foreach($res as $die){
            $dice[] = $die['value'];
        }

        // check if move is legal
        $legal_moves = self::legalMoves($dice);
        $valid = false;
        foreach($legal_moves as $move_index => $move){
            $count = count(array_diff($moves, explode(',', $move)));
            if($count == 0){
                $valid = true;
            }
        }
        if($valid === false){
            // say move is not valid
           throw new BgaVisibleSystemException(self::_("Invalid move submitted, reload."));
        }

        $goats = self::getCollectionFromDb("select * from goat");

        self::dump("======GOATS=======", $goats);
        // move goat up each track
        foreach($moves as $track){
            $goat_name = "goat_".$track;

            $height = $goats[$player_id][$goat_name];
            if($height === null){
                $height = $this->starting_height[$track];
            } else {
                $height = intVal($height) - 1;
            }
            if($height < 0){
                $height = 0;
            }
            $score_id = self::getUniqueValueFromDB("select min(id) from token where owner is null and kind = 'point_token_".$track."'");
            if($height == 0 && $score_id != null){
                $goats_knocked = array();
                foreach($goats as $owner => $goat){
                    self::dump("====GOAT=====", $goat);
                    if($owner != $player_id && $goat[$goat_name] === "0"){
                        $goats_knocked[] = $owner;
                        self::DbQuery("update goat set ".$goat_name." = NULL where owner = ".$owner);
                    }
                }
                if(count($goats_knocked) > 0){
                    self::notifyAllPlayers(
                        "moveGoatKnockOff",
                        clienttranslate('${player_name} moved goat ${goat_num}, scoring ${goat_num} and knocking off ${goat_count} other goats.'),
                        array(
                            'player_name' => $player_name,
                            'player_id' => $player_id,
                            'goat_num' => $track,
                            'goat_count' => count($goats_knocked),
                            'goats_off' => $goats_knocked
                        )
                    );
                } else {
                    self::notifyAllPlayers(
                        "moveGoatScore",
                        clienttranslate('${player_name} moved goat ${goat_num}, scoring ${goat_num}.'),
                        array(
                            'player_name' => $player_name,
                            'player_id' => $player_id,
                            'goat_num' => $track
                        )
                    );
                }
            } else {
                self::notifyAllPlayers(
                    "moveGoat",
                    clienttranslate('${player_name} moved goat ${goat_num}.'),
                    array(
                        'player_name' => $player_name,
                        'player_id' => $player_id,
                        'goat_num' => $track,
                        'height' => $height
                    )
                );
            }
            if($score_id !== null && $height === 0){
                self::DbQuery("update token set owner = '".$player_id."' where id = ".$score_id);
                self::DbQuery("update player set player_score = player_score + ".$track." where player_id = ".$player_id);
            }
            self::DbQuery("update goat set ".$goat_name." = ".$height." where owner = ".$player_id);
        }

        $tokens = self::getCollectionFromDb("select kind, count(*) as count from token where owner = '".$player_id."' group by kind");
        $bonus_count = 0;
        $token_count = 0;
        $low_seen = 99;
        foreach($tokens as $kind => $token){
            $count = intVal($token['count']);
            if(strpos($kind, 'bonus') === false){
                $token_count++;
                if($count < $low_seen){
                    $low_seen = $count;
                }
            } else {
                $bonus_count++;
            }
        }
        if($token_count == 6 && $low_seen > $bonus_count){
            while($low_seen > $bonus_count){
                $bonus_tile = self::getObjectFromDB("select * from token where owner is null and kind like 'bonus%' order by id limit 1");
                $score = explode('_', $bonus_tile['kind'])[2];
                if($bonus_tile){
                    self::DbQuery("update token set owner = '".$player_id."' where id = ".$bonus_tile['id']);
                    self::DbQuery("update player set player_score = player_score + ".$score." where player_id = ".$player_id);
                    self::notifyAllPlayers(
                        "scoreBonus",
                        clienttranslate('${player_name} completed a set and scored ${bonus_num} bonus.'),
                        array(
                            'player_name' => $player_name,
                            'player_id' => $player_id,
                            'bonus_num' => $score
                        )
                    );
                }
                $bonus_count++;
            }
        }

        // move to next turn
        self::incStat(1, 'turns_number', $player_id);
        self::incStat(1, 'turns_number');
        $this->gamestate->nextState('moveGoat');
    }

    function changeDie($dieIndex, $newValue) {
        // check if dice were legally changed
        self::checkAction("changeDie");
        $player_name = self::getActivePlayerName();
        $dice = self::getCollectionFromDb("select * from dice");
        $one_count = 0;
        foreach($dice as $index=>$die){
            if($die['value'] == 1){
                $one_count++;
            }
        }
        if($one_count < 2){
           throw new BgaUserException(self::_("Can only change dice when there is more than 1 1die."));
        }

        self::DbQuery("update dice set value = ".$newValue." where id = ".$dieIndex);
        self::notifyAllPlayers(
            "changeDie",
            clienttranslate('${player_name} changed die to ${die_value}'),
            array(
                'player_name' => $player_name,
                'die_index' => $dieIndex,
                'die_value' => $newValue
            )
        );

        $this->gamestate->nextState('changeDie');
    }

    
//////////////////////////////////////////////////////////////////////////////
//////////// Game state arguments
////////////

    function argPlayerTurn() {
        // return the current dice
        $res = self::getCollectionFromDb("select * from dice");
        $dice = array();
        $tokens = self::getObjectListFromDb("select kind, count(*) as count from token where owner is null group by kind");
        $player_tokens = self::getObjectListFromDb("select owner, kind, count(*) as count from token where owner is not null group by owner, kind");
        foreach($res as $die){
            $dice[] = $die['value'];
        }
        return array( 'dice' => $dice,
                      'tokens' => $tokens,
                      'player_tokens' => $player_tokens,
                      'moves' => self::legalMoves($dice) );
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Game state actions
////////////

    function stGameTurn() {
        // TODO: check if the game is over
        $point_token_count = count(self::getObjectListFromDb("select kind, count(*) from token where owner is null and kind not like 'bonus%' group by kind"));
        $bonus_token_count = count(self::getObjectListFromDb("select kind, count(*) from token where owner is null and kind like 'bonus%' group by kind"));
        if($bonus_token_count == 0 || $point_token_count <= 3){
            $this->gamestate->nextState('endGame');
            return;
        }

        // roll dice
        $die0 = bga_rand(1, 6);
        $die1 = bga_rand(1, 6);
        $die2 = bga_rand(1, 6);
        $die3 = bga_rand(1, 6);

        self::DbQuery("update dice set value = ".$die0." where id = 0");
        self::DbQuery("update dice set value = ".$die1." where id = 1");
        self::DbQuery("update dice set value = ".$die2." where id = 2");
        self::DbQuery("update dice set value = ".$die3." where id = 3");

        // set next player active
        self::activeNextPlayer();
        $this->gamestate->nextState('nextPlayer');

    }


//////////////////////////////////////////////////////////////////////////////
//////////// Zombie
////////////

    /*
        zombieTurn:
        
        This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
        You can do whatever you want in order to make sure the turn of this player ends appropriately
        (ex: pass).
        
        Important: your zombie code will be called when the player leaves the game. This action is triggered
        from the main site and propagated to the gameserver from a server, not from a browser.
        As a consequence, there is no current player associated to this action. In your zombieTurn function,
        you must _never_ use getCurrentPlayerId() or getCurrentPlayerName(), otherwise it will fail with a "Not logged" error message. 
    */

    function zombieTurn( $state, $active_player )
    {
    	$statename = $state['name'];
    	
        if ($state['type'] === "activeplayer") {
            switch ($statename) {
                default:
                    $this->gamestate->nextState( "zombiePass" );
                	break;
            }

            return;
        }

        if ($state['type'] === "multipleactiveplayer") {
            // Make sure player is in a non blocking status for role turn
            $this->gamestate->setPlayerNonMultiactive( $active_player, '' );
            
            return;
        }

        throw new feException( "Zombie mode not supported at this game state: ".$statename );
    }
    
///////////////////////////////////////////////////////////////////////////////////:
////////// DB upgrade
//////////

    /*
        upgradeTableDb:
        
        You don't have to care about this until your game has been published on BGA.
        Once your game is on BGA, this method is called everytime the system detects a game running with your old
        Database scheme.
        In this case, if you change your Database scheme, you just have to apply the needed changes in order to
        update the game database and allow the game to continue to run with your new version.
    
    */
    
    function upgradeTableDb( $from_version )
    {
        // $from_version is the current version of this game database, in numerical form.
        // For example, if the game was running with a release of your game named "140430-1345",
        // $from_version is equal to 1404301345
        
        // Example:
//        if( $from_version <= 1404301345 )
//        {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
//            self::applyDbUpgradeToAllDB( $sql );
//        }
//        if( $from_version <= 1405061421 )
//        {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "CREATE TABLE DBPREFIX_xxxxxxx ....";
//            self::applyDbUpgradeToAllDB( $sql );
//        }
//        // Please add your future database scheme changes here
//
//


    }    
}

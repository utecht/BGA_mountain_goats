<?php
error_reporting(E_ALL ^ E_DEPRECATED);
define( "APP_GAMEMODULE_PATH", "./" ); // include path to mocks, this defined "Table" and other classes
require_once ('../mountaingoats.game.php'); // include real game class

class MountainGoatsTest extends MountainGoats {

    function __construct() {
        parent::__construct();
        include '../material.inc.php';
        $this->resources = array ();
    }
    // override methods here that access db and stuff
    
    function getGameStateValue($var) {
        if ($var=='round') return 3;
        return 0;
    }
}

$x = new MountainGoatsTest();

//$a = $x->argPlayerTurn();
//var_dump($a);

$r = $x->legalMoves(array(5, 2, 3, 4));
var_dump($r);
if (in_array('8', $r, true)) echo "Test All 4: PASSED\n";
else echo "Test All 4: FAILED\n";

if (in_array('66', $r, true)) echo "Test Pair: PASSED\n";
else echo "Test Pair: FAILED\n";

if (in_array('6', $r, true)) echo "Test triple: PASSED\n";
else echo "Test triple: FAILED\n";

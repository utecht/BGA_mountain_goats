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
$dice = array(5, 1, 2, 3);
$d = 1;
$remaining = array_values(array_diff_key($dice, [$d=>0]));
var_dump($remaining);

$x = new MountainGoatsTest();

//$a = $x->argPlayerTurn();
//var_dump($a);

$r = $x->legalMoves(array(5, 1, 2, 3));
if (in_array('8', $r, true)) echo "Test All 4: PASSED\n";
else echo "Test All 4: FAILED\n";

if (in_array('5,5', $r, true)) echo "Test Pair: PASSED\n";
else echo "Test Pair: FAILED\n";

if (in_array('10', $r, true)) echo "Test triple: PASSED\n";
else echo "Test triple: FAILED\n";

if (!in_array('8,5', $r, true)) echo "Test re-use: PASSED\n";
else echo "Test re-use: FAILED\n";

$r = $x->legalMoves(array(3, 1, 1, 5));
var_dump($r);
if (in_array('5,5', $r, true)) echo "Test another: PASSED\n";
else echo "Test another: FAILED\n";
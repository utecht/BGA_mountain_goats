/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * MountainGoats implementation : © Joseph Utecht <joseph@utecht.co>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * mountaingoats.js
 *
 * MountainGoats user interface script
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter"
],
function (dojo, declare) {
    return declare("bgagame.mountaingoats", ebg.core.gamegui, {
        constructor: function(){
            console.log('mountaingoats constructor');
        
        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );
            
            // Setting up player boards
            for( var player_id in gamedatas.players )
            {
                var player = gamedatas.players[player_id];
                         
                // TODO: Setting up players boards if needed
            }
            
            // TODO: Set up your game interface here, according to "gamedatas"
            
 
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
            
           case 'playerTurn':
                console.log(args.args.moves);
                this.gamedatas.moves = args.args.moves.split(',');
                this.gamedatas.previousMoves = [];
                this.initialPossibleMoves(this.gamestate.moves);
                break;
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName )
            {
            
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName );
                      
            if( this.isCurrentPlayerActive() )
            {            
                switch( stateName )
                {
/*               
                 Example:
 
                 case 'myGameState':
                    
                    // Add 3 action buttons in the action status bar:
                    
                    this.addActionButton( 'button_1_id', _('Button 1 label'), 'onMyMethodToCall1' ); 
                    this.addActionButton( 'button_2_id', _('Button 2 label'), 'onMyMethodToCall2' ); 
                    this.addActionButton( 'button_3_id', _('Button 3 label'), 'onMyMethodToCall3' ); 
                    break;
*/
                // TODO: Add cancel action button during movement
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        initialPossibleMoves: function(moves){
            dojo.query('.possibleMove').removeClass('possibleMove');

            for(var moveSet in moves){
                for(var i in moves[moveSet]){
                   let x = moves[moveSet][i]; 
                   dojo.addClass('board_'+x+'_0', 'possibleMove'); 
                }
            }

            this.addTooltipToClass('possibleMove', '', _('Move goat here') );
        }

        updatePossibleMoves: function(moves, moveX){
            dojo.query('.possibleMove').removeClass('possibleMove');

            for(var moveSet in moves){
                var moveSet = moves[moveSet];
                // remove all previous moves from the moveset
                for(var p in this.gamedatas.previousMoves){
                    let pi = moveSet.indexOf(this.gamedatas.previousMoves(p));
                    if(pi > -1){
                        moveSet.splice(pi, 1);
                    }
                }
                let index = moveSet.indexOf(moveX);
                if(index > -1){
                    moveSet.splice(index, 1);
                    for(var i in moveSet){
                       let x = moveSet[i]; 
                       dojo.addClass('board_'+x+'_0', 'possibleMove'); 
                    }
                }
            }

            this.addTooltipToClass('possibleMove', '', _('Move goat here') );

        }


        ///////////////////////////////////////////////////
        //// Player's action
        
        onMoveGoat: function(evt){
            evt.preventDefault();
            dojo.stopEvent(evt);

            let coords = evt.currentTarget.id.split('_');
            let x = coords[1];
            let y = coords[2];

            if(! dojo.hasClass('board_'+x+'_0', 'possibleMove')){
                // not a currently legal move
                return;
            }
            // check if move is in legal moves, and if there are any additional
            let moves = this.gamestate.moves;
            for(var moveSet in moves){
                var moveSet = moves[moveSet];
                // remove all previous moves from the moveset
                for(var p in this.gamestate.previousMoves){
                    let pi = moveSet.indexOf(this.gamedatas.previousMoves(p));
                    if(pi > -1){
                        moveSet.splice(pi, 1);
                    }
                }
                let index = moveSet.indexOf(x);
                if(index > -1){
                    moveSet.splice(index, 1);
                    if(moveSet.length > 0){
                        this.updatePossibleMoves(this.gamedatas.moves, x);
                        this.gamedatas.previousMoves.push(x);
                        return;
                    }
                }
            }
            // no moves remain 
            this.gamedatas.previousMoves.push(x);
            if(this.checkAction('moveGoat')){
                this.ajaxcall('/mountaingoats/mountaingoats/moveGoat.html', {
                    moves:this.gamedatas.previousMoves.join(',')
                }, this, function(result) {} );
            }
        }
        

        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );
            
            // TODO: here, associate your game notifications with local methods
            
            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            
            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            // 
        },  
        
        // TODO: from this point and below, you can write your game notifications handling methods
        
        /*
        Example:
        
        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );
            
            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
            
            // TODO: play the card in the user interface.
        },    
        
        */
   });             
});

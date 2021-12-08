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
        },
        
        setup: function( gamedatas ){
            console.log( "Starting game setup" );
            
            // Setting up player boards
            for( var player_id in gamedatas.players ){
                var player = gamedatas.players[player_id];
                         
            }
 
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            dojo.query('.board_tile').connect('onclick', this, 'onMoveGoat');

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args ){
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
            
           case 'playerTurn':
                this.gamedatas.moves = {};
                for(let i in args.args.moves){
                    this.gamedatas.moves[i] = args.args.moves[i].split(',');
                }
                this.gamedatas.previousMoves = [];
                this.initialPossibleMoves(this.gamedatas.moves);
                for(let i in args.args.dice){
                    dojo.destroy('die_'+i);
                    dojo.place(this.format_block('jstpl_die', {
                        die_number: args.args.dice[i],
                        die_index: i
                    }), 'dice_area');
                }
                break;
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName ){
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName ){
            
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args ){
            console.log( 'onUpdateActionButtons: '+stateName );
                      
            if( this.isCurrentPlayerActive() ){            
                switch( stateName ){
                case 'dummy':
                    break;
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        initialPossibleMoves: function(moves){
            dojo.query('.possibleMove').removeClass('possibleMove');

            for(var moveSet in moves){
                for(var x of moves[moveSet]){
                   dojo.addClass('board_'+x+'_0', 'possibleMove'); 
                }
            }

            this.addTooltipToClass('possibleMove', '', _('Move goat here') );
        },

        updatePossibleMoves: function(moveX){
            dojo.query('.possibleMove').removeClass('possibleMove');

            let moves = dojo.clone(this.gamedatas.moves);
            for(var moveSet in moves){
                var moveSet = moves[moveSet];
                var inMove = false;
                // remove all previous moves from the moveset
                for(var p in this.gamedatas.previousMoves){
                    let pi = moveSet.indexOf(this.gamedatas.previousMoves[p]);
                    if(pi > -1){
                        moveSet.splice(pi, 1);
                        inMove = true;
                    } else {
                        inMove = false;
                    }
                }
                if(inMove || this.gamedatas.previousMoves.length == 0){
                    let index = moveSet.indexOf(moveX);
                    if(index > -1){
                        moveSet.splice(index, 1);
                        for(var i in moveSet){
                           let x = moveSet[i]; 
                           dojo.addClass('board_'+x+'_0', 'possibleMove'); 
                        }
                    }
                }
            }

            this.addTooltipToClass('possibleMove', '', _('Move goat here') );

        },


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
            let moves = dojo.clone(this.gamedatas.moves);
            for(var moveSet in moves){
                var moveSet = moves[moveSet];
                var inMove = false;
                // remove all previous moves from the moveset
                for(var p in this.gamedatas.previousMoves){
                    let pi = moveSet.indexOf(this.gamedatas.previousMoves[p]);
                    if(pi > -1){
                        moveSet.splice(pi, 1);
                        inMove = true;
                    } else {
                        inMove = false;
                    }
                }
                let index = moveSet.indexOf(x);
                if(inMove || this.gamedatas.previousMoves.length === 0){
                    if(index > -1){
                        moveSet.splice(index, 1);
                        if(moveSet.length > 0){
                            this.updatePossibleMoves(x);
                            this.gamedatas.previousMoves.push(x);
                            return;
                        }
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
        },

        onChangeDie: function(evt){
            evt.preventDefault();
            dojo.stopEvent(evt);

            let dieIndex = 0;
            let newValue = 5;
            if(this.checkAction('changeDie')){
                this.ajaxcall('/mountaingoats/mountaingoats/changeDie.html', {
                    dieIndex:dieIndex,
                    newValue:newValue
                }, this, function(result) {} );
            }
        },


        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        setupNotifications: function(){
            console.log( 'notifications subscriptions setup' );
            
        },  
   });             
});

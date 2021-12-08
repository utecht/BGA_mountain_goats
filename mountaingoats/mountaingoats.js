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
 
            for(let goat of gamedatas.goats ){
                for(let i = 5; i <= 10; i++){
                    let target_div = 'goat_start_'+i;
                    let goat_name = 'goat_'+i;
                    if(goat[goat_name] !== null){
                        target_div = 'board_'+i+'_'+goat[goat_name];
                    }
                    dojo.place(this.format_block('jstpl_goat', {
                        owner: goat.owner,
                        goat_num: i,
                        color: gamedatas.players[goat.owner].color
                    }), target_div);
                    if(goat.owner == this.player_id){
                        this.goat = goat;
                    }
                }
            }

            for(let i = 1; i <= 6; i++){
                dojo.place(this.format_block('jstpl_die', {
                    die_number: i,
                    die_index: 'c'+i
                }), 'change_dice_area');
            }

            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            dojo.query('.goat').connect('onclick', this, 'onMoveGoat');
            dojo.query('#change_dice_area .die').connect('onclick', this, 'onChangeDie');

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
                dojo.query('#dice_area .die').connect('onclick', this, 'onDieClick');
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
            if(this.isCurrentPlayerActive()){
                for(var moveSet in moves){
                    for(var x of moves[moveSet]){
                       dojo.addClass('player_'+this.player_id+'_goat_'+x, 'possibleMove'); 
                    }
                }

                this.addTooltipToClass('possibleMove', '', _('Move goat here') );
            }
        },

        moveOwnGoat: function(goat_num){
            let goat_name = 'goat_'+goat_num;
            if(this.goat[goat_name] === null){
                switch(parseInt(goat_num)){
                    case 5:
                        this.goat[goat_name] = 3;
                        break;
                    case 6:
                        this.goat[goat_name] = 3;
                        break;
                    case 7:
                        this.goat[goat_name] = 2;
                        break;
                    case 8:
                        this.goat[goat_name] = 2;
                        break;
                    case 9:
                        this.goat[goat_name] = 1;
                        break;
                    case 10:
                        this.goat[goat_name] = 1;
                        break;
                }
            } else {
                if(this.goat[goat_name] > 0){
                    this.goat[goat_name]--;
                }
            }
            this.slideGoat(this.goat, goat_num);
        },

        slideGoat: function(goat, goat_num){
            let goat_name = 'goat_'+goat_num;
            this.attachToNewParent('player_'+goat.owner+'_goat_'+goat_num, 'board_'+goat_num+'_'+goat[goat_name]);
            dojo.query('#player_'+goat.owner+'_goat_'+goat_num).connect('onclick', this, 'onMoveGoat');
            //this.placeOnObject('player_'+goat.owner+'_goat_'+goat_num, 'board_'+goat_num+'_'+goat[goat_name]);
            //this.slideToObject('player_'+goat.owner+'_goat_'+goat_num, 'board_'+goat_num+'_'+goat[goat_name]).play();
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
                           dojo.addClass('player_'+this.player_id+'_goat_'+x, 'possibleMove'); 
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
            let owner = coords[1];
            let x = coords[3];

            if(! dojo.hasClass(evt.currentTarget.id, 'possibleMove')){
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
                            this.moveOwnGoat(x);
                            return;
                        }
                    }
                }
            }
            // no moves remain 
            this.gamedatas.previousMoves.push(x);
            this.moveOwnGoat(x);
            if(this.checkAction('moveGoat')){
                this.ajaxcall('/mountaingoats/mountaingoats/moveGoat.html', {
                    moves:this.gamedatas.previousMoves.join(',')
                }, this, function(result) {} );
            }
        },

        onDieClick: function(evt){
            if(dojo.byId(evt.currentTarget.id).dataset.n == '1' && this.isCurrentPlayerActive()){
                dojo.toggleClass('change_dice_area', 'hidden');
                this.changeDieId = evt.currentTarget.id.split('_')[1];
            }
        },

        onChangeDie: function(evt){
            evt.preventDefault();
            dojo.stopEvent(evt);

            let dieIndex = this.changeDieId;
            let newValue = dojo.byId(evt.currentTarget.id).dataset.n;
            if(this.checkAction('changeDie')){
                this.ajaxcall('/mountaingoats/mountaingoats/changeDie.html', {
                    dieIndex:dieIndex,
                    newValue:newValue
                }, this, function(result) {} );
            }
            dojo.toggleClass('change_dice_area', 'hidden');
            this.changeDieId = null;
        },


        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        setupNotifications: function(){
            console.log( 'notifications subscriptions setup' );
            
        },  
   });             
});

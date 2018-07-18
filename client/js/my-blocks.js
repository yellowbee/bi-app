/**
 * Created by bhuang on 9/17/17.
 */

/*
 * Block UI def
 */
// *********** Motion ****************
Blockly.Blocks['motion_move_forward'] = {
    init: function() {
        this.appendDummyInput('MOVE_FORWARD')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("向前走一步");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['motion_turn_right'] = {
    init: function() {
        this.appendDummyInput('MOVE_TURN_RIGHT')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("向右转90度");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['motion_turn_left'] = {
    init: function() {
        this.appendDummyInput('MOVE_TURN_LEFT')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField("向左转90度");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

/*
 * Block JS generation
 */
Blockly.JavaScript['motion_move_forward'] = function(block) {
    // Search the text for a substring.
    //var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
    //var subString = Blockly.JavaScript.valueToCode(block, 'FIND',
    //Blockly.JavaScript.ORDER_NONE) || '\'\'';
    //var text = Blockly.JavaScript.valueToCode(block, 'VALUE',
    //Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
    //var code = text + '.' + operator + '(' + subString + ')';
    var code = 'moveForward()\n';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['motion_turn_left'] = function(block) {
    var code = 'turnLeft()\n';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['motion_turn_right'] = function(block) {
    var code = 'turnRight()\n';
    return [code, Blockly.JavaScript.ORDER_NONE];
};

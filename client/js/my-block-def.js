Blockly.Blocks['length_of'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("length of");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['forever_do'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("永远执行");
    this.appendStatementInput("action")
        .setCheck(null)
        .appendField("做");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


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

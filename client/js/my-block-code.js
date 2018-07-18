//goog.require('Blockly.JavaScript');

//Blockly.JavaScript['length_of'] = function(block) {
  //var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  //var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  //return [code, Blockly.JavaScript.ORDER_NONE];
//};

//Blockly.JavaScript['forever_do'] = function(block) {
  //var statements_action = Blockly.JavaScript.statementToCode(block, 'action');
  // TODO: Assemble JavaScript into code variable.
  //var code = 'while(true) {action};\n';
  //return code;
//};

/*Blockly.Blocks['motion_move_forward'] = {
  init: function() {
    this.appendDummyInput('MOVE_FORWARD')
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("move forward");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};*/

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
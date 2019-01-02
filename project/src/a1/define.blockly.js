Blockly.Blocks['start'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("开始");
    this.setInputsInline(false);
    this.setOutput(false);
    this.setNextStatement(true, null);
    this.setColour(150);
  }
};
Blockly.Blocks['walk_right'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("向右前进");
    this.appendValueInput("STEP")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField("步");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
  }
};
Blockly.Blocks['walk_left'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("向左前进");
    this.appendValueInput("STEP")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField("步");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
  }
};
Blockly.Blocks['walk_up'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("向上前进");
    this.appendValueInput("STEP")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField("步");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
  }
};
Blockly.Blocks['walk_down'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("向下前进");
    this.appendValueInput("STEP")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField("步");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
  }
};
Blockly.Blocks['steps'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(1, 0, 100), "steps_length");
    this.setOutput(true, null);
    this.setColour(120);
  }
};
Blockly.JavaScript['start'] = function (block) {
  var code = '';
  return [code, Blockly.JavaScript.ORDER_NONE];
};
Blockly.JavaScript['walk_right'] = function (block) {
  var code = ''
  var argument0 = Blockly.JavaScript.valueToCode(block, 'STEP',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  if (block.getRootBlock().type === 'start') {
    code = `await move('right', ` + argument0 + `);\r\n`;
  }
  return code
};
Blockly.JavaScript['walk_left'] = function (block) {
  var code = ''
  var argument0 = Blockly.JavaScript.valueToCode(block, 'STEP',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  if (block.getRootBlock().type === 'start') {
    code = `await move('left', ` + argument0 + `);\r\n`;
  }
  return code
};
Blockly.JavaScript['walk_up'] = function (block) {
  var code = ''
  var argument0 = Blockly.JavaScript.valueToCode(block, 'STEP',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  if (block.getRootBlock().type === 'start') {
    code = `await move('up', ` + argument0 + `);\r\n`;
  }
  return code
};
Blockly.JavaScript['walk_down'] = function (block) {
  var code = ''
  var argument0 = Blockly.JavaScript.valueToCode(block, 'STEP',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
  if (block.getRootBlock().type === 'start') {
    code = `await move('down', ` + argument0 + `);\r\n`;
  }
  return code
};
Blockly.JavaScript['steps'] = function (block) {
  return block.getFieldValue('steps_length')
};
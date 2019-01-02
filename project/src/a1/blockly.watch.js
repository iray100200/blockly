
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv,
  { toolbox: document.getElementById('toolbox') });
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
  workspace);
var onresize = function (e) {
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
const myUpdateFunction = (event) => {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  document.getElementById('textarea').innerHTML = PR.prettyPrintOne(code, true);
  window.code = code
}
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);
workspace.addChangeListener(myUpdateFunction);

clicked = false
document.getElementById('run').addEventListener('click', () => {
  try {
    if (!clicked) {
      let temp = async function () { }
      let AsyncFunction = Object.getPrototypeOf(temp).constructor
      new AsyncFunction(code)()
      clicked = true
    }
  } catch (e) {
    console.log(e)
  }
})

document.getElementById('rerun').addEventListener('click', () => {
  try {
    if (clicked) {
      reset()
      let temp = async function () { }
      let AsyncFunction = Object.getPrototypeOf(temp).constructor
      new AsyncFunction(code)()
      clicked = true
    }
  } catch (e) {
    console.log(e)
  }
})
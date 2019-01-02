
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

var count = 0
function run() {
  document.getElementById('run').innerHTML = '重新运行'
  try {
    let temp = async function () { }
    let AsyncFunction = Object.getPrototypeOf(temp).constructor
    if (code !== '') new AsyncFunction(code)().then(() => count++)
  } catch (e) {
    console.log(e)
  }
}

document.getElementById('run').addEventListener('click', () => {
  if (count > 0) {
    reset()
  }
  run()
})
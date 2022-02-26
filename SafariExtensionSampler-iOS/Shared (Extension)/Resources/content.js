browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
    snackbar();
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function snackbar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);
    console.log("snackbar")
}

function replace(node, word, replacement) {
    switch (node.nodeType)
    {
        case Node.ELEMENT_NODE:
            // We don't want to replace text in an input field or textarea.
            if (node.tagName.toLowerCase() === "input" || node.tagName.toLowerCase() === "textarea") {
                return;
            }
 
            // For other types of element nodes, we explicitly fall through to iterate over their children.
        case Node.DOCUMENT_NODE:
        case Node.DOCUMENT_FRAGMENT_NODE:
            // If the node is a container node, iterate over all the children and recurse into them.
            var child = node.firstChild;
            var next = undefined;
            while (child) {
                next = child.nextSibling;
                replace(child, word, replacement);
                child = next;
            }
            break;
        case Node.TEXT_NODE:
            // If the node is a text node, perform the text replacement.
            replaceTextInTextNode(node, word, replacement);
            break;
    }
}

function replaceTextInTextNode(textNode, word, replacement) {
    // Skip over nodes that aren't text nodes.
    if (textNode.nodeType !== Node.TEXT_NODE)
        return;
    
    // And text nodes that don't have any text.
    if (!textNode.nodeValue.length)
        return;
    
    // Generate a regular expression object to perform the replacement.
    var expressionForWordToReplace = new RegExp(word, "gi");
    var nodeValue = textNode.nodeValue;
    var newNodeValue = nodeValue.replace(expressionForWordToReplace, replacement);
    
    // Perform the replacement in the DOM if the regular expression had any effect.
    if (nodeValue !== newNodeValue) {
        textNode.nodeValue = newNodeValue;
        browser.runtime.sendMessage({type: "Word replaced"});
    }
}

var wordReplacementMap = {"Amazon": "あーまぞん", "新品": "NEW!!!"}
for (var wordToReplace in wordReplacementMap) {
    replace(document.body, wordToReplace, wordReplacementMap[wordToReplace]);
}

//var newDiv = document.createElement('div');
//var newContent = document.createTextNode("こんにちは!");
//newDiv.appendChild(newContent);
//document.body.appendChild(newDiv);

var element = document.createElement('div');
var newElContent = document.createTextNode("ここにスイッチ置く？");
element.appendChild(newElContent);
element.id = 'snackbar'
element.style.setProperty('visibility', 'visible')
element.style.setProperty('min-width', '250px')
element.style.setProperty('margin-left', '-125px')
element.style.setProperty('background-color', '#333')
element.style.setProperty('color', '#fff')
element.style.setProperty('text-align', 'center')
element.style.setProperty('border-radius', '2px')
element.style.setProperty('padding', '16px')
element.style.setProperty('position', 'fixed')
element.style.setProperty('z-index', '0')
element.style.setProperty('left', '50%')
element.style.setProperty('top', '30px')

document.body.appendChild(element);

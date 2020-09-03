import React, { useRef } from 'react';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
var RNDContext = createDndContext(HTML5Backend);

function DragAndDrop(_a) {
  var children = _a.children;
  var manager = useRef(RNDContext);
  return React.createElement(DndProvider, {
    manager: manager.current.dragDropManager
  }, children);
}

export default React.memo(DragAndDrop);
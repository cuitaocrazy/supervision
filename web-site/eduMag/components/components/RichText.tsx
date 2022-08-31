/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentBlock,
} from "draft-js";

const { useState, useRef, useCallback } = React;

function RichText(props: any) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef<Editor>();

  const focus = () => {
    if (editor.current) editor.current.focus();
  };

  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    [editorState, setEditorState]
  );

  const mapKeyToEditorCommand = useCallback(
    (e: React.KeyboardEvent<{}>) => {
      switch (e.keyCode) {
        case 9: // TAB
          const newEditorState = RichUtils.onTab(
            e,
            editorState,
            4 /* maxDepth */
          );
          if (newEditorState !== editorState) {
            setEditorState(newEditorState);
          }
          return null;
      }
      return getDefaultKeyBinding(e);
    },
    [editorState, setEditorState]
  );

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={(blockType: string) => {
          const newState = RichUtils.toggleBlockType(editorState, blockType);
          setEditorState(newState);
        }}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={(inlineStyle: string) => {
          const newState = RichUtils.toggleInlineStyle(
            editorState,
            inlineStyle
          );
          setEditorState(newState);
        }}
      />
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder=""
          // ref={editor} //todo 因为编译不通过, 如果需要该配置, 则需要继续查看使用方式
          spellCheck={true}
        />
      </div>
    </div>
  );
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return "";
  }
}

function StyleButton({
  onToggle,
  active,
  label,
  style,
}: {
  onToggle: (s: string) => void;
  active: boolean;
  label: string;
  style: string;
}) {
  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span
      className={className}
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
    >
      {label}
    </span>
  );
}

const BLOCK_TYPES = [
  { label: "块引用", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "代码块", style: "code-block" },
];

function BlockStyleControls({
  editorState,
  onToggle,
}: {
  editorState: EditorState;
  onToggle: (s: string) => void;
}) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

const INLINE_STYLES = [
  { label: "加粗", style: "BOLD" },
  { label: "拉丁", style: "ITALIC" },
  { label: "下划线", style: "UNDERLINE" },
  { label: "单间隔", style: "CODE" },
];

function InlineStyleControls({
  editorState,
  onToggle,
}: {
  editorState: EditorState;
  onToggle: (s: string) => void;
}) {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

export default RichText;

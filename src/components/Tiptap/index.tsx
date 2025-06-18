"use client";
import React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

import { StarterKit } from "@tiptap/starter-kit";

interface TiptapViewerProps {
  content: string;
}

const TiptapViewer = ({ content }: TiptapViewerProps) => {
  const editor = useEditor({
    content,
    editable: false,
    extensions: [StarterKit], 
  });

  if (!editor) return null
  return (
    
     <EditorContent editor={editor} />
    
  );
};

export default TiptapViewer;

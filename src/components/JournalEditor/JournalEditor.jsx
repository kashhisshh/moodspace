import { Editor, EditorState } from "draft-js";
import { useState } from "react";
const JournalEditor = () => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
   return <section>
        <Editor editorState={editorState} onChange={setEditorState}/>        
    </section>
}

export default JournalEditor;
<template>
    <div class="editor-container">
      <vue-monaco-editor
        class="editor"
        v-model="code"
        :options="editorOptions"
        @onMounted="onEditorMounted"
      />
      <button @click="runCode">Run Code</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import VueMonacoEditor from '@guolao/vue-monaco-editor';
  
  export default {
    components: { VueMonacoEditor },
    emits: ['runCode'],
    setup() {
      const code = ref(`# Write your Python code here\nprint("Hello, World!")`);
      const editorOptions = ref({
        language: 'python',
        theme: 'vs-dark',
        automaticLayout: true, // Adjust editor layout automatically
      });
  
      const onEditorMounted = (editor) => {
        console.log('Monaco Editor Mounted:', editor);
      };
  
      const runCode = () => {
        // Emit the code to the parent component
        console.log('Running code:', code.value);
        this.$emit('runCode', code.value);
      };
  
      return {
        code,
        editorOptions,
        onEditorMounted,
        runCode,
      };
    },
  };
  </script>
  
  <style>
  .editor-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
  .editor {
    flex: 1;
    border: 1px solid #ccc;
  }
  button {
    margin: 10px;
    padding: 5px 10px;
    align-self: center;
  }
  </style>
  
<template>
  <div id="app">
    <header>
      <h1>Python to glTF Translator</h1>
    </header>
    <main class="main-container">
      <PythonEditor @runCode="handleRunCode" />
      <Viewer :outputUrl="outputUrl" />
    </main>
    <footer>
      <p>© 2024 Python-to-glTF Translator</p>
    </footer>
  </div>
</template>

<script>
import PythonEditor from './components/PythonEditor.vue';
import Viewer from './components/GLTFViewer.vue';

export default {
  components: { PythonEditor, Viewer },
  data() {
    return {
      outputUrl: null,
    };
  },
  methods: {
    async handleRunCode(pythonCode) {
      try {
        const response = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: pythonCode }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error:', error);
          alert('Error processing the code. Check the console for details.');
          return;
        }

        const data = await response.json();
        this.outputUrl = data.gltf_url;
      } catch (error) {
        console.error('Error running Python code:', error);
        alert('An unexpected error occurred. Check the console for details.');
      }
    },
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  color: #333;
}

header {
  background-color: #282c34;
  color: white;
  padding: 1rem;
  text-align: center;
}

footer {
  background-color: #f1f1f1;
  color: #555;
  text-align: center;
  padding: 0.5rem;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>

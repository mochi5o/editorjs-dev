import 'regenerator-runtime/runtime';
import EditorJS from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import PDFFile from '../libs/editorjs-pdf.js';

const editor = new EditorJS({
  holder: 'editorjs',
  autofocus: true,
  tools: {
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: '/uploadFile', // 後でモックで対応可
          byUrl: '/fetchUrl',
        }
      }
    },
    embed: Embed,
    pdf: {
      class: PDFFile,
      config: {
        uploadEndpoint: '/uploadPdf' // 後でExpressやViteプラグインでモック化も可能
      }
    }
  },
  data: {
    blocks: []
  }
});

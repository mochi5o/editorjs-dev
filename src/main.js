import 'regenerator-runtime/runtime';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Checklist from '@editorjs/checklist';
import CodeTool from '@editorjs/code';
import Marker from '@editorjs/marker';
import LinkTool from '@editorjs/link';
import InlineCode from '@editorjs/inline-code';
import RawTool from '@editorjs/raw';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';
import PDFFile from '../libs/editorjs-pdf.js';


let initialData = {
  blocks: []
};

// エディタのインスタンス作成
let editor = createEditor(initialData);

function createEditor(data) {
  return new EditorJS({
    holder: 'editorjs',
    autofocus: true,
    tools: {
      header : {
        class : Header ,
        inlineToolbar : [ 'link' ],
        config: {
          placeholder: '見出しを入力'
        }
      },
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          placeholder: 'リストを入力'
        }
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: '引用を入力',
          captionPlaceholder: '出典を入力'
        }
      },
      image: {
        class: ImageTool,
        config: {
          endpoints: {
            byFile: '/uploadFile',
            byUrl: '/fetchUrl'
          }
        }
      },
      embed: Embed,
      table: Table,
      checklist: {
        class: Checklist,
        inlineToolbar: true,
        config: {
          placeholder: 'チェックリストを入力'
        }
      },
      pdf: {
        class: PDFFile,
        config: {
          uploadEndpoint: '/uploadPdf'
        }
      },
      code: {
        class: CodeTool,
        config: {
          placeholder: 'コードを入力'
        }
      },
      marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
        config: {
          shortcut: 'CMD+SHIFT+M'
        }
      },
      raw: {
        class: RawTool,
        config: {
          placeholder: 'Rawを入力'
        }
      },
      delimiter: {
        class: Delimiter,
        shortcut: 'CMD+SHIFT+D'
      },
      warning: {
        class: Warning,
        shortcut: 'CMD+SHIFT+W',
        config: {
          messagePlaceholder: 'メッセージを入力'
        }
      },
      linkTool: {
        class: LinkTool,
        config: {
          endpoint: '/fetchUrlMetadata'
        }
      },
      inlineCode: InlineCode,
    },
    data
  });
}

// 保存ボタン
document.getElementById('saveBtn').addEventListener('click', () => {
  editor.save().then((outputData) => {
    document.getElementById('output').value = JSON.stringify(outputData, null, 2);
    localStorage.setItem('editorjs-saved', JSON.stringify(outputData));
    alert('保存しました');
  }).catch((error) => {
    console.error('保存エラー:', error);
  });
});

// 読み込みボタン
document.getElementById('loadBtn').addEventListener('click', () => {
  const saved = localStorage.getItem('editorjs-saved');
  if (saved) {
    editor.isReady
      .then(() => {
        editor.destroy();
        editor = createEditor(JSON.parse(saved));
      })
      .catch((error) => {
        console.error('エディタの破棄エラー:', error);
      });
  } else {
    alert('保存データがありません');
  }
});

export default class ImageWithTextBlock {
  static get toolbox() {
    return {
      title: '画像＋テキスト',
      icon: '🖼️'
    };
  }

  constructor({ data }) {
    this.data = data || {
      imageUrl: '',
      text: '',
      layout: 'left'
    };

    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('image-with-text-wrapper', `layout-${this.data.layout}`);

    // 画像要素
    this.image = document.createElement('img');
    this.image.className = 'image';
    this.image.src = this.data.imageUrl || '';
    this.image.alt = '画像';

    // 画像URL入力
    const imageInput = document.createElement('input');
    imageInput.type = 'text';
    imageInput.placeholder = '画像URLを入力';
    imageInput.value = this.data.imageUrl || '';
    imageInput.addEventListener('input', (e) => {
      this.image.src = e.target.value;
      this.data.imageUrl = e.target.value;
    });

    // テキスト入力
    this.textarea = document.createElement('textarea');
    this.textarea.className = 'text';
    this.textarea.placeholder = 'テキストを入力';
    this.textarea.value = this.data.text || '';

    // 配置選択
    const selectLabel = document.createElement('label');
    selectLabel.textContent = 'テキストの配置 ';
    selectLabel.htmlFor = 'layout-select'; // ラベルとselectを関連付ける

    const select = document.createElement('select');
    select.id = 'layout-select'; // ラベルと関連付けるためのIDを設定
    ['top', 'bottom', 'left', 'right'].forEach((pos) => {
      const option = document.createElement('option');
      option.value = pos;
      option.textContent = pos;
      if (this.data.layout === pos) option.selected = true;
      select.appendChild(option);
    });
    select.addEventListener('change', (e) => {
      this.wrapper.classList.remove(`layout-${this.data.layout}`);
      this.data.layout = e.target.value;
      this.wrapper.classList.add(`layout-${this.data.layout}`);
    });

    // ラベルとselectをラップする
    const selectWrapper = document.createElement('div');
    selectWrapper.appendChild(selectLabel);
    selectWrapper.appendChild(select);

    this.wrapper.appendChild(selectWrapper);

    // 回り込みチェックボックス
    const floatCheckbox = document.createElement('input');
    floatCheckbox.type = 'checkbox';
    floatCheckbox.checked = this.data.floatText || false;

    const floatLabel = document.createElement('label');
    floatLabel.textContent = 'テキストを回り込ませる';

    floatCheckbox.addEventListener('change', (e) => {
      this.data.floatText = e.target.checked;
      this.wrapper.classList.toggle('float-enabled', e.target.checked);
    });

    const floatControl = document.createElement('div');
    floatControl.appendChild(floatLabel);
    floatControl.appendChild(floatCheckbox);

    this.wrapper.appendChild(this.image);
    this.wrapper.appendChild(imageInput);
    this.wrapper.appendChild(floatControl);
    this.wrapper.appendChild(selectWrapper);
    this.wrapper.appendChild(this.textarea);

    return this.wrapper;
  }

  save() {
    return {
      imageUrl: this.image.src,
      text: this.textarea.value,
      layout: this.data.layout,
      floatText: this.data.floatText,
    };
  }
}

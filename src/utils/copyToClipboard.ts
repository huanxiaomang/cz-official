import { message } from 'ant-design-vue';

export async function copyToClipboard(text:string) {
  try {
    await navigator.clipboard.writeText(text);
    message.success('复制成功: '+text);

  } catch (err) {
    console.error('复制到剪贴板时出错:', err);
  }
}

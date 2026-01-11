export function useUtil() {

  function browserDetect() {
    const isIE = !!(window as any).ActiveXObject || 'ActiveXObject' in window
    const isEdge = navigator.userAgent.indexOf('Edge') > -1
    const isChrome = navigator.userAgent.indexOf('Chrome') > -1
    const isFirefox = navigator.userAgent.indexOf('Firefox') > -1
    const isSafari = navigator.userAgent.indexOf('Safari') > -1
    const isOpera = navigator.userAgent.indexOf('Opera') > -1
    const isWeixin = navigator.userAgent.indexOf('MicroMessenger') > -1
    const isMobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
    const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
    const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    const isIpad = navigator.userAgent.indexOf('iPad') > -1
    const isIphone = navigator.userAgent.indexOf('iPhone') > -1
    const isMac = navigator.userAgent.indexOf('Macintosh') > -1
    const isWindows = navigator.userAgent.indexOf('Windows') > -1
    const isLinux = navigator.userAgent.indexOf('Linux') > -1
    return {
      isIE,
      isEdge,
      isChrome,
      isFirefox,
      isSafari,
      isOpera,
      isWeixin,
      isMobile,
      isAndroid,
      isIOS,
      isIpad,
      isIphone,
      isMac,
      isWindows,
      isLinux,
    }
  }

  function extractText(nodes: any): string {
    if (!nodes) return '';
    const parts: string[] = [];
    for (const node of nodes) {
      if (typeof node.children === 'string') {
        parts.push(node.children);
      } else if (Array.isArray(node.children)) {
        parts.push(extractText(node.children));
      }
    }
    return parts.join('');
  }

  function extractIconName(nodes: any) {
    let extracted = '';
    if (!nodes) return extracted;
    for (const node of nodes) {
      if (node.type.name) {
        return node.type.name;
      } else if (Array.isArray(node.children)) {
        extracted = extractIconName(node.children);
      }
    }
    return extracted;
  }

  return {
    browserDetect,
    extractText,
    extractIconName,
  }
}
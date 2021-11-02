const [_, chromeVer = "94"] = navigator.appVersion.match(/Chrome\/(\S+)/) || [];

const openEyeDropperEd = ({ sRGBHex } = {}) => {
  if (sRGBHex) {
    let colors = [];
    try {
      colors = JSON.parse(localStorage.colors);
    } catch (err) {}
    colors.push(sRGBHex);
    localStorage.colors = JSON.stringify(colors);
  }
};
if (EyeDropper && parseInt(chromeVer) >= 95) {
  const colorPickerLFOnClick = (info, tab) => {
    chrome.tabs.sendMessage(
      tab.id,
      { type: "openEyeDropper" },
      openEyeDropperEd
    );
  };
  chrome.contextMenus.create({
    type: "normal",
    title: "打开Color Picker-颜色选择器",
    id: "colorPickerLF",
    contexts: ["all"],
    onclick: colorPickerLFOnClick,
  });
}
chrome.browserAction.onClicked.addListener((tab) => {
  if (EyeDropper && parseInt(chromeVer) >= 95) {
    chrome.tabs.sendMessage(
      tab.id,
      { type: "openEyeDropper" },
      openEyeDropperEd
    );
  } else {
    chrome.tabs.sendMessage(
      tab.id,
      { type: "showMsg",data:{content:"你的浏览器版本过低！请升级后再使用。"} },
      openEyeDropperEd
    );
  }
});

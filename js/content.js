const hideMsg = (id) => {
  if (!id) return;
  const curMsgDom = document.getElementById(id);
  if (curMsgDom) document.body.removeChild(curMsgDom);
};
const showMsg = ({ title = "Color Picker提示：", content = "" }) => {
  const msgWrap = document.createElement("div");
  const id = `cp_msg_${parseInt(Math.random() * 10000)}`;
  msgWrap.setAttribute("id", id);
  msgWrap.style.position = "fixed";
  msgWrap.style.right = "30px";
  msgWrap.style.top = "30px";
  msgWrap.style.zIndex = "999999";
  msgWrap.style.minWidth = "200px";
  msgWrap.style.maxWidth = "500px";
  msgWrap.style.background = "#fff";
  msgWrap.style.boxShadow = "0px 0px 6px 2px #6190e8";

  const msgTitleWrap = document.createElement("div");
  msgTitleWrap.style.borderBottom = "1px solid #eee";
  msgTitleWrap.style.display = "flex";
  msgTitleWrap.style.alignItems = "center";
  const msgTitle = document.createElement("div");
  msgTitle.style.padding = "10px 5px";
  msgTitle.style.fontSize = "16px";
  msgTitle.style.flex = "1";
  msgTitle.innerHTML = title;
  msgTitleWrap.appendChild(msgTitle);
  const msgCloseBtn = document.createElement("div");
  msgCloseBtn.innerHTML = "×";
  msgCloseBtn.style.fontSize = "28px";
  msgCloseBtn.style.padding = "0 8px 4px";
  msgCloseBtn.style.cursor = "pointer";
  msgCloseBtn.style.color = "#979797;";
  msgCloseBtn.onclick = () => hideMsg(id);
  msgTitleWrap.appendChild(msgCloseBtn);
  msgWrap.appendChild(msgTitleWrap);

  const msgContent = document.createElement("div");
  msgContent.style.padding = "15px 5px";
  msgContent.innerHTML = content;
  msgWrap.appendChild(msgContent);

  document.body.appendChild(msgWrap);
  setTimeout(() => {
    hideMsg(id);
  }, 5000);
};
const copyText = text => {
  const input = document.createElement("textarea");
  input.style.position = "fixed";
  input.style.padding = "0";
  input.style.border = "0";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
};
const openEyeDropper = async () => {
  const eyeDropper = new EyeDropper();
  const result = await eyeDropper.open();
  copyText(result.sRGBHex)
  showMsg({content:`<div style="font-size:14px">颜色值：【<b style="font-weight:bold;color:red">${result.sRGBHex}</b>】已复制到粘贴板</div><p style="text-align:'right';margin-top:20px">本提示框在5s后自动关闭</p>`})
  return result;
};
chrome.runtime.onMessage.addListener(({ type, data }, sender, response) => {
  switch (type) {
    case "openEyeDropper":
      openEyeDropper().then(response);
      break;
    case "showMsg":
      showMsg(data);
  }
  return true;
});

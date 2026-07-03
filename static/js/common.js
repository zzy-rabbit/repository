const host = window.location.origin;

function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function formatSize(size) {
    if (size < 1024) {
        return size + " B";
    }
    if (size < 1024 * 1024) {
        return (size / 1024).toFixed(1) + " KB";
    }
    return (size / 1024 / 1024).toFixed(2) + " MB";
}

function escapeHtml(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

// 密码输入过滤（可复用）
function initPasswordInput(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9A-Za-z]/g, "");
        });
    }
}

const DISCLAIMER_HTML = `
<div style="max-height: 70vh; overflow-y: auto; padding: 20px 28px; line-height: 1.75; font-size: 14.5px; color: #333;">
    <h2 style="text-align:center; margin-bottom:24px; color:#1e40af;">中转站服务免责声明</h2>
<p style="text-align:center; color:#666; margin-bottom:20px;">
    <strong>版本：V1.1</strong>　更新日期：2026年7月3日
</p>

<p>感谢您使用本文件中转站服务（以下简称“本服务”）。本服务是一项面向公众的临时文件存储与分享工具，仅供用户进行合法的文件临时中转与传输。</p>
<p>在使用本服务前，请您务必仔细阅读并充分理解本免责声明的全部内容。您使用本服务的任何功能，即视为您已完全接受并同意本声明的所有条款。</p>

<h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">一、 用户责任与账号安全</h3>
<ul style="padding-left:20px; margin-bottom:18px;">
    <li>本服务不要求注册或登录，所有上传均为匿名操作。</li>
    <li>提取密码是访问文件的唯一凭证，请您妥善保管并自行承担因密码泄露或遗失导致的一切后果。</li>
    <li>用户应对其上传、存储和分享的文件承担全部责任。</li>
</ul>

<h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">二、 用户内容合规承诺</h3>
<p>您承诺不使用本服务上传、存储或分享任何以下内容：</p>
<ul style="padding-left:20px; margin-bottom:18px;">
    <li>违反中华人民共和国法律法规的内容</li>
    <li>危害国家安全、泄露国家秘密、颠覆国家政权、破坏社会稳定或公共秩序的内容</li>
    <li>侵犯他人知识产权、肖像权、隐私权、名誉权等合法权益的内容</li>
    <li>淫秽色情、赌博、毒品、暴力、诈骗等违法违规或违禁信息</li>
    <li>含有计算机病毒、木马、恶意代码或其他可能危害网络安全的内容</li>
</ul>

<h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">三、 平台方的权利与免责</h3>
<ul style="padding-left:20px; margin-bottom:18px;">
    <li>本服务为免费技术测试性质的临时工具，仅提供有限时间的文件中转功能，不承诺任何形式的永久存储或数据可靠性。</li>
    <li>本服务不保证文件的可用性、完整性、安全性或及时性，因系统维护、网络故障、不可抗力或其他非本平台故意行为导致的文件丢失、损坏或无法访问，本服务不承担任何责任。</li>
    <li>本服务保留随时审核、删除违规文件、暂停或终止服务的权利，且无需事先通知。</li>
    <li>用户因上传或分享文件产生的任何法律责任（包括但不限于侵权、违法、违约等），均由用户自行承担，本平台不承担任何连带责任或赔偿责任。</li>
    <li>本服务不对用户因使用本服务而遭受的任何直接、间接、附带或惩罚性损失承担责任。</li>
</ul>

<h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">四、 知识产权与特别声明</h3>
<p>用户上传的文件知识产权归原权利人所有。本服务严禁用于任何违法犯罪活动。本平台不对用户上传内容的真实性、合法性或权利归属进行审查或担保。</p>

<h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">五、 法律适用与争议解决</h3>
<p>本声明适用中华人民共和国大陆地区法律。如发生争议，双方应友好协商解决；协商不成的，任何一方均可向本服务运营方所在地人民法院提起诉讼。</p>

<div style="margin-top:32px; padding:16px; background:#f8fafc; border-radius:8px; font-size:13.5px; color:#555; text-align:center;">
    使用本服务即表示您已阅读、理解并同意以上全部条款。本声明的最终解释权归本服务运营方所有。
</div>
</div>
`;

// 创建并显示声明弹窗
// 创建并显示声明弹窗
function showDisclaimer() {
    let modal = document.getElementById('disclaimerModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'disclaimerModal';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(0,0,0,0.85); 
            display: none; align-items: center; justify-content: center; 
            z-index: 30000; padding: 20px;
        `;
        modal.innerHTML = `
            <div style="background:white; border-radius:16px; max-width:740px; width:100%; max-height:92vh; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.3);">
                <!-- 头部 -->
                <div style="padding:20px 28px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
                    <h3 style="margin:0; color:#1f2937; font-size:18px;">服务免责声明</h3>
                    <button onclick="closeDisclaimer()" style="background:none; border:none; font-size:28px; cursor:pointer; color:#999; line-height:1; padding:0;">×</button>
                </div>
                
                <!-- 内容区域 -->
                <div id="disclaimerContent" style="padding:24px 28px; overflow-y:auto; max-height:calc(92vh - 125px);"></div>
                
<!--                &lt;!&ndash; 底部按钮（已上移） &ndash;&gt;-->
<!--                <div style="padding:4px 28px 20px; border-top:1px solid #eee; text-align:center;">-->
<!--                    <button onclick="closeDisclaimer()" class="btn" style="width:240px; padding:13px 32px; font-size:16px; background:linear-gradient(135deg,#3b82f6,#2563eb);">-->
<!--                        我已阅读并同意-->
<!--                    </button>-->
<!--                </div>-->
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('disclaimerContent').innerHTML = DISCLAIMER_HTML;
    modal.style.display = 'flex';
}

function closeDisclaimer() {
    const modal = document.getElementById('disclaimerModal');
    if (modal) modal.style.display = 'none';
}

// 全局绑定 Esc 键关闭
document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
        const modal = document.getElementById('disclaimerModal');
        if (modal && modal.style.display === 'flex') closeDisclaimer();
    }
});

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
    <h2 style="text-align:center; margin-bottom:24px; color:#1e40af;">中转站服务免责说明</h2>
    <p style="text-align:center; color:#666; margin-bottom:20px;">
        <strong>版本：V1.0</strong>　更新日期：2026年7月2日
    </p>

    <p>感谢您使用本文件中转站服务（以下简称“本服务”）。本服务是一项面向公众开放的临时文件存储与分享工具，旨在提供便捷的文件传输中转功能。</p>
    <p>在使用本服务前，请您务必仔细阅读并充分理解本免责说明的全部内容。您使用本服务的任何功能，即视为您已完全接受本说明的全部条款。</p>

    <h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">一、 用户责任与账号安全</h3>
    <ul style="padding-left:20px; margin-bottom:18px;">
        <li>本服务不要求注册或登录，所有上传均为匿名操作。</li>
        <li>4位提取密码是访问文件的唯一凭证，请您妥善保管。</li>
        <li>因密码泄露导致的一切后果由用户自行承担。</li>
    </ul>

    <h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">二、 用户内容合规承诺</h3>
    <p>您承诺不上传以下内容：</p>
    <ul style="padding-left:20px; margin-bottom:18px;">
        <li>违反中华人民共和国法律法规的内容</li>
        <li>危害国家安全、泄露国家秘密、破坏社会稳定的内容</li>
        <li>侵犯他人知识产权、肖像权、名誉权等合法权益的内容</li>
        <li>淫秽色情、赌博、毒品、金融诈骗等违禁信息</li>
        <li>含有病毒、木马等恶意代码的文件</li>
    </ul>

    <h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">三、 平台方的权利与免责</h3>
    <ul style="padding-left:20px; margin-bottom:18px;">
        <li>本服务为临时中转站工具，不承诺永久保存或服务持续可用。</li>
        <li>因系统维护、不可抗力等原因导致文件丢失，本服务不承担责任。</li>
        <li>本服务保留对违规内容的审核、删除和封禁权利。</li>
    </ul>

    <h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">四、 知识产权与特别声明</h3>
    <p>用户上传内容知识产权归原权利人所有。本服务严禁用于任何违法犯罪活动。</p>

    <h3 style="margin:22px 0 10px; color:#1e40af; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">五、 法律适用</h3>
    <p>本说明适用中华人民共和国大陆地区法律。如有争议，双方应友好协商，协商不成提交本服务运营方所在地人民法院管辖。</p>

    <div style="margin-top:32px; padding:16px; background:#f8fafc; border-radius:8px; font-size:13.5px; color:#555; text-align:center;">
        使用本服务即表示您已阅读并同意以上全部条款。
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

import html2canvas from "html2canvas"
import { apiShareCreate } from "../../../api/apiTable"

import IntegratedStore from "../../../mobx/integratedStore"
import { ShareDlgType } from "../../../data/shareDlgType"

type TableReturn = [
    (d: string, f: string) => void,
    () => void,
]

const useTable = (): TableReturn => {
    const {user, status} = IntegratedStore

    const scrShot = (divname: string, filename: string) => {
        window.scrollTo(0, 0);
        const div = document.getElementById(divname);

        if(div) {
            html2canvas(div, {
                useCORS: true,
                allowTaint: false,
                backgroundColor: "#000000",
                scale: 1
            })
            .then(function(canvas) {
                const el = document.createElement("a");
                el.href = canvas.toDataURL("image/jpeg");
                el.download = filename;
                el.click();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
    }

    const shareURL = () => {
        let text = user.user.userName+"," + user.user.userLv + "\n";
        
        const keys = user.user.userStatus.keys();
        for(let i = 0; i < user.user.userStatus.size; i++) {
            const ckey = keys.next();
            if(ckey.value !== "")
                text += ckey.value + "," + user.user.userStatus.get(ckey.value) + "\n";
        }

        const datafixed = btoa(text);
        
        // 랜덤코드 발행
        const code = CryptoJS.SHA1(user.user.userName+new Date().toTimeString()).toString();

        apiShareCreate(code, datafixed)
        .then((res) => {
            if(res.status === 200) {
                status.status.showShareDlg = true
                status.status.shareDlgType = ShareDlgType.SUCCESS
                status.status.shareCode = code
            }
            else {
                status.status.showShareDlg = true
                status.status.shareDlgType = ShareDlgType.FAIL
            }
        })
    }

    return [
        scrShot, shareURL
    ]
}

export default useTable
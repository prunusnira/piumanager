import html2canvas from "html2canvas"
import { apiShareCreate } from "../api/apiTable"
import { ShareDlgType } from "../data/shareDlgType"
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {atomUser} from "../recoil/user";
import {atomShareDialog, atomStatus} from "../recoil/status";

const useShare = () => {
    const user = useRecoilValue(atomUser);
    const [status,setStatus] = useRecoilState(atomStatus);
    const setShareDialog = useSetRecoilState(atomShareDialog);

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
        let text = user.userName+"," + user.userLv + "\n";
        
        const keys = user.userPattern.keys();
        for(let i = 0; i < user.userPattern.size; i++) {
            const ckey = keys.next();
            if(ckey.value !== "")
                text += ckey.value + "," + user.userPattern.get(ckey.value) + "\n";
        }

        const datafixed = btoa(text);
        
        // 랜덤코드 발행
        const code = CryptoJS.SHA1(user.userName+new Date().toTimeString()).toString();

        apiShareCreate(code, datafixed)
        .then((res) => {
            if(res.status === 200) {
                setStatus({
                    ...status,
                    shareDlgType: ShareDlgType.SUCCESS,
                    shareCode: code,
                })
                setShareDialog(true);
            }
            else {
                setStatus({
                    ...status,
                    shareDlgType: ShareDlgType.FAIL,
                })
                setShareDialog(true);
            }
        })
    }

    return {
        scrShot, shareURL
    }
}

export default useShare
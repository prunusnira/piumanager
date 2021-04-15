/*****************************************************
 * PIU Manager
 * Developed by Tae Jun Kang a.k.a Prunus Nira
 * (c) Nira 2016
 *
 * 1. This project is protected under GNU AGPL v3.0
 *    Please refer to LICENSE file on root
 * 2. Also, products and libraries used to implement
 *    this server are on USED-LIBRARIES file on root
 *****************************************************/
const txtPIU = {
    tableinfo: {
        "jp":"本アプリで使用する難易度表はHypnosisさんの難易度表の一部を採用しております",
        "ko":`본 툴에서 사용하는 난이도 표는 힙노시스님께서 제작하시는 난이도 표의 내용을 일부 차용하고 있습니다 (허가 받음)`,
        "en":`Some part of difficulty table used in this tool is based on Hypnosis' table`,
        "cn":`Some part of difficulty table used in this tool is based on Hypnosis' table`
    },
    notice: {
        "jp":"最近のシステム更新後ファイルを保存できない方はprunusnira@gmail.comもしやTwitter @_nira_oneにてご連絡ください(CSVファイルを送ってください)",
        "ko":"최근 업데이트 후 파일 저장이 안되시는 분들은 prunusnira@gmail.com 혹은 트위터 @_nira_one으로 반드시 연락주세요 (CSV 파일을 보내주세요)",
        "en":"If you have trouble saving file after recent update, please contact me in prunusnira@gmail.com or Twitter @_nira_one (Please send me csv file)",
        "cn":"If you have trouble saving file after recent update, please contact me in prunusnira@gmail.com or Twitter @_nira_one (Please send me csv file)"
    },
    howto1: {
        "jp":"How to use:",
        "ko":"How to use:",
        "en":"How to use:",
        "cn":"如何使用"
    },
    howto2: {
        "jp":"「新規作成」や「ファイル読み」でユーザー情報を読み出す",
        "ko":"「신규유저」나「파일열기」버튼을 눌러 정보를 불러옴",
        "en":"Load user information with 「New user」 or 「Load File」",
        "cn":"用「新用户」或者「加载文件」来加载用户信息"
    },
    howto3: {
        "jp":"難易度を選択して譜面を選び、ランク情報を設定",
        "ko":"난이도/패턴을 선택하여 랭크 정보를 설정",
        "en":"Select levels and patterns to load list, and then click each pattern to set rank status",
        "cn":"选择难度与谱面来获得分级列表，然后点选每个谱面来设定评价状态"
    },
    howto4: {
        "jp":"「ファイル保存」でCSVファイルをダウンロード",
        "ko":"「파일저장」버튼을 누르고 CSV 파일을 보관",
        "en":"「Save File」 to save your progress via CSV file",
        "cn":"「保存文件」来将你的进度保存为CSV文件"
    },
    subtitle: {
        "jp":"記録管理ツール",
        "ko":"기록 관리 툴",
        "en":"Rank Manage Tool",
        "cn":"评价管理工具"
    },
    functitle: {
        "jp":"ファイルメニュー",
        "ko":"파일 메뉴",
        "en":"File Menu",
        "cn":"文件目录"
    },
    newuser: {
        "jp":"新規作成",
        "ko":"신규 유저",
        "en":"New User",
        "cn":"新用户"
    },
    load: {
        "jp":"ファイルロード",
        "ko":"파일 열기",
        "en":"Load File",
        "cn":"加载文件"
    },
    save: {
        "jp":"ファイル保存",
        "ko":"파일 저장",
        "en":"Save File",
        "cn":"保存文件"
    },
    patternsel: {
        "jp":"譜面選択",
        "ko":"패턴 선택",
        "en":"Patterns",
        "cn":"谱面选择"
    },
    newuserdiv: {
        "jp":"新規ユーザー追加：ユーザーネームには半角英文字と数字が使えます",
        "ko":"새로운 사용자 추가: 이름에는 영문자와 숫자만 사용 가능합니다",
        "en":"Add new user: Only alphabet and number are allowed for user name",
        "cn":"添加新用户：用户名仅允许使用字母与数字"
    },
    newuserbtn: {
        "jp":"登録",
        "ko":"유저 작성",
        "en":"Create Profile",
        "cn":"创建个人信息"
    },
    newuserempty: {
        "jp":"ネームとレベルは空白ではなれません",
        "ko":"이름과 레벨은 빈칸이 될 수 없습니다",
        "en":"Name and Level cannot be empty",
        "cn":"名字与等级不能为空"
    },
    newusertitle: {
        "jp":"新規データ登録",
        "ko":"신규 데이터 등록",
        "en":"Register new profile",
        "cn":"注册新的个人信息"
    },
    edit: {
        "jp":"ユーザー情報更新",
        "ko":"유저 정보 수정",
        "en":"Edit User",
        "cn":"编辑用户"
    },
    edituserdiv: {
        "jp":"ユーザー情報修正：ユーザーネームには半角英文字と数字が使えます",
        "ko":"사용자 정보 수정: 이름에는 영문자와 숫자만 사용 가능합니다",
        "en":"Edit user data: Only alphabet and number are allowed for user name",
        "cn":"编辑用户数据：用户名仅允许字母与数字"
    },
    edituserbtn: {
        "jp":"修正",
        "ko":"수정",
        "en":"Modify",
        "cn":"更改"
    },
    editusertitle: {
        "jp":"ユーザー情報更新",
        "ko":"유저 정보 갱신",
        "en":"Update user profile",
        "cn":"更新用户个人信息"
    },
    loadwarn: {
        "jp":`このブラウザは正常的に動作しない可能性があります<br/>
            ファイル読みを試してみますが、正常ではない場合はGoogle Chromeを利用してください`,
        "ko":`이 브라우저는 정상적으로 지원되지 않을 수도 있습니다<br/>
            파일 대화상자를 여는 시도를 수행합니다. 하지만 정상적인 동작을 위해 되도록 구글 크롬을 사용해주세요`,
        "en":`This browser may not fully support this tool<br/>
            Try to show file open dialog. But, please try to use Google Chrome`,
        "cn":`该浏览器可能不完全支持此工具<br/>
            尝试显示文件打开对话框。并且请尝试用谷歌Chrome浏览器`
    },
    update: {
        "jp":"更新",
        "ko":"갱신",
        "en":"Update",
        "cn":"更新"
    },
    cancel: {
        "jp":"キャンセル",
        "ko":"취소",
        "en":"Cancel",
        "cn":"取消"
    },
    updatealldiv: {
        "jp":"選択された全譜面を更新",
        "ko":"선택된 모든 패턴 갱신",
        "en":"Update all selected patterns",
        "cn":"更新所有已选择的谱面"
    },
    updatecheckedbtn: {
        "jp":"譜面を更新",
        "ko":"일괄 갱신",
        "en":"Update all",
        "cn":"选择的更新"
    },
    updatedivtitle: {
        "jp":"譜面ランク更新",
        "ko":"패턴 랭크 갱신",
        "en":"Update pattern rank",
        "cn":"更新谱面评价"
    },
    selectrank: {
        "jp":"ランク選択",
        "ko":"랭크 선택",
        "en":"Select rank",
        "cn":"选择评价"
    },
    display: {
        "jp":"表示",
        "ko":"표시",
        "en":"On/Off",
        "cn":"显示"
    },
    rank: {
        "jp":"ランク",
        "ko":"랭크",
        "en":"Rank",
        "cn":"评价"
    },
    songtype: {
        "jp":"表示する曲のタイプを選択",
        "ko":"표시할 음악 타입 선택",
        "en":"Select type of music to show on the list",
        "cn":"选择显示在列表中的乐曲种类"
    },
    diff: {
        random: {
            "jp":"?",
            "ko":"?",
            "en":"?",
            "cn":"?"
        },
        below: {
            "jp":"級",
            "ko":"급",
            "en":"-",
            "cn":"级"
        },
        easy: {
            "jp":"下級",
            "ko":"하",
            "en":"E",
            "cn":"下位"
        },
        ne: {
            "jp":"中下級",
            "ko":"중하",
            "en":"NE",
            "cn":"中下位"
        },
        normal: {
            "jp":"中級",
            "ko":"중",
            "en":"NR",
            "cn":"中位"
        },
        nh: {
            "jp":"中上級",
            "ko":"중상",
            "en":"NH",
            "cn":"中上位"
        },
        high: {
            "jp":"上級",
            "ko":"상",
            "en":"H",
            "cn":"上位"
        },
        over: {
            "jp":"級",
            "ko":"급",
            "en":"+",
            "cn":"级"
        }
    },
    menu: {
        "jp":"メニュー",
        "ko":"메뉴",
        "en":"Menu",
        "cn":"菜单"
    },
    scrbtn: {
        "jp":"スクショ",
        "ko":"스크린샷",
        "en":"Screenshot",
        "cn":"生成截图"
    },
    urlshare: {
        "jp":"URL共有",
        "ko":"URL공유",
        "en":"Share URL",
        "cn":"分享URL"
    },
    sharedlg: {
        title: {
            "jp":"共有URL",
            "ko":"공유 URL",
            "en":"Sharable URL",
            "cn":"可分享URL"
        },
        cont: {
            "jp":"以下のURLを使ってデータを共有できます。このURLは一週から二週の間で有効です。",
            "ko":"다음 URL을 복사하여 공유할 수 있습니다. 이 URL은 최소 일주일, 최대 2주일 유효합니다.",
            "en":"You can share your status with URL below. This url will be maintained for one week or two weeks",
            "cn":"你可以用下方的URL来分享你的状态。这个URL将会被维护一至两周。"
        },
        error: {
            "jp":"エラーが発生しました",
            "ko":"에러가 발생하였습니다",
            "en":"Error Occurred",
            "cn":"发生错误"
        }
    },
    sharepage: {
        subtitle: {
            "jp":"共有ページ",
            "ko":"서열표 공유 페이지",
            "en":"Share page",
            "cn":"分享页面"
        },
        about1: {
            "jp":"テーブルのデータをシェアするページです",
            "ko":"서열표 데이터를 공유하는 페이지입니다.",
            "en":"Share your table with this page",
            "cn":"这是分享分级表数据的页面。"
        },
        about2: {
            "jp":"データ管理はこちら→",
            "ko":"데이터 관리는 여기서 →",
            "en":"You can have you own here→",
            "cn":"你可以在此管理你自己的→"
        }
    },
    iosalert: {
        "jp":"iOSの場合はiOS13以上のバージョンが必要です",
        "ko":"iOS에서 사용하기 위해서는 iOS13 이상이어야 합니다",
        "en":"If you are using iOS, you need iOS13 or newer",
        "cn":"iOS用户需要iOS13以上版本"
    },
    fanpage: {
        "jp":"このウェブサイトはファンサイトであり、営利目的ではありません",
        "ko":"이 사이트는 팬사이트로 영리적 목적을 가지고 있지 않습니다",
        "en":"This web site is fan page. And does not have any purpose of profit.",
        "cn":"这个网站是粉丝网站，没有营利性目的。"
    }
}

export default txtPIU;
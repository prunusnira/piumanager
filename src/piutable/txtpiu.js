/*****************************************************
 * GITADORA Info Server
 * Developed by Tae Jun Kang a.k.a Prunus Nira
 * (c) Nira 2016
 *
 * 1. This project is protected under GNU AGPL v3.0
 *    Please refer to LICENSE file on root
 * 2. Also, products and libraries used to implement
 *    this server are on USED-LIBRARIES file on root
 *****************************************************/
const txtPIU = {
    test: {
        "jp":"サイトのアドレスをpiu.nira.oneに変更しました。piu.gitadora.infoは2020年4月13日まで使えます。",
        "ko":"사이트의 주소를 piu.nira.one으로 변경하였습니다. piu.gitadora.info는 2020년 4월 13일까지 사용 가능합니다.",
        "en":"Address is changed to piu.nira.one . piu.gitadora.info can be used until Apr. 13, 2020"
    },
    howto1: {
        "jp":"How to use:",
        "ko":"How to use:",
        "en":"How to use:"
    },
    howto2: {
        "jp":"Android, iOS 13+, PCで使えます (ファイル保存問題)",
        "ko":"Android, iOS 13 이상, PC에서만 사용 가능 (파일 다운로드 문제)",
        "en":"Only usable for Android, iOS 13+ and PC (File download problem)"
    },
    howto3: {
        "jp":"「新規作成」や「ファイル読み」でユーザー情報を読み出す",
        "ko":"「신규유저」나「파일열기」버튼을 눌러 정보를 불러옴",
        "en":"Load user information with 「New user」 or 「Load File」"
    },
    howto4: {
        "jp":"難易度を選択して譜面を選び、ランク情報を設定",
        "ko":"난이도/패턴을 선택하여 랭크 정보를 설정",
        "en":"Select levels and patterns to load list, and then click each pattern to set rank status"
    },
    howto5: {
        "jp":"「ファイル保存」でCSVファイルをダウンロード",
        "ko":"「파일저장」버튼을 누르고 CSV 파일을 보관",
        "en":"「Save File」 to save your progress via CSV file"
    },
    subtitle: {
        "jp":"記録管理ツール",
        "ko":"기록 관리 툴",
        "en":"Rank Manage Tool"
    },
    functitle: {
        "jp":"ファイルメニュー",
        "ko":"파일 메뉴",
        "en":"File Menu"
    },
    newuser: {
        "jp":"新規作成",
        "ko":"신규 유저",
        "en":"New User"
    },
    load: {
        "jp":"ファイルロード",
        "ko":"파일 열기",
        "en":"Load File"
    },
    save: {
        "jp":"ファイル保存",
        "ko":"파일 저장",
        "en":"Save File"
    },
    patternsel: {
        "jp":"譜面選択",
        "ko":"패턴 선택",
        "en":"Patterns"
    },
    newuserdiv: {
        "jp":"新規ユーザー追加：ユーザーネームには半角英文字と数字が使えます",
        "ko":"새로운 사용자 추가: 이름에는 영문자와 숫자만 사용 가능합니다",
        "en":"Add new user: Only alphabet and number are allowed for user name"
    },
    newuserbtn: {
        "jp":"登録",
        "ko":"유저 작성",
        "en":"Create Profile"
    },
    newuserempty: {
        "jp":"ネームとレベルは空白ではなれません",
        "ko":"이름과 레벨은 빈칸이 될 수 없습니다",
        "en":"Name and Level cannot be empty"
    },
    newusertitle: {
        "jp":"新規データ登録",
        "ko":"신규 데이터 등록",
        "en":"Register new profile"
    },
    edit: {
        "jp":"ユーザー情報更新",
        "ko":"유저 정보 수정",
        "en":"Edit User"
    },
    edituserdiv: {
        "jp":"ユーザー情報修正：ユーザーネームには半角英文字と数字が使えます",
        "ko":"사용자 정보 수정: 이름에는 영문자와 숫자만 사용 가능합니다",
        "en":"Edit user data: Only alphabet and number are allowed for user name"
    },
    edituserbtn: {
        "jp":"修正",
        "ko":"수정",
        "en":"Modify"
    },
    editusertitle: {
        "jp":"ユーザー情報更新",
        "ko":"유저 정보 갱신",
        "en":"Update user profile"
    },
    loadwarn: {
        "jp":"このブラウザは正常的に動作しない可能性があります<br/>"+
        "ファイル読みを試してみますが、正常ではない場合はGoogle Chromeを利用してください",
        "ko":"이 브라우저는 정상적으로 지원되지 않을 수도 있습니다<br/>"+
        "파일 대화상자를 여는 시도를 수행합니다. 하지만 정상적인 동작을 위해 되도록 구글 크롬을 사용해주세요",
        "en":"This browser may not fully support this tool<br/>"+
        "Try to show file open dialog. But, please try to use Google Chrome"
    },
    update: {
        "jp":"更新",
        "ko":"갱신",
        "en":"Update"
    },
    cancel: {
        "jp":"キャンセル",
        "ko":"취소",
        "en":"Cancel"
    },
    updatealldiv: {
        "jp":"選択された全譜面を更新",
        "ko":"선택된 모든 패턴 갱신",
        "en":"Update all selected patterns"
    },
    updatecheckedbtn: {
        "jp":"チェックした譜面を更新",
        "ko":"체크한 패턴 일괄 갱신",
        "en":"Update Checked Patterns"
    },
    updatedivtitle: {
        "jp":"譜面ランク更新",
        "ko":"패턴 랭크 갱신",
        "en":"Update pattern rank"
    },
    selectrank: {
        "jp":"ランク選択",
        "ko":"랭크 선택",
        "en":"Select rank"
    },
    hidechkbox: {
        "jp":"チェックボックスを隠す/見せる",
        "ko":"체크박스 숨기기/보이기",
        "en":"Hide/Show Checkboxes"
    },
    hiderank: {
        "jp":"ランクを隠す/見せる",
        "ko":"랭크 숨기기/보이기",
        "en":"Hide/Show Rank"
    },
    songtype: {
        "jp":"表示する曲のタイプを選択",
        "ko":"표시할 음악 타입 선택",
        "en":"Select type of music to show on the list"
    },
    diff: {
        random: {
            "jp":"?",
            "ko":"?",
            "en":"?"
        },
        below: {
            "jp":"級",
            "ko":"급",
            "en":"-"
        },
        easy: {
            "jp":"下級",
            "ko":"하",
            "en":"E"
        },
        ne: {
            "jp":"中下級",
            "ko":"중하",
            "en":"NE"
        },
        normal: {
            "jp":"中級",
            "ko":"중",
            "en":"NR"
        },
        nh: {
            "jp":"中上級",
            "ko":"중상",
            "en":"NH"
        },
        high: {
            "jp":"上級",
            "ko":"상",
            "en":"H"
        },
        over: {
            "jp":"級",
            "ko":"급",
            "en":"+"
        }
    },
    share: {
        "jp":"共有",
        "ko":"공유",
        "en":"Share"
    },
    sharedesc: {
        "jp":"現在のクリア表を共有できます",
        "ko":"현재 클리어 표를 공유할 수 있습니다.",
        "en":"Share current clear table"
    },
    scrbtn: {
        "jp":"スクショを撮る (ダウンロード)",
        "ko":"스크린샷 찍기 (다운로드)",
        "en":"Take Screenshot (Download)"
    },
    urlshare: {
        "jp":"URLで共有",
        "ko":"URL로 공유",
        "en":"Share with URL"
    },
    sharedlg: {
        title: {
            "jp":"共有URL",
            "ko":"공유 URL",
            "en":"Sharable URL"
        },
        cont: {
            "jp":"以下のURLを使ってデータを共有できます。このURLは一週から二週の間で有効です。",
            "ko":"다음 URL을 복사하여 공유할 수 있습니다. 이 URL은 최소 일주일, 최대 2주일 유효합니다.",
            "en":"You can share your status with URL below. This url will be maintained for one week or two weeks"
        },
        error: {
            "jp":"エラーが発生しました",
            "ko":"에러가 발생하였습니다",
            "en":"Error Occurred"
        }
    },
    sharepage: {
        subtitle: {
            "jp":"共有ページ",
            "ko":"서열표 공유 페이지",
            "en":"Share page"
        },
        about1: {
            "jp":"",
            "ko":"서열표 데이터를 공유하는 페이지입니다.",
            "en":""
        },
        about2: {
            "jp":"データ管理はこちら→",
            "ko":"데이터 관리는 여기서 →",
            "en":"You can have you own here→"
        }
    }
}

export default txtPIU;
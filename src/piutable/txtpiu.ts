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
        "zh":"网址已经改成piu.nira.one。piu.gitadora.info在2020年4月13日之后不可用。",
        "jp":"サイトのアドレスをpiu.nira.oneに変更しました。piu.gitadora.infoは2020年4月13日まで使えます。",
        "ko":"사이트의 주소를 piu.nira.one으로 변경하였습니다. piu.gitadora.info는 2020년 4월 13일까지 사용 가능합니다.",
        "en":"Address is changed to piu.nira.one . piu.gitadora.info can be used until Apr. 13, 2020"
    },
    howto1: {
        "zh":"如何使用",
        "jp":"How to use:",
        "ko":"How to use:",
        "en":"How to use:"
    },
    howto2: {
        "zh":"iOS用户需要iOS 13以上版本",
        "jp":"iOSの場合はiOS 13以上のバージョンが必要",
        "ko":"iOS에서 사용하기 위해서는 iOS 13 이상이어야 함",
        "en":"If you are using iOS, you need iOS 13 or newer"
    },
    howto3: {
        "zh":"用「新用户」或者「加载文件」来加载用户信息",
        "jp":"「新規作成」や「ファイル読み」でユーザー情報を読み出す",
        "ko":"「신규유저」나「파일열기」버튼을 눌러 정보를 불러옴",
        "en":"Load user information with 「New user」 or 「Load File」"
    },
    howto4: {
        "zh":"选择难度与谱面来获得分级列表，然后点选每个谱面来设定评价状态",
        "jp":"難易度を選択して譜面を選び、ランク情報を設定",
        "ko":"난이도/패턴을 선택하여 랭크 정보를 설정",
        "en":"Select levels and patterns to load list, and then click each pattern to set rank status"
    },
    howto5: {
        "zh":"「保存文件」来将你的进度保存为CSV文件",
        "jp":"「ファイル保存」でCSVファイルをダウンロード",
        "ko":"「파일저장」버튼을 누르고 CSV 파일을 보관",
        "en":"「Save File」 to save your progress via CSV file"
    },
    subtitle: {
        "zh":"评价管理工具",
        "jp":"記録管理ツール",
        "ko":"기록 관리 툴",
        "en":"Rank Manage Tool"
    },
    functitle: {
        "zh":"文件目录",
        "jp":"ファイルメニュー",
        "ko":"파일 메뉴",
        "en":"File Menu"
    },
    newuser: {
        "zh":"新用户",
        "jp":"新規作成",
        "ko":"신규 유저",
        "en":"New User"
    },
    load: {
        "zh":"加载文件",
        "jp":"ファイルロード",
        "ko":"파일 열기",
        "en":"Load File"
    },
    save: {
        "zh":"保存文件",
        "jp":"ファイル保存",
        "ko":"파일 저장",
        "en":"Save File"
    },
    patternsel: {
        "zh":"谱面选择",
        "jp":"譜面選択",
        "ko":"패턴 선택",
        "en":"Patterns"
    },
    newuserdiv: {
        "zh":"添加新用户：用户名仅允许使用字母与数字",
        "jp":"新規ユーザー追加：ユーザーネームには半角英文字と数字が使えます",
        "ko":"새로운 사용자 추가: 이름에는 영문자와 숫자만 사용 가능합니다",
        "en":"Add new user: Only alphabet and number are allowed for user name"
    },
    newuserbtn: {
        "zh":"创建个人信息",
        "jp":"登録",
        "ko":"유저 작성",
        "en":"Create Profile"
    },
    newuserempty: {
        "zh":"名字与等级不能为空",
        "jp":"ネームとレベルは空白ではなれません",
        "ko":"이름과 레벨은 빈칸이 될 수 없습니다",
        "en":"Name and Level cannot be empty"
    },
    newusertitle: {
        "zh":"注册新的个人信息",
        "jp":"新規データ登録",
        "ko":"신규 데이터 등록",
        "en":"Register new profile"
    },
    edit: {
        "zh":"编辑用户",
        "jp":"ユーザー情報更新",
        "ko":"유저 정보 수정",
        "en":"Edit User"
    },
    edituserdiv: {
        "zh":"编辑用户数据：用户名仅允许字母与数字",
        "jp":"ユーザー情報修正：ユーザーネームには半角英文字と数字が使えます",
        "ko":"사용자 정보 수정: 이름에는 영문자와 숫자만 사용 가능합니다",
        "en":"Edit user data: Only alphabet and number are allowed for user name"
    },
    edituserbtn: {
        "zh":"更改",
        "jp":"修正",
        "ko":"수정",
        "en":"Modify"
    },
    editusertitle: {
        "zh":"更新用户个人信息",
        "jp":"ユーザー情報更新",
        "ko":"유저 정보 갱신",
        "en":"Update user profile"
    },
    loadwarn: {
        "zh":"该浏览器可能不完全支持此工具<br/>"+
        "尝试显示文件打开对话框。并且请尝试用谷歌Chrome浏览器",
        "jp":"このブラウザは正常的に動作しない可能性があります<br/>"+
        "ファイル読みを試してみますが、正常ではない場合はGoogle Chromeを利用してください",
        "ko":"이 브라우저는 정상적으로 지원되지 않을 수도 있습니다<br/>"+
        "파일 대화상자를 여는 시도를 수행합니다. 하지만 정상적인 동작을 위해 되도록 구글 크롬을 사용해주세요",
        "en":"This browser may not fully support this tool<br/>"+
        "Try to show file open dialog. But, please try to use Google Chrome"
    },
    update: {
        "zh":"更新",
        "jp":"更新",
        "ko":"갱신",
        "en":"Update"
    },
    cancel: {
        "zh":"取消",
        "jp":"キャンセル",
        "ko":"취소",
        "en":"Cancel"
    },
    updatealldiv: {
        "zh":"更新所有已选择的谱面",
        "jp":"選択された全譜面を更新",
        "ko":"선택된 모든 패턴 갱신",
        "en":"Update all selected patterns"
    },
    updatecheckedbtn: {
        "zh":"更新选择的谱面",
        "jp":"チェックした譜面を更新",
        "ko":"체크한 패턴 일괄 갱신",
        "en":"Update Checked Patterns"
    },
    updatedivtitle: {
        "zh":"更新谱面评价",
        "jp":"譜面ランク更新",
        "ko":"패턴 랭크 갱신",
        "en":"Update pattern rank"
    },
    selectrank: {
        "zh":"选择评价",
        "jp":"ランク選択",
        "ko":"랭크 선택",
        "en":"Select rank"
    },
    hidechkbox: {
        "zh":"隐藏/显示复选框",
        "jp":"チェックボックスを隠す/見せる",
        "ko":"체크박스 숨기기/보이기",
        "en":"Hide/Show Checkboxes"
    },
    hiderank: {
        "zh":"隐藏/显示评价",
        "jp":"ランクを隠す/見せる",
        "ko":"랭크 숨기기/보이기",
        "en":"Hide/Show Rank"
    },
    songtype: {
        "zh":"选择显示在列表中的乐曲种类",
        "jp":"表示する曲のタイプを選択",
        "ko":"표시할 음악 타입 선택",
        "en":"Select type of music to show on the list"
    },
    diff: {
        random: {
            "zh":"?",
            "jp":"?",
            "ko":"?",
            "en":"?"
        },
        below: {
            "zh":"级",
            "jp":"級",
            "ko":"급",
            "en":"-"
        },
        easy: {
            "zh":"下位",
            "jp":"下級",
            "ko":"하",
            "en":"E"
        },
        ne: {
            "zh":"中下位",
            "jp":"中下級",
            "ko":"중하",
            "en":"NE"
        },
        normal: {
            "zh":"中位",
            "jp":"中級",
            "ko":"중",
            "en":"NR"
        },
        nh: {
            "zh":"中上位",
            "jp":"中上級",
            "ko":"중상",
            "en":"NH"
        },
        high: {
            "zh":"上位",
            "jp":"上級",
            "ko":"상",
            "en":"H"
        },
        over: {
            "zh":"级",
            "jp":"級",
            "ko":"급",
            "en":"+"
        }
    },
    menu: {
        "zh":"菜单",
        "jp":"メニュー",
        "ko":"메뉴",
        "en":"Menu"
    },
    scrbtn: {
        "zh":"生成截图",
        "jp":"スクショで共有",
        "ko":"스크린샷으로 공유",
        "en":"Take Screenshot"
    },
    urlshare: {
        "zh":"分享URL",
        "jp":"URLで共有",
        "ko":"URL로 공유",
        "en":"Share with URL"
    },
    sharedlg: {
        title: {
            "zh":"可分享URL",
            "jp":"共有URL",
            "ko":"공유 URL",
            "en":"Sharable URL"
        },
        cont: {
            "zh":"你可以用下方的URL来分享你的状态。这个URL将会被维护一至两周。",
            "jp":"以下のURLを使ってデータを共有できます。このURLは一週から二週の間で有効です。",
            "ko":"다음 URL을 복사하여 공유할 수 있습니다. 이 URL은 최소 일주일, 최대 2주일 유효합니다.",
            "en":"You can share your status with URL below. This url will be maintained for one week or two weeks"
        },
        error: {
            "zh":"发生错误",
            "jp":"エラーが発生しました",
            "ko":"에러가 발생하였습니다",
            "en":"Error Occurred"
        }
    },
    sharepage: {
        subtitle: {
            "zh":"分享页面",
            "jp":"共有ページ",
            "ko":"서열표 공유 페이지",
            "en":"Share page"
        },
        about1: {
            "zh":"这是分享分级表数据的页面。",
            "jp":"",
            "ko":"서열표 데이터를 공유하는 페이지입니다.",
            "en":""
        },
        about2: {
            "zh":"你可以在此管理你自己的→",
            "jp":"データ管理はこちら→",
            "ko":"데이터 관리는 여기서 →",
            "en":"You can have you own here→"
        }
    }
}

export default txtPIU;